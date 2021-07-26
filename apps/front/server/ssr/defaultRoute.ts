import { initialState } from '@make.org/store/initialState';
import { Request, Response } from 'express';
import { reactRender } from '../reactRender';

export const defaultRoute = (req: Request, res: Response): Promise<any> =>
  reactRender(req, res, initialState);
