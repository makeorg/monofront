import 'dotenv/config';

// Define server env variables
const port = (): string | undefined => process.env.PORT;
const deeplUrl = (): string | undefined => process.env.PROVIDER_DEEPL_URL;
const deeplKey = (): string | undefined => process.env.PROVIDER_DEEPL_AUTH_KEY;
const chatGPTUrl = (): string | undefined => process.env.PROVIDER_CHATGPT_URL;
const chatGPTKey = (): string | undefined =>
  process.env.PROVIDER_CHATGPT_AUTH_KEY;
const chatGPTOrgId = (): string | undefined =>
  process.env.PROVIDER_CHATGPT_ORG_ID;
const isProduction = (): boolean | undefined =>
  process.env.NODE_ENV === 'production';
const authEndpoint = (): string | undefined =>
  process.env.AUTHENTIFICATION_ENDPOINT;

// Export in env object
export const env = {
  port,
  deeplUrl,
  deeplKey,
  chatGPTUrl,
  chatGPTKey,
  chatGPTOrgId,
  isProduction,
  authEndpoint,
};
