import React, { FC, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NotAuthSecuredQuestionType } from '@make.org/types/Question';
import { UserService } from '@make.org/utils/services/User';
import { MOBILE_DEVICE } from '@make.org/utils/constants/config';
import { useAppContext } from '@make.org/store';
import {
  loginSocialSuccess,
  loginSocialFailure,
  getUser,
} from '@make.org/store/actions/authentication';
import { SvgOpenId } from '@make.org/ui/Svg/elements/OpenIdIcon';
import i18n from 'i18next';
import {
  OverlayLoader,
  PrivateAuthCardContainerStyle,
  PrivateAuthCardContentStyle,
  PrivateAuthCardTitleStyle,
  PrivateAuthCardTextStyle,
  PrivateAuthCardButtonStyle,
  PrivateAuthCardErrorStyle,
} from './style';

interface PrivateAuthCardProps {
  authRedirectInfo: NotAuthSecuredQuestionType;
  device: string;
}

export const PrivateAuthCard: FC<PrivateAuthCardProps> = ({
  authRedirectInfo,
  device,
}: PrivateAuthCardProps) => {
  const history = useHistory();
  const { questionId } = authRedirectInfo;

  const [overlayLoader, setOverlayLoader] = useState(false);
  const [redirectUri, setRedirectUri] = useState('');
  const [url, setUrl] = useState('');
  const [dimensions, setDimensions] = useState({
    width: 500,
    height: 500,
    left: 0,
    top: 0,
  });
  const [isWindowOpened, setIsWindowOpened] = useState(false);
  const popupRef = useRef<Window | null>(null);
  const [isLoginError, setIsLoginError] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl = `${window.location.origin}/oidc`;
      setRedirectUri(currentUrl);

      const width = device === MOBILE_DEVICE ? window.screen.width : 500;
      const height = device === MOBILE_DEVICE ? window.screen.height : 500;
      const left = (window.screen.width - width) / 2;
      const top = (window.screen.height - height) / 2;

      setDimensions({ width, height, left, top });
    }
  }, [device]);

  useEffect(() => {
    if (redirectUri) {
      const newUrl =
        `${authRedirectInfo.authorizationEndpoint}` +
        `?client_id=${encodeURIComponent(authRedirectInfo.clientId)}` +
        `&redirect_uri=${encodeURIComponent(redirectUri)}` +
        `&scope=${encodeURIComponent(authRedirectInfo.scope)}` +
        `&response_type=${encodeURIComponent(authRedirectInfo.responseType)}`;
      setUrl(newUrl);
    }
  }, [redirectUri]);

  const { dispatch } = useAppContext();

  const useLoginSuccess = () => async () => {
    dispatch(loginSocialSuccess());
    await getUser(dispatch);
    history.push('auth-succeded');
  };

  const loginSuccess = useLoginSuccess();

  const useLoginFailure = () => () => {
    dispatch(loginSocialFailure());
    setIsLoginError(true);
    setOverlayLoader(false);
  };

  const loginFailure = useLoginFailure();

  return (
    <PrivateAuthCardContainerStyle>
      <PrivateAuthCardContentStyle>
        <PrivateAuthCardTitleStyle>
          {i18n.t('common.social_login.identify')}
        </PrivateAuthCardTitleStyle>
        <PrivateAuthCardTextStyle>
          {i18n.t('common.social_login.participate')}
        </PrivateAuthCardTextStyle>
        <PrivateAuthCardButtonStyle
          type="button"
          onClick={() => {
            setIsLoginError(false);
            if (!url) return;
            const maifWindow = window.open(
              url,
              '_blank',
              `width=${dimensions.width},height=${dimensions.height},left=${dimensions.left},top=${dimensions.top},resizable=yes,scrollbars=yes`
            );

            const handlePopupClose = () => {
              if (!popupRef.current || popupRef.current.closed) {
                setIsWindowOpened(false);
                popupRef.current = null;
                window.removeEventListener('focus', handlePopupClose);
              }
            };

            if (maifWindow) {
              popupRef.current = maifWindow;
              setIsWindowOpened(true);
              window.addEventListener('focus', handlePopupClose);
            }

            const handleMessage = async (e: MessageEvent) => {
              maifWindow?.close();
              if (!maifWindow) setIsWindowOpened(false);

              setOverlayLoader(true);

              window.removeEventListener('message', handleMessage);
              await UserService.loginSocial(
                'oidc',
                e.data.openIdCode!,
                true,
                false,
                loginSuccess,
                loginFailure,
                () => null,
                questionId,
                `${window.location.origin}/oidc`
              );
            };

            window.addEventListener('message', handleMessage);
          }}
          disabled={isWindowOpened}
        >
          <SvgOpenId />
          {i18n.t('common.social_login.openid_connect')}
        </PrivateAuthCardButtonStyle>
        {isLoginError && (
          <PrivateAuthCardErrorStyle>
            {i18n.t('common.social_login.error')}
          </PrivateAuthCardErrorStyle>
        )}
        {overlayLoader && <OverlayLoader />}
      </PrivateAuthCardContentStyle>
    </PrivateAuthCardContainerStyle>
  );
};
