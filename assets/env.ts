// TODO find a new way to handle ENV on Client side

/* eslint-disable @typescript-eslint/ban-ts-comment */
export const onClientSide = typeof window !== 'undefined';

// Define server env variables
const nodeEnv = (): string | undefined => process.env.NODE_ENV;
const isDev = (): boolean => nodeEnv() === 'development';
const isTest = (): boolean => nodeEnv() === 'ci';
const apiUrl = (): string | undefined => process.env.API_URL;
const frontUrl = (): string | undefined => process.env.FRONT_URL;
const port = (): string | undefined => process.env.PORT;

// Export in env object
export const env = {
  nodeEnv,
  isDev,
  isTest,
  apiUrl,
  frontUrl,
  port,
};
