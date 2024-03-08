import React, {
  useRef,
  useCallback,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import _ReactPlayer, { ReactPlayerProps } from 'react-player';
import i18n from 'i18next';
import { useCookieFirst } from 'react-cookiefirst';
import Cookies from 'universal-cookie';
import {
  CookieButtonStyle,
  ReactPlayerContainer,
  ReactPlayerPlayButtonStyle,
} from './style';
import { env } from '../../utils/env';

const toSeconds = (time: any) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const checkConsent = (
  setFunctionalCookies: Dispatch<SetStateAction<boolean>>
) => {
  const cookies = new Cookies();
  const consentCookie = cookies.get('cookiefirst-consent');

  return setFunctionalCookies(consentCookie?.functional);
};

export const YoutubePlayer: React.FC<ReactPlayerProps> = props => {
  const { url, seek, small, onClickPreview } = props;
  const playerRef = useRef<_ReactPlayer>(null);
  const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;
  const { acceptCategory } = useCookieFirst();
  const [functionalCookies, setFunctionalCookies] = useState(true);

  const onReady = useCallback(() => {
    if (seek) {
      playerRef.current?.seekTo(toSeconds(seek), 'seconds');
    }
  }, [seek, playerRef.current]);

  useEffect(() => {
    if (seek) {
      playerRef.current?.seekTo(toSeconds(seek), 'seconds');
    }
  }, [seek]);

  if (!functionalCookies && !env.isDev()) {
    return (
      <ReactPlayerContainer
        className={small ? 'small cookies' : 'cookies welcome'}
      >
        {i18n.t('cookies.functional')}
        <CookieButtonStyle
          className={small && 'small'}
          type="button"
          onClick={() => {
            acceptCategory('functional');
            setFunctionalCookies(true);
          }}
        >
          {i18n.t('cookies.accept_functional')}
        </CookieButtonStyle>
      </ReactPlayerContainer>
    );
  }

  return (
    <ReactPlayerContainer className={small ? 'small' : 'welcome'}>
      <ReactPlayer
        ref={playerRef}
        className="react-player"
        url={url}
        controls
        light
        onReady={onReady}
        playing={seek && true}
        onError={(error: any, data?: any, hlsInstance?: any, hlsGlobal?: any) =>
          console.log(error, data, hlsInstance, hlsGlobal)
        }
        playIcon={<ReactPlayerPlayButtonStyle />}
        config={{
          youtube: {
            playerVars: {
              hl: i18n.language,
              cc_lang_pref: i18n.language,
              cc_load_policy: 1,
            },
          },
        }}
        onClickPreview={(event: any) => {
          if (onClickPreview) {
            onClickPreview(event);
          }
          checkConsent(setFunctionalCookies);
        }}
      />
    </ReactPlayerContainer>
  );
};
