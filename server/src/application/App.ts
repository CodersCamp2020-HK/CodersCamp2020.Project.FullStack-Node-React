import express from 'express';
import { RegisterRoutes } from '../generated/routes';
import { useSwagger } from './Swagger';
import cors from 'cors';

export const app = express();

app.use(cors());
app.use(express.json());
app.use('/docs', ...useSwagger());

RegisterRoutes(app);
