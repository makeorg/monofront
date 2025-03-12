// apps/widget/server/ssr/oidcRoute.ts
import { Request, Response } from 'express';
import { createInitialState } from '@make.org/store/initialState';
import { reactRender } from '../reactRender';

export const oidcRoute = async (req: Request, res: Response): Promise<void> => {
  // Logique de la route OIDC
  // res.send('OIDC Route');
  // retrieve the code from the query params in the url
  let initialState = createInitialState();
  const { code } = req.query;

  initialState = {
    ...initialState,
    openIdCode: code as string,
  };
  return reactRender(req, res, initialState);
};
