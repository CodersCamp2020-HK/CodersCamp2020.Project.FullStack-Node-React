import { Body, Controller, Get, Path, Post, Route, SuccessResponse, Tags, Res, TsoaResponse } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { UserCreationParams, UsersService } from '@application/UsersService';
import { UniqueUserEmailError, InvalidEmailFormatError, PasswordRequirementsError } from '@application/UsersErrors';
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
    public async createUser(
        @Body() requestBody: UserCreationParams,
        @Res() badRequestResponse: TsoaResponse<400, { reason: string }>,
    ): Promise<void> {
        try {
            await this.usersService.create(requestBody);
            this.setStatus(201);
        } catch (error) {
            if (
                error instanceof UniqueUserEmailError ||
                error instanceof PasswordRequirementsError ||
                error instanceof InvalidEmailFormatError
            ) {
                return badRequestResponse(400, { reason: error.message });
            } else {
                throw error;
            }
        }

        return;
    }
}
