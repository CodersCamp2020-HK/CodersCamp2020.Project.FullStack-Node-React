import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse, Tags } from 'tsoa';
import { User } from '../../domain/User';
import { UsersService, UserCreationParams } from '../../application/UsersService';
import { Inject } from 'typescript-ioc';

@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;

    @Get('{userId}')
    public async getUser(@Path() userId: number, @Query() name?: string): Promise<User> {
        return new UsersService().get(userId, name);
    }

    @SuccessResponse('201', 'Created') // Custom success response
    @Post()
    public async createUser(@Body() requestBody: UserCreationParams): Promise<void> {
        this.setStatus(201); // set return status 201
        this.usersService.create(requestBody);
        return;
    }
}
