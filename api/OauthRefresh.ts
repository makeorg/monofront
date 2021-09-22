export type OauthResponseType = {
  access_token: string;
  refresh_token: string;
};

const configuration: {
  retrieveAccessToken: (
    refreshToken: string
  ) => Promise<null | OauthResponseType>;
  refreshToken: string | null;
  accessToken: string | null;
} = {
  retrieveAccessToken: (accessToken: string) => Promise.resolve(null),
  refreshToken: null,
  accessToken: null,
};

const resetStoredTokens = () => {
  configuration.refreshToken = null;
  configuration.accessToken = null;
};

export const initOauthRefresh = (
  retrieveAccessToken: (
    refreshToken: string
  ) => Promise<null | OauthResponseType>
): void => {
  configuration.retrieveAccessToken = retrieveAccessToken;
};

export const storeTokens = (
  accessToken: string,
  refreshToken: string
): void => {
  configuration.refreshToken = refreshToken;
  configuration.accessToken = accessToken;
};

export const refreshToken = async (): Promise<string | null> => {
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const { refreshToken } = configuration;

  if (!refreshToken) {
    return null;
  }

  const oauthResponse: OauthResponseType | null =
    await configuration.retrieveAccessToken(refreshToken);
  if (!oauthResponse) {
    resetStoredTokens();
    return null;
  }

  const { access_token, refresh_token } = oauthResponse;

  storeTokens(access_token, refresh_token);

  return access_token;
};
