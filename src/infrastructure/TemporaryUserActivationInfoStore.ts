export enum LinkType {
    'activation',
    'resetPassword',
}

export interface UserLinkInfo {
    id: number;
    email: string;
    linkUUID: string;
    linkType: LinkType;
    timeout?: NodeJS.Timeout;
}

export default class TemporaryUserActivationInfoStore {
    private deletionTimeInMinutes: number;
    private usersActivationInfo: UserLinkInfo[] = [];

    constructor(deletionTimeInMinutes: number) {
        this.deletionTimeInMinutes = deletionTimeInMinutes;
    }

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

    getUserLinkInfoById(userId: number, linkType: LinkType): UserLinkInfo | undefined {
        return this.getAllLinks().find((el) => {
            if (el.id == userId && el.linkType == linkType) {
                return true;
            }
            return false;
        });
    }

    getUserLinkInfoByUUID(UUID: string): UserLinkInfo | undefined {
        return this.getAllLinks().find((el) => {
            if (el.linkUUID == UUID) {
                return true;
            }
            return false;
        });
    }
}
