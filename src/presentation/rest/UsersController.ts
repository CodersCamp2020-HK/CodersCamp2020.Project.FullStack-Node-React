import { Body, Controller, Get, Path, Post, Route, SuccessResponse, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { UserCreationParams, UsersService } from '@application/UsersService';
import { User } from '@infrastructure/postgres/User';

@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;

    @Get('{userId}')
    public async getUser(@Path() userId: number): Promise<User> {
        return this.usersService.get(userId);
    }

    @SuccessResponse('201', 'Created')
    @Post()
    public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
        this.setStatus(201); // set return status 201
        this.usersService.create(requestBody);
        return;
    }
}
