import 'dotenv/config';

// Define server env variables
const port = (): string | undefined => process.env.PORT;
const isProduction = (): boolean | undefined =>
  process.env.NODE_ENV === 'production';
const makeApiUrl = (): string | undefined => process.env.MAKE_API_URL;

// Export in env object
export const env = {
  port,
  isProduction,
  makeApiUrl,
};
