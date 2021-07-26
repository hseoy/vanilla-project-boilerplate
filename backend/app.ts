import express from 'express';
import loadApp from './loaders';

const app = express();

loadApp(app);

export default app;
