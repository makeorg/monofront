const isClientSide = (): boolean => typeof window !== 'undefined';
const apiUrl = (): string | undefined => process.env.API_URL || window?.API_URL;
const port = (): string | undefined => process.env.PORT;

// Export in env object
export const env = {
  apiUrl,
  port,
  isClientSide,
};
