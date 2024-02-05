import { env } from '@make.org/assets/env';
import axios from 'axios';
import { getLoggerInstance } from '@make.org/logger';
import { Request, Response } from 'express';

export const sendContactMail = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const { message, name, subject, from } = req.body;
  const logger = getLoggerInstance();

  try {
    const response = await axios(`${env.uvDeskUrl()}/api/v1/ticket`, {
      method: 'POST',
      data: {
        message,
        actAsType: 'customer',
        name,
        subject,
        from,
      },
      headers: {
        Authorization: `Bearer ${env.uvDeskApiToken()}`,
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });

    if (!response) {
      return res.status(400).end();
    }

    res.send(response.data);

    return res.status(200).end();
  } catch (e) {
    const error = e as Error;

    logger.logError({
      name: 'contact-service',
      message: `uvdesk creating ticket error with message : "${error.message}"`,
    });

    return res.status(400).end();
  }
};
