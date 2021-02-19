import express from 'express';
import { api } from './presentation/rest';
import './IocContainerSetup';
import path from 'path';

const port = process.env.PORT || 8000;

const app = express();

app.use(api);
app.use(express.static(path.join(__dirname, 'presentation/web/build')));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
