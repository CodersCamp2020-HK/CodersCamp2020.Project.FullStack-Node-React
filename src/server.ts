import express from 'express';
//import errorHandler from 'api-error-handler';
//import express, { Response as ExResponse, NextFunction } from 'express';
import { api } from './presentation/rest';
import './IocContainerSetup';
import path from 'path';
import 'reflect-metadata';
import 'dotenv/config';
import { connectToDb } from '@infrastructure/postgres/DatabaseConnection';
//import ApiError from '@infrastructure/ApiError';

(async () => {
    await connectToDb();

    console.log('Connected to database');

    const port = process.env.PORT || 8000;
    const app = express();

    app.use(api);
    app.use(express.static(path.join(__dirname, 'presentation/web/build')));

    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
})();
