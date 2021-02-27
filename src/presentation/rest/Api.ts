import express from 'express';
//import express, { Response as ExResponse, NextFunction } from 'express';
import errorHandler from 'api-error-handler';
import { RegisterRoutes } from './generated/routes';
import { useSwagger } from './Swagger';
import cors from 'cors';
//import ApiError from '@infrastructure/ApiError';

const api = express.Router();

api.use(cors());
api.use(express.json());

RegisterRoutes(api);

api.use(errorHandler());

api.use('/api', ...useSwagger());

export { api };
