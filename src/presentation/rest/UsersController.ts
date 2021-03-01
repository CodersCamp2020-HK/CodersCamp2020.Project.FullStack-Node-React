import { Controller, Delete, Path, Route, SuccessResponse, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { UsersService } from '@application/UsersService';

@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;

    @SuccessResponse('201', 'Deleted') // Custom success response
    @Delete('{userId}')
    public async deleteUser(@Path() userId: number): Promise<void> {
        this.usersService.delete(userId);
        this.setStatus(201);
        return;
    }
}
