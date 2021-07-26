import { Request, Response } from 'express';
import config from '../../../config';

const handleGetVersion = (_req: Request, res: Response) => {
  const { version } = config.api;
  res.json({ version });
};

export default handleGetVersion;
