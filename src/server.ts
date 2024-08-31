import 'reflect-metadata';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import { AppDataSource } from './database';
import { logger } from './middlewares/logger';
import { router } from './router';

const server = express();

server.use(compression());
server.use(cors());
server.use(express.json());

server.use(logger());

server.use('/api', router);

AppDataSource.initialize();

export { server };

