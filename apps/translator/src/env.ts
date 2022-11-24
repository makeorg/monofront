import 'dotenv/config';

// Define server env variables
const port = (): string | undefined => process.env.PORT;
const deeplUrl = (): string | undefined => process.env.PROVIDER_DEEPL_URL;
const deeplKey = (): string | undefined => process.env.PROVIDER_DEEPL_AUTH_KEY;
const isProduction = (): boolean | undefined =>
  process.env.NODE_ENV === 'production';
const authEndpoint = (): string | undefined =>
  process.env.AUTHENTIFICATION_ENDPOINT;

// Export in env object
export const env = {
  port,
  deeplUrl,
  deeplKey,
  isProduction,
  authEndpoint,
};
