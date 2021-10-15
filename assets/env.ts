const isClientSide = (): boolean => typeof window !== 'undefined';
const PRODUCTION_DOMAIN = 'make.org';

// Define server env variables
const nodeEnv = (): string | undefined => process.env.NODE_ENV;
const isDev = (): boolean => nodeEnv() === 'development';
const isTest = (): boolean => nodeEnv() === 'test';
const apiUrl = (): string | undefined => process.env.API_URL;
const proxyTargetApiUrl = (): string | undefined =>
  process.env.LOCAL_PROXY_API_URL || process.env.PROXY_TARGET_API_URL; // need refactor beetween widget and front
const frontUrl = (): string | undefined => process.env.FRONT_URL;
const port = (): string | undefined => process.env.PORT;
const isProductionUrl = (): boolean | undefined =>
  process.env.FRONT_URL?.includes(PRODUCTION_DOMAIN);

// Export in env object
export const env = {
  nodeEnv,
  isDev,
  isTest,
  apiUrl,
  proxyTargetApiUrl,
  frontUrl,
  port,
  isProductionUrl,
  isClientSide,
};
