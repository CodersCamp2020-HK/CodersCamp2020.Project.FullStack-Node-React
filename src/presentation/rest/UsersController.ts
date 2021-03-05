import { Body, Controller, Path, Put, Response, Route, SuccessResponse, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { User } from '@infrastructure/postgres/User';
import { UsersService, UserUpdateParams } from '@application/UsersService';
import ApiError from '@infrastructure/ApiError';

@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;

    @Response<ApiError>(404, 'User not found')
    @Response<User>(200, 'User updated')
    @Put('{UserId}')
    public async updateUser(@Path() userId: number, @Body() requestBody: UserUpdateParams): Promise<User> {
        this.setStatus(200);
        return this.usersService.update(userId, requestBody);
    }
}
