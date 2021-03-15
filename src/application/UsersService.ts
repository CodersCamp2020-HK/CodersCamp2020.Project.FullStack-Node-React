import ApiError from '@infrastructure/ApiError';
import OrganizationUser, { UserType } from '@infrastructure/postgres/OrganizationUser';
import User, { Email, Password, UUID } from '@infrastructure/postgres/User';
import { PasswordRequirementsError, UniqueUserEmailError } from './UsersErrors';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IAuthUserInfoRequest, IUserInfo } from '@infrastructure/Auth';
import { Inject } from 'typescript-ioc';
import { EmailService } from '@infrastructure/EmailService';
import TemporaryUserActivationInfoStore, { LinkType } from '@infrastructure/TemporaryUserActivationInfoStore';
import { v4 as uuidv4 } from 'uuid';
import ResetPasswordMessage from '@infrastructure/ResetPasswordMessage';
import SomeoneAdoptedMessage from '@infrastructure/SomeoneAdoptedMessage';
import VisitConfirmationMessage from '@infrastructure/VisitConfirmationMessage';

const SALT_ROUNDS = 10;

export type UserCreationParams = {
    mail: Email;
    password: Password;
    repPassword: Password;
};

export type UserLoginParams = Pick<User, 'mail' | 'password'>;

export interface ApiKey {
    apiKey: string;
}

export interface EmailResetPassword {
    email: Email;
}

export interface ResetPasswordLink {
    link: UUID;
}

export type UserResetPasswordParams = {
    password: Password;
    repPassword: Password;
};

export type UserUpdateParams = Pick<User, 'name' | 'phone' | 'surname'>;

export class UsersService {
    @Inject
    emailService!: EmailService;
    @Inject
    linksStorage!: TemporaryUserActivationInfoStore;

    constructor(
        private userRepository: Repository<User>,
        private organizationUserRepository: Repository<OrganizationUser>,
    ) {}

    public async get(id: number): Promise<User> {
        const user = await this.userRepository.findOne(id);
        if (!user) throw new Error('User not found in database');
        return user;
    }

    public async activateUser(generatedUUID: string): Promise<void> {
        const foundedUserActivationInfo = this.linksStorage.getUserLinkInfoByUUID(generatedUUID);

        if (foundedUserActivationInfo) {
            await this.userRepository
                .createQueryBuilder()
                .update(User)
                .set({
                    activated: true,
                })
                .where('id = :id', { id: foundedUserActivationInfo.id })
                .execute();
            this.linksStorage.deleteLink(foundedUserActivationInfo);
            return;
        }

        throw new ApiError('Not found', 404, 'Link is not valid or expired');
    }

    public async create(userCreationParams: UserCreationParams): Promise<User> {
        const potentialExistingUser = await this.userRepository.findOne({ where: { mail: userCreationParams.mail } });
        if (!potentialExistingUser) {
            if (userCreationParams.password != userCreationParams.repPassword) {
                throw new PasswordRequirementsError('Passwords do not match');
            }

            const hash = await bcrypt.hash(userCreationParams.password, SALT_ROUNDS);

            const user = this.userRepository.create({
                mail: userCreationParams.mail,
                password: hash,
            });

            return this.userRepository.save(user);
        } else {
            throw new UniqueUserEmailError(userCreationParams.mail);
        }
    }

    public async updatePassword(
        id: number,
        { password, repPassword: confirmPassword }: UserResetPasswordParams,
        currentUser: IUserInfo,
    ): Promise<void> {
        const user = await this.userRepository.findOne(id);

        if (!user) throw new ApiError('Not Found', 404, `User with id: ${id} doesn't exist!`);
        if (currentUser.id !== id)
            throw new ApiError('Bad Request', 400, `You can not change password for user with id: ${id}`);
        if (password !== confirmPassword) throw new ApiError('Bad Request', 400, `Passwords don't match.`);

        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        user.password = hash;
        this.userRepository.save(user);
    }

