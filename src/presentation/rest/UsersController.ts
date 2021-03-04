import { Body, Controller, Get, Path, Post, Query, Route, SuccessResponse, Tags, Request } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { User } from '@domain/User';
import { UserCreationParams, UsersService } from '@application/UsersService';
import { EmailService } from '@application/EmailService';
import { Request as ExRequest } from 'express';

const mailserv = new EmailService();

@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;
    private emailService: EmailService = mailserv;

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

    @Post('activate/{generatedUUID}')
    @SuccessResponse('201', 'Created')
    public async sendEmail(@Path() generatedUUID: string, @Request() request: ExRequest): Promise<void> {
        this.setStatus(201);
        await this.emailService.sendActivationEmail('sidney.kshlerin17@ethereal.email', request.get('host') + '/api/users/activate/' + generatedUUID);
        return;
    }
}
