import { User } from '@infrastructure/postgres/User';
import { Repository } from 'typeorm';
//import { Request as ExRequest } from 'express';
//import * as jwt from 'jsonwebtoken';

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

export class UsersService {
    constructor(private userRepository: Repository<User>) {}

    public async delete(userId: number, request: any): Promise<void> {

    console.log(request.headers['x-access-token']);

        await this.userRepository.createQueryBuilder().delete().from(User).where('id = :id', { id: userId }).execute();
        return;
    }
}
