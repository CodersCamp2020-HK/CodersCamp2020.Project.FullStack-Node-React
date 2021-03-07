enum LinkType {
    'activation',
    'resetPassword',
}

interface UserActivationInfo {
    id: number;
    email: string;
    linkUUID: string;
    linkType: LinkType;
}
export class TemporaryUserActivationInfoStore {
    private deletionTimeInMinutes: number;
    private usersActivationInfo: UserActivationInfo[] = [];

    constructor(deletionTimeInMinutes: number) {
        this.deletionTimeInMinutes = deletionTimeInMinutes;
    }

    addLink(user: UserActivationInfo): void {
        this.usersActivationInfo.push(user);

        setTimeout(() => {
            if (this.usersActivationInfo.find((userToFind) => userToFind.linkUUID == user.linkUUID)) {
                this.deleteLink(user);
            }
        }, this.deletionTimeInMinutes * 1000 * 60);
    }

    deleteLink(user: UserActivationInfo): void {
        this.usersActivationInfo = this.usersActivationInfo.filter((userToDelete) => {
            userToDelete.linkUUID != user.linkUUID;
        });
    }

    getAllLinks(): UserActivationInfo[] {
        return this.usersActivationInfo;
    }
}
