interface UserLinkInfo {
    id: number;
    email: string;
    linkUUID: string;
}
export class TemporaryUserLinkInfoStore {
    constructor(deletionTimeInMinutes: number) {
        this.deletionTimeInMinutes = deletionTimeInMinutes;
    }
    private deletionTimeInMinutes: number;
    private usersActivationInfo: UserLinkInfo[] = [];
    addLink(user: UserLinkInfo): void {
        this.usersActivationInfo.push(user);

        setTimeout(() => {
            if (this.usersActivationInfo.find((userToFind) => userToFind.linkUUID == user.linkUUID)) {
                this.deleteLink(user);
            }
        }, this.deletionTimeInMinutes * 1000 * 60);
    }
    deleteLink(user: UserLinkInfo): void {
        this.usersActivationInfo = this.usersActivationInfo.filter((userToDelete) => {
            userToDelete.linkUUID != user.linkUUID;
        });
    }
    getAllLinks(): UserLinkInfo[] {
        return this.usersActivationInfo;
    }
}
