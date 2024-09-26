import { Request, Response } from 'express';
import fs from 'fs';
import { ASSEMBLY_VERSION_PATH } from './paths';

let versionData: string;
try {
  versionData = fs.readFileSync(ASSEMBLY_VERSION_PATH, 'utf8');
} catch (error: unknown) {
  const customError = error as { code: string };

  if (customError.code === 'ENOENT') {
    // eslint-disable-next-line no-console
    console.error('Version file not found');
  } else {
    // eslint-disable-next-line no-console
    console.error('Failed to load version file');
  }
  versionData = '';
}

export function renderVersion(req: Request, res: Response): Response {
  try {
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.json(JSON.parse(versionData));
  } catch (error) {
    return res.status(404).send('Version file not found');
  }
}

/**
 * robots.txt is set to Allow by default
 * Disallow is set in each nginx configuration to disable robot indexing on tech environments
 * */
export function renderRobot(req: Request, res: Response): Response {
  res.type('text/plain');
  return res.send('User-agent: *\nDisallow: /beta/*\nDisallow: /preview/*');
}

/**
 * security.txt
 * */
export function renderSecurityTxt(req: Request, res: Response): Response {
  res.type('text/plain');
  return res.send(`Contact: tech@make.org`);
}
