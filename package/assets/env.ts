const isClientSide = (): boolean => typeof window !== 'undefined';

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
const useLocalProxy = (): string | undefined => process.env.LOCAL_USE_PROXY;
const fbPixelId = (): string => process.env.FB_PIXEL_ID || '';
const fbConversionToken = (): string =>
  process.env.FB_CONVERSION_TOKEN || 'undefined';
const hotjarToken = (): string => process.env.HOTJAR_TOKEN || '';
const contentApiUrlServerSide = (): string | undefined =>
  process.env.CONTENT_API_URL_SERVER_SIDE;

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
  isClientSide,
  fbPixelId,
  fbConversionToken,
  hotjarToken,
  contentApiUrlServerSide,
};
