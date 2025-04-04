// apps/widget/server/ssr/oidcRoute.ts
import { Request, Response } from 'express';
import { createInitialState } from '@make.org/store/initialState';
import { reactRender } from '../reactRender';

export const oidcRoute = async (req: Request, res: Response): Promise<void> => {
  // Logique de la route OIDC
  // res.send('OIDC Route');
  // retrieve the code from the query params in the url
  let initialState = createInitialState();
  const { code, error, error_description } = req.query;

  initialState = {
    ...initialState,
    openIdResponse: {
      code: code as string,
      error: error as string,
      errorDescription: error_description as string,
    },
  };
  return reactRender(req, res, initialState);
};
