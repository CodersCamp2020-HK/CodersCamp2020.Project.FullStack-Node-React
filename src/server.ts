import express from 'express';
import path from 'path';
import { api } from './presentation/rest';
import { connectToDb } from '@infrastructure/postgres/DatabaseConnection';
import { useSecurity } from '@infrastructure/express/SecurityMiddleware';
import { useLogging } from '@infrastructure/express/LoggerMiddleware';
import { WinstonLogger } from '@infrastructure/WinstonLogger';
import { Container } from './IocContainerSetup';
import 'express-async-errors';
import 'reflect-metadata';
import dotenv from 'dotenv';
import seedDatabase from '@infrastructure/postgres/seedDatabase';
import { serveWeb } from '@infrastructure/express/ServeWeb';

dotenv.config();

const isProductionEnv = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 8000;
const appUrl = isProductionEnv ? 'https://coders-camp-schronisko.herokuapp.com/' : `http://localhost:${port}`;
const app = express();
const staticPath = path.join(__dirname, 'presentation/web/build');
const entryPath = path.join(staticPath, 'index.html');

(async () => {
    await connectToDb();

    if (process.env.SEED_POSTGRES_DB === 'true') {
        await seedDatabase();
    }

    const logger = Container.get(WinstonLogger);
    logger.log('Connected to database');

    app.use(useLogging(logger));
    app.use(useSecurity({ isProductionEnv }));
    app.use(api);
    app.use(serveWeb({ entryPath, staticPath }));

    app.listen(port, () => logger.log(`App listening at ${appUrl}`));
})();
