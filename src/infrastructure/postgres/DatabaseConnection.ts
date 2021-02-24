import { Connection, createConnection } from 'typeorm';
import path from 'path';

export const connectToDb = (url: string): Promise<Connection> => {
    return createConnection({
        type: 'postgres',
        url: url,
        ssl: {
            rejectUnauthorized: false,
        },
        entities: [path.resolve(__dirname, './entity/*{.ts,.js}')],
        synchronize: true,
        logging: 'all',
    });
};
