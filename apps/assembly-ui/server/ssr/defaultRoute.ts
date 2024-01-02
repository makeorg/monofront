import { Request, Response } from 'express';
import { reactRender } from '../reactRender';

export const defaultRoute = (req: Request, res: Response): Promise<void> =>
  reactRender(req, res);
