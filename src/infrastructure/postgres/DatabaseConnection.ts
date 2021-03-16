import { Connection, createConnection } from 'typeorm';
import path from 'path';

export const connectToDb = (): Promise<Connection> => {
    return createConnection({
        type: 'postgres',
        url: process.env.DATABASE_URL || 'postgres://root:root@localhost:5432/schronisko_dev',
        ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false,
        entities: [path.resolve(__dirname, './*{.ts,.js}')],
        //dropSchema: true, //DELETE ON PRODUCTION
        synchronize: true,
        logging: 'all',
        logger: 'file',
    });
};
