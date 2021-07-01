const onClientSide = typeof window !== 'undefined';

// Define client env variables
const nodeEnvWindow = () => onClientSide && window.NODE_ENV;
const isDevWindow = () => nodeEnvWindow === 'development';
const isTestWindow = () => nodeEnvWindow === 'ci';
const apiUrlWindow = () => onClientSide && window.API_URL;
const proxyTargetApiUrlWindow = () =>
  onClientSide && window.PROXY_TARGET_API_URL;
const frontUrlWindow = () => onClientSide && window.FRONT_URL;
const portWindow = () => onClientSide && window.PORT;

// Define server env variables
const nodeEnvProcess = () => process.env.NODE_ENV;
const isDevProcess = () => nodeEnvProcess === 'development';
const isTestProcess = () => nodeEnvProcess === 'ci';
const apiUrlProcess = () => process.env.API_URL;
const proxyTargetApiUrlProcess = () => process.env.PROXY_TARGET_API_URL;
const frontUrlProcess = () => process.env.FRONT_URL;
const portProcess = () => process.env.PORT;

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
