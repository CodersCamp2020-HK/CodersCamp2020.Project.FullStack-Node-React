import express from 'express';
import { api } from './presentation/rest';
import './IocContainerSetup';
import path from 'path';
// import { Sequelize } from 'sequelize';
// import 'dotenv/config';

// async () => {
// try {
//     const sequelize = new Sequelize(
//         process.env.POSTGRES_DB as string,
//         process.env.POSTGRES_USER as string,
//         process.env.POSTGRES_PASSWORD,
//         {
//             host: process.env.POSTGRES_HOST,
//             dialect: 'postgres',
//         },
//     );
//     await sequelize.authenticate();
//     console.log('Connected to the database');
// } catch (error) {
//     console.log('Unable to connect to the database, ', error);
// }
//     const port = process.env.PORT || 8000;

//     const app = express();

//     app.use(api);
//     app.use(express.static(path.join(__dirname, 'presentation/web/build')));

//     app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
// };

const port = process.env.PORT || 8000;

const app = express();

app.use(api);
app.use(express.static(path.join(__dirname, 'presentation/web/build')));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
