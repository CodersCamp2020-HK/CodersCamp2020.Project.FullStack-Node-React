import express from 'express';
import { api } from './presentation/rest';
import './IocContainerSetup';
import path from 'path';
import 'reflect-metadata';
import 'dotenv/config';
import { createConnection } from 'typeorm';

createConnection({
    type: 'postgres',
    host: process.env.POSTGRES_HOST as string,
    port: 5432,
    username: process.env.POSTGRES_USER as string,
    password: process.env.POSTGRES_PASSWORD as string,
    database: process.env.POSTGRES_DB as string,
    entities: [path.resolve(__dirname, './entity/*{.ts,.js}')],
    synchronize: true,
    logging: false,
})
    .then(() => {
        console.log('Connected to database');

        const port = process.env.PORT || 8000;
        const app = express();

        app.use(api);
        app.use(express.static(path.join(__dirname, 'presentation/web/build')));

        app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
    })
    .catch((error) => console.error(error));
