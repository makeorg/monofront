import { Request, Response } from 'express';
import { createInitialState } from '@make.org/store/initialState';
import { reactRender } from '../reactRender';

export const privateAuthSuccededRoute = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Logique de la route OIDC
  // res.send('OIDC Route');
  // retrieve the code from the query params in the url
  const initialState = createInitialState();

  return reactRender(req, res, initialState);
};
