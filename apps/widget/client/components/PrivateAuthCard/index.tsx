import React, { FC, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { NotAuthSecuredQuestionType } from '@make.org/types/Question';
import { MOBILE_DEVICE } from '@make.org/utils/constants/config';
import { SvgOpenId } from '@make.org/ui/Svg/elements/OpenIdIcon';
import i18n from 'i18next';
import {
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
  errorLogin: boolean;
}

export const PrivateAuthCard: FC<PrivateAuthCardProps> = ({
  authRedirectInfo,
  device,
  errorLogin,
}: PrivateAuthCardProps) => {
  const history = useHistory();
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

              window.removeEventListener('message', handleMessage);
              history.push({
                pathname: 'auth-succeeded',
                search: `?code=${e.data.openIdCode}`,
              });
            };

            window.addEventListener('message', handleMessage);
          }}
          disabled={isWindowOpened}
        >
          <SvgOpenId />
          {i18n.t('common.social_login.openid_connect')}
        </PrivateAuthCardButtonStyle>
        {errorLogin && (
          <PrivateAuthCardErrorStyle>
            {i18n.t('common.social_login.error')}
          </PrivateAuthCardErrorStyle>
        )}
      </PrivateAuthCardContentStyle>
    </PrivateAuthCardContainerStyle>
  );
};
