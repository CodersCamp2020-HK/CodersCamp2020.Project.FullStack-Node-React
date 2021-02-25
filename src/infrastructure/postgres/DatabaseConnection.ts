import { Connection, createConnection } from 'typeorm';
import path from 'path';

export const connectToDb = (url: string): Promise<Connection> => {
    return createConnection({
        type: 'postgres',
        url: url,
        entities: [path.resolve(__dirname, './*{.ts,.js}')],
        synchronize: true,
        logging: 'all',
    });
};
