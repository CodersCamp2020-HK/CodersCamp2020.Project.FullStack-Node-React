import express from 'express';
import { RegisterRoutes } from './generated/routes';
import { useSwagger } from './Swagger';
import cors from 'cors';

const api = express.Router();

api.use(cors());
api.use(express.json());

RegisterRoutes(api);

api.use('/api', ...useSwagger());

export { api };
