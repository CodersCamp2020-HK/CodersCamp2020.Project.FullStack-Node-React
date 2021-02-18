import express from 'express';
import { api } from './presentation/rest';
import './IocContainerSetup';

const port = process.env.PORT || 8000;

const app = express();

app.use(api);
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
