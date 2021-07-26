import express, { Express } from 'express';
import path from 'path';
import morgan from 'morgan';
import cors from 'cors';
import routes from '../api';
import ErrorResponse from '../utils/errorResponse';
import config from '../config';
import errorHandler from '../api/middlewares/error';

export default (app: Express) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());
  app.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));

  app.use(config.api.prefix, routes());

  app.use(express.static(path.resolve('./backend/public')));

  app.get('*', (_req, res) => {
    res.sendFile('index.html', { root: path.resolve('./backend/public') });
  });

  app.all('*', (req, _res, next) => {
    next(
      new ErrorResponse(`Can't find ${req.originalUrl} on this server!`, 404),
    );
  });

  app.use(errorHandler);

  return app;
};
