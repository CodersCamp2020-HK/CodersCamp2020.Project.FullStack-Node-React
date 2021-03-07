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
    addLink(userLinkInfo: UserLinkInfo): void {
        this.usersActivationInfo.push(userLinkInfo);

        setTimeout(() => {
            if (
                this.usersActivationInfo.find(
                    (userLinkInfoToFind) => userLinkInfoToFind.linkUUID == userLinkInfo.linkUUID,
                )
            ) {
                this.deleteLink(userLinkInfo);
            }
        }, this.deletionTimeInMinutes * 1000 * 60);
    }
    deleteLink(userLinkInfo: UserLinkInfo): void {
        this.usersActivationInfo = this.usersActivationInfo.filter((userLinkInfoToDelete) => {
            userLinkInfoToDelete.linkUUID != userLinkInfo.linkUUID;
        });
    }
    getAllLinks(): UserLinkInfo[] {
        return this.usersActivationInfo;
    }
}
