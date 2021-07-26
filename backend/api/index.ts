import { Router } from 'express';
import version from './routes/version';

export default () => {
  const router = Router();

  version(router);

  return router;
};
