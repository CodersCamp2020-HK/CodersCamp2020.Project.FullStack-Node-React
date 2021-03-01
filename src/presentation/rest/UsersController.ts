import { Body, Controller, Post, Route, Tags, Response } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { UserLoginParams, UsersService } from '@application/UsersService';
import ApiError from '@infrastructure/ApiError';

@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;

    @Response<ApiError>(400, 'Bad Request')
    @Post()
    public async loginUser(@Body() requestBody: UserLoginParams): Promise<string> {
        this.setStatus(200);
        return this.usersService.login(requestBody);
    }
}
