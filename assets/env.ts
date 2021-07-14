// TODO find a new way to handle ENV on Client side

/* eslint-disable @typescript-eslint/ban-ts-comment */
export const onClientSide = typeof window !== 'undefined';

// Define client env variables
// @ts-ignore
const nodeEnvWindow = (): string | undefined => onClientSide && window.NODE_ENV;
const isDevWindow = (): boolean => nodeEnvWindow() === 'development';
const isTestWindow = (): boolean => nodeEnvWindow() === 'ci';
// @ts-ignore
const apiUrlWindow = (): string | undefined => onClientSide && window.API_URL;
const proxyTargetApiUrlWindow = (): string | undefined =>
  // @ts-ignore
  onClientSide && window.PROXY_TARGET_API_URL;

const frontUrlWindow = (): string | undefined =>
  // @ts-ignore
  onClientSide && window.FRONT_URL;
// @ts-ignore
const portWindow = (): string | undefined => onClientSide && window.PORT;

// Define server env variables
const nodeEnvProcess = (): string | undefined => process.env.NODE_ENV;
const isDevProcess = (): boolean => nodeEnvProcess() === 'development';
const isTestProcess = (): boolean => nodeEnvProcess() === 'ci';
const apiUrlProcess = (): string | undefined => process.env.API_URL;
const proxyTargetApiUrlProcess = (): string | undefined =>
  process.env.PROXY_TARGET_API_URL;
const frontUrlProcess = (): string | undefined => process.env.FRONT_URL;
const portProcess = (): string | undefined => process.env.PORT;

// Export in env object
export const env = {
  nodeEnv: onClientSide ? nodeEnvWindow : nodeEnvProcess,
  isDev: onClientSide ? isDevWindow : isDevProcess,
  isTest: onClientSide ? isTestWindow : isTestProcess,
  apiUrl: onClientSide ? apiUrlWindow : apiUrlProcess,
  proxyTargetApiUrl: onClientSide
    ? proxyTargetApiUrlWindow
    : proxyTargetApiUrlProcess,
  frontUrl: onClientSide ? frontUrlWindow : frontUrlProcess,
  port: onClientSide ? portWindow : portProcess,
};
