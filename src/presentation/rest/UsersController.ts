import { Controller, Path, Post, Route, SuccessResponse, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { UsersService } from '@application/UsersService';

const sampleUsers = [
    {
        id: 1,
        email: 'asd@asd.asd',
        UUID: 'secretuuid',
    },
];

@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;

    @Post('activate/{generatedUUID}')
    @SuccessResponse('200', 'User Activated')
    public async sendEmail(@Path() generatedUUID: string): Promise<void> {
        const foundedUser = sampleUsers.find((el) => {
            return el.UUID == generatedUUID;
        });

        if (foundedUser) {
            await this.usersService.activateUser(foundedUser.id);
            this.setStatus(200);
        } else {
            throw new Error('User not found');
        }
        return;
    }
}
