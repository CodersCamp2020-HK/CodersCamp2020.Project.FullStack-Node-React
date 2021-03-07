interface UserLinkInfo {
    id: number;
    email: string;
    linkUUID: string;
    timeout?: NodeJS.Timeout;
}
export class TemporaryUserLinkInfoStore {
    constructor(deletionTimeInMinutes: number) {
        this.deletionTimeInMinutes = deletionTimeInMinutes;
    }
    private deletionTimeInMinutes: number;
    private allUserLinksInfo: UserLinkInfo[] = [];
    addUserLinkInfo(userLinkInfo: UserLinkInfo): void {
        if (this.getUserLinkInfo(userLinkInfo.linkUUID)) {
            return;
        }

        const deletionTimeout = setTimeout(() => {
            if (
                this.allUserLinksInfo.find((userLinkInfoToFind) => userLinkInfoToFind.linkUUID == userLinkInfo.linkUUID)
            ) {
                this.deleteUserLinkInfo(userLinkInfo);
            }
        }, this.deletionTimeInMinutes * 1000 * 60);

        userLinkInfo.timeout = deletionTimeout;
        this.allUserLinksInfo.push(userLinkInfo);
    }
    deleteUserLinkInfo(userLinkInfo: UserLinkInfo): void {
        if (userLinkInfo.timeout) {
            clearTimeout(userLinkInfo.timeout);
        }
        this.allUserLinksInfo = this.allUserLinksInfo.filter((userLinkInfoToDelete) => {
            userLinkInfoToDelete.linkUUID != userLinkInfo.linkUUID;
        });
    }
    getAllUserLinksInfo(): UserLinkInfo[] {
        return this.allUserLinksInfo;
    }

    getUserLinkInfo(linkUUID: string): UserLinkInfo | undefined {
        return this.getAllUserLinksInfo().find((el) => {
            return el.linkUUID == linkUUID;
        });
    }
}
