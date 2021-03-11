import {
    ApiKey,
    EmailResetPassword,
    UserCreationParams,
    UserLoginParams,
    UserResetPasswordParams,
    UsersService,
    UserUpdateParams,
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
    Put,
    Res,
    Response,
    Request,
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
import { Request as ExRequest } from 'express';
import { EmailService } from '@infrastructure/EmailService';
import { LinkType } from '@infrastructure/TemporaryUserActivationInfoStore';
import ActivationMessage from '@infrastructure/ActivationMessage';
@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;

    @Inject
    private emailService!: EmailService;

    @Response<ApiError>(404, 'User not found')
    @Response<User>(200, 'User updated')
    @Put('{userId}')
    public async updateUser(@Path() userId: number, @Body() requestBody: Partial<UserUpdateParams>): Promise<User> {
        this.setStatus(200);
        return this.usersService.update(userId, requestBody);
    }

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

            await this.sendActivationLink(createdUser.id, request);

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
    }

    @Get('activate/{generatedUUID}')
    @SuccessResponse('200', 'User Activated')
    @Response('404', 'Link is not valid or expired')
    public async activateUser(@Path() generatedUUID: string): Promise<void> {
        await this.usersService.activateUser(generatedUUID);
        this.setStatus(200);
    }

    @Post('{userId}/sendactivationlink')
    @SuccessResponse('200', 'Sent')
    public async sendActivationLink(@Path() userId: number, @Request() request: ExRequest): Promise<void> {
        try {
            const ACTIVATION_PATH = request.get('host') + '/api/users/activate/';
            const createdUser = await this.usersService.get(userId);
            const personalUUID = await this.usersService.createUUID(userId, LinkType.activation);
            const message = new ActivationMessage(ACTIVATION_PATH + personalUUID).message;

            await this.emailService.sendLink(createdUser.mail, message);

            this.setStatus(200);
            return;
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

    /**
     * Supply the email address in body, then link to reset the password will be sent for that user
     */
    @Response<ApiError>(404, 'User not found')
    @Response<ApiError>(400, 'Bad Request')
    @SuccessResponse('200', 'Email send')
    @Post('reset')
    public async snedResetPasswordMail(
        @Body() email: EmailResetPassword,
        @Request() request: ExRequest,
    ): Promise<void> {
        const ACTIVATION_PATH = request.get('host') + '/api/users/reset/';
        this.usersService.sendResetPasswordLink(email, ACTIVATION_PATH);
        this.setStatus(200);
    }

    /**
     * Supply the reset password linkto reset the password
     */
    @Response<ApiError>(404, 'User not found')
    @Response<ApiError>(400, 'Bad Request')
    @SuccessResponse('200', 'Password set')
    @Post('reset/{userResetUUID}')
    public async resetUserPassword(
        @Path() userResetUUID: string,
        @Body() newPassword: UserResetPasswordParams,
    ): Promise<void> {
        this.usersService.resetPassword(userResetUUID, newPassword);
        this.setStatus(200);
    }
}
