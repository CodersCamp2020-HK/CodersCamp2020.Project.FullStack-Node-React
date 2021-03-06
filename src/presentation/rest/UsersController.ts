import { Controller, Path, Post, Route, SuccessResponse, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { UsersService } from '@application/UsersService';
import { TemporaryUserActivationInfoStore } from '@application/TemporaryUserActivationInfoStore';

const linksStore = new TemporaryUserActivationInfoStore(30);
@Tags('Users')
@Route('users')
export class UsersController extends Controller {
    @Inject
    private usersService!: UsersService;

    @Post('activate/{generatedUUID}')
    @SuccessResponse('200', 'User Activated')
    public async sendEmail(@Path() generatedUUID: string): Promise<void> {
        const foundedUser = linksStore.getAllLinks().find((el) => {
            return el.linkUUID == generatedUUID;
        });

        if (foundedUser) {
            await this.usersService.activateUser(foundedUser.id);
            linksStore.deleteLink(foundedUser);
            this.setStatus(200);
        } else {
            throw new Error('Link is not valid or expired');
        }
        return;
    }
}
