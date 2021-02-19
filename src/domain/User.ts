type UserStatus = 'Happy' | 'Sad';
export interface User {
    id: number;
    email: string;
    name: string;
    status?: UserStatus;
    phoneNumbers: string[];
}
