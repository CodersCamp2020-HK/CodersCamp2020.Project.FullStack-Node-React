import {
    ApiKey,
    UserCreationParams,
    UserLoginParams,
    UserResetPasswordParams,
    UsersService,
} from '@application/UsersService';
import ApiError from '@infrastructure/ApiError';
import { IAuthUserInfoRequest, IUserInfo } from '@infrastructure/Auth';
import { User } from '@infrastructure/postgres/User';
import {
    Body,
    Controller,
    Delete,
    Get,
    Patch,
    Path,
    Post,
    Request,
    Res,
    Response,
    Route,
    Security,
    SuccessResponse,
    Tags,
    TsoaResponse,
} from 'tsoa';
import { Inject } from 'typescript-ioc';
import {
    InvalidEmailFormatError,
    PasswordRequirementsError,
    UniqueUserEmailError,
    ValidateErrorJSON,
} from '@application/UsersErrors';
import { TemporaryUserLinkInfoStore } from '@application/TemporaryUserActivationInfoStore';
import { EmailService } from '@application/EmailService';
import { v4 as uuidv4 } from 'uuid';
import { Request as ExRequest } from 'express';

const activationLinksStore = new TemporaryUserLinkInfoStore(30);
@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;

    @Inject
    private emailService!: EmailService;

    @Get('{userId}')
    public async getUser(@Path() userId: number): Promise<User> {
        return this.usersService.get(userId);
    }

    @Response<ValidateErrorJSON>(422, 'Validation Failed')
    @SuccessResponse('201', 'Created')
    @Post()
    public async createUser(
        @Body() requestBody: UserCreationParams,
        @Res() badRequestResponse: TsoaResponse<400, { reason: string }>,
        @Request() request: ExRequest,
    ): Promise<void> {
        try {
            const createdUser = await this.usersService.create(requestBody);

            const generatedUUID = uuidv4();

            activationLinksStore.addLink({
                email: createdUser.mail,
                id: createdUser.id,
                linkUUID: generatedUUID,
            });

            await this.emailService.sendActivationEmail(
                createdUser.mail,
                request.get('host') + `/api/users/activate/${generatedUUID}`,
            );

            this.setStatus(201);
        } catch (error) {
            if (
                error instanceof UniqueUserEmailError ||
                error instanceof PasswordRequirementsError ||
                error instanceof InvalidEmailFormatError
            ) {
                return badRequestResponse(400, { reason: error.message });
            } else {
                throw error;
            }
        }

        return;
    }

    @Get('activate/{generatedUUID}')
    @SuccessResponse('200', 'User Activated')
    @Response('404', 'Link is not valid or expired')
    public async sendEmail(@Path() generatedUUID: string): Promise<void> {
        const foundedUserActivationInfo = activationLinksStore.getAllLinks().find((el) => {
            return el.linkUUID == generatedUUID;
        });

        if (foundedUserActivationInfo) {
            await this.usersService.activateUser(foundedUserActivationInfo.id);
            activationLinksStore.deleteLink(foundedUserActivationInfo);
            this.setStatus(200);
        } else {
            throw new ApiError('Not found', 404, 'Link is not valid or expired');
        }
    }

    @Post('{userId}/sendactivationlink')
    @SuccessResponse('200', 'Sended')
    public async sendLink(@Path() userId: number, @Request() request: ExRequest): Promise<void> {
        try {
            const createdUser = await this.usersService.get(userId);

            if (createdUser.activated) {
                throw new Error('User is already activated');
            }

            const foundedUserActivationInfo = activationLinksStore.getAllLinks().find((el) => {
                return el.id == userId;
            });

            if (foundedUserActivationInfo) {
                await this.emailService.sendActivationEmail(
                    createdUser.mail,
                    request.get('host') + `/api/users/activate/${foundedUserActivationInfo.linkUUID}`,
                );
                this.setStatus(200);
                return;
            }

            const generatedUUID = uuidv4();

            activationLinksStore.addLink({
                email: createdUser.mail,
                id: createdUser.id,
                linkUUID: generatedUUID,
            });

            await this.emailService.sendActivationEmail(
                createdUser.mail,
                request.get('host') + `/api/users/activate/${generatedUUID}`,
            );

            this.setStatus(200);
        } catch (error) {
            throw error;
        }

        return;
    }

    /** Supply the unique user ID and delete user with corresponding id from database
     *  @param userId The user's identifier
     *  @isInt  userId
     */
    @Response('401', 'Unauthorized')
    @Response('404', 'User not found')
    @SuccessResponse('200', ' User deleted') // Custom success response
    @Security('jwt', ['admin', 'normal', 'volunteer', 'employee'])
    @Delete('{userId}')
    public async deleteUser(@Path() userId: number, @Request() request: IAuthUserInfoRequest): Promise<void> {
        this.setStatus(200);
        await this.usersService.delete(userId, request);
        return;
    }

    @Response<ApiError>(400, 'Bad Request')
    @Post('auth')
    public async loginUser(@Body() requestBody: UserLoginParams): Promise<ApiKey> {
        this.setStatus(200);
        return this.usersService.login(requestBody);
    }
    /**
     * Supply the unique user ID and update user password with corresponding id from database
     *  @param userId The user's identifier
     *  @isInt  userId
     */
    @Security('jwt', ['admin', 'employee', 'normal', 'volunteer'])
    @Response<ApiError>(404, 'User not found')
    @SuccessResponse(200, 'OK')
    @Patch('{userId}')
    public async updateUserPassword(
        @Path() userId: number,
        @Body() password: UserResetPasswordParams,
        @Request() request: IAuthUserInfoRequest,
    ): Promise<void> {
        this.setStatus(200);
        return this.usersService.updatePassword(userId, password, request.user as IUserInfo);
    }
}
