import { Controller, Delete, Path, Route, SuccessResponse, Tags, Security, Request, Response } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { UsersService } from '@application/UsersService';
import { IAuthUserInfoRequest } from '@infrastructure/Auth';

@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;

    /**
     * @isInt userId
     */
    @Response('401', 'Unauthorized')
    @SuccessResponse('200', 'Deleted') // Custom success response
    @Security('jwt', ['admin', 'normal', 'volunteer', 'employee'])
    @Delete('{userId}')
    public async deleteUser(@Path() userId: number, @Request() request: IAuthUserInfoRequest): Promise<void> {
        this.setStatus(200);
        await this.usersService.delete(userId, request);
        return;
    }
}
