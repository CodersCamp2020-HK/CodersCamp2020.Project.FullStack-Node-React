import { Body, Controller, Get, Path, Post, Put, Query, Route, SuccessResponse, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { User } from '@domain/User';
import { UserCreationParams, UsersService, UserUpdateParams } from '@application/UsersService';

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

    @Put('{UserId}')
    public async updateUser(@Path() userId: number, @Body() requestBody: UserUpdateParams): Promise<User> {
        this.setStatus(200);
        return this.usersService.update(userId, requestBody);
    }
}
