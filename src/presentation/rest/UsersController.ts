import {
    ApiKey,
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

@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;

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
    ): Promise<void> {
        try {
            await this.usersService.create(requestBody);
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
