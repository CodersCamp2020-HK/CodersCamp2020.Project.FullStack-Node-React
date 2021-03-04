import { Controller, Path, Post, Route, SuccessResponse, Tags } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { UsersService } from '@application/UsersService';
import { TemporaryLinksStore } from '@application/TemporaryLinksStore';

const linksStore = new TemporaryLinksStore(1);
linksStore.addLink({
    id: 1,
    email: 'asd@asd.asd',
    linkUUID: 'secretuuid',
});

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
