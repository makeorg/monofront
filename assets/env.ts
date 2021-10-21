const isClientSide = (): boolean => typeof window !== 'undefined';
const PRODUCTION_DOMAIN = 'make.org';

// Define server env variables
const nodeEnv = (): string | undefined => process.env.NODE_ENV;
const isDev = (): boolean => nodeEnv() === 'development';
const isTest = (): boolean => nodeEnv() === 'test';
const apiUrlServerSide = (): string | undefined =>
  process.env.API_URL_SERVER_SIDE;
const apiUrlClientSide = (): string | undefined =>
  process.env.API_URL_CLIENT_SIDE;
const frontUrl = (): string | undefined => process.env.FRONT_URL;
const port = (): string | undefined => process.env.PORT;
const isProductionUrl = (): boolean | undefined =>
  process.env.FRONT_URL?.includes(PRODUCTION_DOMAIN);
const useLocalProxy = (): string | undefined => process.env.LOCAL_USE_PROXY;

// Export in env object
export const env = {
  nodeEnv,
  isDev,
  isTest,
  apiUrlServerSide,
  apiUrlClientSide,
  useLocalProxy,
  frontUrl,
  port,
  isProductionUrl,
  isClientSide,
};
