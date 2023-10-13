const isClientSide = (): boolean => typeof window !== 'undefined';
const apiUrl = (): string | undefined =>
  isClientSide() ? window?.API_URL : process.env.API_URL;
const port = (): string | undefined =>
  isClientSide() ? window?.PORT : process.env.PORT;

// Export in env object
export const env = {
  apiUrl,
  port,
  isClientSide,
};
