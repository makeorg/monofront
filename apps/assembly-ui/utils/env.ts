const isClientSide = (): boolean => typeof window !== 'undefined';

// Define server env variables
const nodeEnv = (): string | undefined => process.env.NODE_ENV;
const isDev = (): boolean => nodeEnv() === 'development';
const contentUrlServerSide = (): string | undefined =>
  process.env.CONTENT_URL_SERVER_SIDE;
const assemblyUrlServerSide = (): string | undefined =>
  process.env.ASSEMBLY_URL_SERVER_SIDE;
const frontUrl = (): string | undefined => process.env.FRONT_URL;
const port = (): string | undefined => process.env.PORT;
const mixPanelToken = (): string | undefined => process.env.MIXPANEL_TOKEN;
const cookieFirstToken = (): string | undefined =>
  process.env.COOKIE_FIRST_TOKEN;
const fbPixelId = (): string | undefined => process.env.FB_PIXEL_ID;
const fbConversionToken = (): string | undefined =>
  process.env.FB_CONVERSION_TOKEN;
const apiUrlServerSide = (): string | undefined =>
  process.env.CORE_API_URL_SERVER_SIDE;
const apiUrlClientSide = (): string | undefined =>
  process.env.CORE_API_URL_CLIENT_SIDE;
const useLocalProxy = (): boolean => process.env.USE_LOCAL_PROXY === 'true';
const twPixelId = (): string => process.env.TW_PIXEL_ID || '';
const twAPIKey = (): string => process.env.TW_API_KEY || '';
const twAPISecret = (): string => process.env.TW_API_SECRET || '';
const twAccessToken = (): string => process.env.TW_ACCESS_TOKEN || '';
const twTokenSecret = (): string => process.env.TW_TOKEN_SECRET || '';
const toldToken = (): string => process.env.TOLD_TOKEN || '';

// Export in env object
export const env = {
  nodeEnv,
  isDev,
  contentUrlServerSide,
  assemblyUrlServerSide,
  frontUrl,
  port,
  isClientSide,
  mixPanelToken,
  cookieFirstToken,
  fbPixelId,
  fbConversionToken,
  apiUrlServerSide,
  apiUrlClientSide,
  useLocalProxy,
  twPixelId,
  twAPIKey,
  twAPISecret,
  twAccessToken,
  twTokenSecret,
  toldToken,
};
