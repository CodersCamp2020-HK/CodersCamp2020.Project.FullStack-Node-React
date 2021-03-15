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
<<<<<<< HEAD
// import seedDatabase from '@infrastructure/postgres/seedDatabase';
=======
//import seedDatabase from '@infrastructure/postgres/seedDatabase';
>>>>>>> 587e10b3056a00dc56f022d5b7b0bf10906f2518

dotenv.config();

const isProductionEnv = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 8000;
const appUrl = isProductionEnv ? 'https://coders-camp-schronisko.herokuapp.com/' : `http://localhost:${port}`;
const app = express();
//work!
(async () => {
    await connectToDb();

    // await seedDatabase();

    const logger = Container.get(WinstonLogger);
    logger.log('Connected to database');

    app.use(useLogging(logger));
    app.use(useSecurity({ isProductionEnv }));
    app.use(api);
    app.use(express.static(path.join(__dirname, 'presentation/web/build')));

    app.listen(port, () => logger.log(`App listening at ${appUrl}`));
})();
