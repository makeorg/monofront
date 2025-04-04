import React, { FC, useEffect, useRef, useState } from 'react';
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
import { AuthSucceededCard } from '../AuthSucceededCard';

interface PrivateAuthCardProps {
  authRedirectInfo: NotAuthSecuredQuestionType;
  device: string;
}

export const PrivateAuthCard: FC<PrivateAuthCardProps> = ({
  authRedirectInfo,
  device,
}: PrivateAuthCardProps) => {
  const [redirectUri, setRedirectUri] = useState('');
  const [url, setUrl] = useState('');
  const [dimensions, setDimensions] = useState({
    width: 500,
    height: 500,
    left: 0,
    top: 0,
  });
  const [isWindowOpened, setIsWindowOpened] = useState(false);
  const [isOpenIdError, setIsOpenIdError] = useState<{
    error: string;
    errorMessage?: string;
  } | null>(null);
  const [openIdCode, setOpenIdCode] = useState<string | null>(null);
  const [errorLogin, setErrorLogin] = useState<string | null>(null);

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

  if (openIdCode && !errorLogin) {
    return (
      <AuthSucceededCard
        code={openIdCode}
        onError={message => {
          setErrorLogin(message);
        }}
      />
    );
  }

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
              if (!maifWindow) {
                setIsWindowOpened(false);
              }
              window.removeEventListener('message', handleMessage);

              if (e.data.openIdError) {
                setIsOpenIdError({
                  error: e.data.openIdError,
                  errorMessage: e.data.openIdErrorDescription,
                });
              }

              if (e.data.openIdCode) {
                setOpenIdCode(e.data.openIdCode);
              }
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
        {isOpenIdError?.error && (
          <PrivateAuthCardErrorStyle>
            {i18n.t(`common.social_login.oidc_errors.${isOpenIdError.error}`, {
              defaultValue: isOpenIdError.errorMessage,
            })}
          </PrivateAuthCardErrorStyle>
        )}
      </PrivateAuthCardContentStyle>
    </PrivateAuthCardContainerStyle>
  );
};
