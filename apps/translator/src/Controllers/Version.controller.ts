import fs from 'fs';
import { Response } from 'express';
import path from 'path';
import { getBaseLoggerInstance } from '../Logger/logger';
import { env } from '../env';

const VERSION_FILE_PATH = env.isProduction()
  ? path.resolve('.', 'dist', 'version')
  : path.resolve('..', '..', 'dist', 'version');

let versionData: string;
try {
  versionData = fs.readFileSync(VERSION_FILE_PATH, 'utf8');
} catch (error: unknown) {
  const customError = error as { code: string };

  if (customError.code === 'ENOENT') {
    getBaseLoggerInstance().logError({
      name: 'init-app',
      message: 'Version file not found',
    });
  } else {
    getBaseLoggerInstance().logError({
      name: 'init-app',
      message: 'Failed to load version file',
    });
  }
  versionData = '';
}

export const getVersion = (res: Response): Response => {
  try {
    return res.status(200).json(JSON.parse(versionData));
  } catch (error) {
    return res.status(404).json({ message: 'Version file not found' });
  }
};
