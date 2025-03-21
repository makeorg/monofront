import { Request, Response } from 'express';
import { createInitialState } from '@make.org/store/initialState';
import { reactRender } from '../reactRender';

export const privateAuthSuccededRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  const initialState = createInitialState();

  return reactRender(req, res, initialState);
};
