import { Body, Controller, Post, Route, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { UserLoginParams, UsersService } from '@application/UsersService';

@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;

    @Post()
    public async loginUser(@Body() requestBody: UserLoginParams): Promise<string> {
        this.setStatus(200);
        return this.usersService.login(requestBody);
    }
}
