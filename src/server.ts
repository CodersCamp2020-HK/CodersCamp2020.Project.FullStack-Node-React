import express from 'express';
require('express-async-errors');
import { api } from './presentation/rest';
import './IocContainerSetup';
import path from 'path';
import 'reflect-metadata';
import dotenv from 'dotenv';
import { connectToDb } from '@infrastructure/postgres/DatabaseConnection';
dotenv.config();
(async () => {
    await connectToDb();

    console.log('Connected to database');

    const port = process.env.PORT || 8000;
    const app = express();

    app.use(api);
    app.use(express.static(path.join(__dirname, 'presentation/web/build')));

    app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
})();
