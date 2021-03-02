import { Request } from 'express';
import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import { getConnection } from 'typeorm';
import ApiError from './ApiError';
import { User, UserType } from './postgres/User';

interface IUserInfo {
    role: UserType;
    id: number;
    iat: number;
}

interface IAuthUserInfoRequest extends Request {
    user: string | IUserInfo;
}

export async function expressAuthentication(
    request: IAuthUserInfoRequest,
    securityName: string,
    scopes?: string[],
): Promise<any> {
    if (securityName === 'jwt') {
        try {
            const token = request.header('access_token');
            if (!token) throw new ApiError('Bad Request', 400, 'No token provided');
            if (!process.env.JWT_KEY) throw new ApiError('Internal server error', 500, 'JWT private key not found!');
            const decoded = jwt.verify(token, process.env.JWT_KEY) as IUserInfo;
            if (scopes && !scopes.includes(decoded.role))
                throw new ApiError('Unathorized', 401, 'Authorization failed');
            const repository = getConnection().getRepository(User);
            const user = await repository.findOne(decoded.id);
            if (!user) throw new ApiError('Unauthorized', 401, 'This user no longer exists');
            if (user.type !== decoded.role) throw new ApiError('Bad Request', 400, 'Invalid token');
        } catch (error) {
            if (error instanceof JsonWebTokenError) throw new ApiError('Bad Request', 400, 'Cannot authorize');
            throw error;
        }
    } else {
        throw Error('Development error');
    }
}
