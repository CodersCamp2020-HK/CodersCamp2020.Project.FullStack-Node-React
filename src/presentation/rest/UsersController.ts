import { ApiKey, UserLoginParams, UsersService, UserResetPasswordParams } from '@application/UsersService';
import ApiError from '@infrastructure/ApiError';
import { IAuthUserInfoRequest, IUserInfo } from '@infrastructure/Auth';
import {
    Controller,
    Post,
    Route,
    Tags,
    Response,
    Path,
    Patch,
    Body,
    SuccessResponse,
    Security,
    Request,
    Delete,
} from 'tsoa';
import { Inject } from 'typescript-ioc';

@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;
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
