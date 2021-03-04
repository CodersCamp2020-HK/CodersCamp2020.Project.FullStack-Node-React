import { UsersService } from '@application/UsersService';
import ApiError from '@infrastructure/ApiError';
import { Controller, Route, Tags, Response, Path, Patch, Body, SuccessResponse } from 'tsoa';
import { Inject } from 'typescript-ioc';

@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;

    /**
     * Supply the unique user ID and update user password with corresponding id from database
     *  @param userId The user's identifier
     *  @isInt  userId
     */
    @Response<ApiError>(404, 'User not found')
    @SuccessResponse(200, 'OK')
    @Patch('{userId}')
    public async deleteUser(@Path() userId: number, @Body() password: string): Promise<void> {
        this.setStatus(200);
        return this.usersService.updatePassword(userId, password);
    }
}
