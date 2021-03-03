import { Controller, Delete, Path, Route, SuccessResponse, Tags, Security, Request } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { UsersService } from '@application/UsersService';
//import { Request as ExRequest } from 'express';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;

    /**
     * @isInt userId
     */
    @SuccessResponse('201', 'Deleted') // Custom success response
    @Security('jwt', ['admin'])
    @Delete('{userId}')
    public async deleteUser(@Path() userId: number, @Request() request: any): Promise<void> {
        this.usersService.delete(userId, request);
        this.setStatus(201);
        return;
    }
}