    public async login(userLoginParams: UserLoginParams): Promise<ApiKey> {
        const user = await this.userRepository.findOne({ where: { mail: userLoginParams.mail } });
        if (!user) throw new ApiError('Bad Request', 400, `Wrong email or password!`);
        const organizationUser = await this.organizationUserRepository.findOne({
            user: { id: user.id },
            organization: { id: 1 },
        });
        const role = organizationUser === undefined ? UserType.NORMAL : organizationUser.role;

        const match = await bcrypt.compare(userLoginParams.password, user.password);
        if (!match) throw new ApiError('Bad Request', 400, `Wrong email or password!`);

        if (!process.env.JWT_KEY) throw new ApiError('Internal server error', 500, 'JWT private key not found!');
        const token = jwt.sign({ role, id: user.id }, process.env.JWT_KEY);

        return { apiKey: token };
    }

    public async update(
        id: number,
        userUpdateParams: Partial<UserUpdateParams>,
        currentUser: IUserInfo,
    ): Promise<User> {
        if (currentUser.role == UserType.NORMAL || currentUser.role == UserType.VOLUNTEER) {
            if (id != currentUser.id) {
                throw new ApiError('Unauthorized', 401, 'User and volunteer can only update own account');
            }
        }
        const user = await this.userRepository.findOne(id);
        if (!user) throw new ApiError('Not Found', 404, `User with id: ${id} not found!`);
        const updateUser = { ...user, ...userUpdateParams };

        return this.userRepository.save(updateUser);
    }

    public async delete(userId: number, request: IAuthUserInfoRequest): Promise<void> {
        const user = await this.userRepository.findOne(userId);
        if (!user) {
            throw new ApiError('Not found', 404, 'User does not exist');
        }

        const currentUser = request.user as IUserInfo;

        if (currentUser.role == UserType.ADMIN || currentUser.id == userId) {
            await this.userRepository
                .createQueryBuilder()
                .delete()
                .from(User)
                .where('id = :id', { id: userId })
                .execute();
            return;
        }

        throw new ApiError('Unauthorized', 401, 'Only admin can delete other accounts');
    }

    public async createUUID(userId: number, linkType: LinkType): Promise<string> {
        const createdUser = await this.get(userId);

        if (linkType === LinkType.activation && createdUser.activated) {
            throw new Error('User is already activated');
        }

        const activationLink = this.linksStorage.getUserLinkInfoById(userId, linkType);

        if (activationLink) {
            return activationLink.linkUUID;
        }

        const generatedUUID = uuidv4();

        this.linksStorage.addLink({
            email: createdUser.mail,
            id: createdUser.id,
            linkUUID: generatedUUID,
            linkType: linkType,
        });

        return generatedUUID;
    }

    public async sendResetPasswordLink({ email }: EmailResetPassword, host: string): Promise<void> {
        const user = await this.userRepository.findOne({ where: { mail: email } });
        if (!user) throw new ApiError('Not Found', 404, `Wrong email`);

        const link = await this.createUUID(user.id, LinkType.resetPassword);
        this.emailService.sendEmail(email, new ResetPasswordMessage(host + link).message);
    }

    public async resetPassword(userResetUUID: UUID, { password, repPassword }: UserResetPasswordParams): Promise<void> {
        const userInfo = this.linksStorage.getUserLinkInfoByUUID(userResetUUID);
        if (!userInfo || userInfo.linkUUID !== userResetUUID)
            throw new ApiError('Not Found', 400, `Wrong link to reset password!`);

        const user = await this.userRepository.findOne(userInfo.id);
        if (!user) throw new ApiError('Not Found', 404, `User with uuid: ${userResetUUID} doesn't exist!`);
        if (password !== repPassword) throw new ApiError('Bad Request', 400, `Passwords don't match.`);

        const hash = await bcrypt.hash(password, SALT_ROUNDS);
        user.password = hash;
        this.userRepository.save(user);
    }

    public async sendSomeoneAdoptedEmails(adopters: User[], petName: string): Promise<void> {
        if (adopters.length <= 0) {
            throw new ApiError('Bad Request', 400, 'No data provided');
        }

        adopters.forEach((adopter) => {
            const message = new SomeoneAdoptedMessage(petName, adopter.name as string, adopter.surname as string)
                .message;

            this.emailService.sendEmail(adopter.mail, message);
        });
    }

    public async sendVisitConfirmationMessage(adopter: User, petName: string): Promise<void> {
        const message = new VisitConfirmationMessage(petName, adopter.name as string, adopter.surname as string)
            .message;

        this.emailService.sendEmail(adopter.mail, message);
    }
}
