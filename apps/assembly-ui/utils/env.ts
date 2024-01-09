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
};
