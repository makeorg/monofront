import { Request, Response } from 'express';
import Cookies from 'universal-cookie';
import { reactRender } from '../reactRender';

export const defaultRoute = (req: Request, res: Response): Promise<void> =>
  reactRender(req as Request & { universalCookies: Cookies }, res);
