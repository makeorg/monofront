import { Request, Response } from 'express';
import { simpleHash } from '@make.org/utils/helpers/simpleHash';
import parser from 'ua-parser-js';
import { getLoggerInstance } from '../logger';

export const loggerApi = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const ua = parser(req.headers['user-agent']);
  const { level, data } = req.body;
  const normalizedData = typeof data === 'string' ? { message: data } : data;
  const logger = await getLoggerInstance();
  logger.log(level, {
    ...normalizedData,
    app_browser_name: ua.browser.name,
    app_browser_version: ua.browser.version,
    app_os_name: ua.os.name,
    app_os_version: ua.os.version,
    app_device_model: ua.device.model,
    app_device_type: ua.device.type,
    app_device_vendor: ua.device.vendor,
    app_browser_raw: ua.ua,
    app_browser_hash: simpleHash(ua.ua),
  });

  return res.sendStatus(204);
};
