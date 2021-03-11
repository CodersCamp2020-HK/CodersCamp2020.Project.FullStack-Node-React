import { Request } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import ApiError from './ApiError';
import OrganizationUser from './postgres/OrganizationUser';
import User from './postgres/User';
import { UserType } from '@infrastructure/postgres/OrganizationUser';

export interface IUserInfo {
    role: UserType;
    id: number;
    iat: number;
}

export interface IAuthUserInfoRequest extends Request {
    user: string | IUserInfo;
}

const isUserInfo = (user: unknown): user is IUserInfo => {
    return (
        typeof (user as IUserInfo).id === 'number' &&
        typeof (user as IUserInfo).role === 'string' &&
        typeof (user as IUserInfo).iat === 'number'
    );
};

export async function expressAuthentication(
    request: IAuthUserInfoRequest,
    securityName: string,
    scopes?: string[],
): Promise<IUserInfo> {
    if (securityName === 'jwt') {
        try {
            const token = request.header('access_token');
            if (!token) throw new ApiError('Bad Request', 400, 'No token provided');
            if (!process.env.JWT_KEY) throw new ApiError('Internal server error', 500, 'JWT private key not found!');

            const decoded = jwt.verify(token, process.env.JWT_KEY);
            if (!isUserInfo(decoded)) throw new ApiError('Bad Request', 400, 'Invalid Token');
            if (scopes && !scopes.includes(decoded.role))
                throw new ApiError('Unathorized', 401, 'Authorization failed');

            const userRepository = getConnection().getRepository(User);
            const user = await userRepository.findOne(decoded.id);
            if (!user) throw new ApiError('Unauthorized', 401, 'This user does not exist');

            const organizationUserRepository = getConnection().getRepository(OrganizationUser);
            const organizationUser = await organizationUserRepository.findOne(user.id);
            const role = organizationUser === undefined ? UserType.NORMAL : organizationUser.role;
            if (role !== decoded.role) throw new ApiError('Bad Request', 400, 'Invalid token');
            return decoded;
        } catch (error) {
            if (error instanceof JsonWebTokenError) throw new ApiError('Bad Request', 400, 'Invalid token');
            throw error;
        }
    } else {
        throw Error('Development error');
    }
}
