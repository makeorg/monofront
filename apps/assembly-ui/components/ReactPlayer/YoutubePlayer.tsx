import React, { useRef, useCallback, useEffect, useState } from 'react';
import _ReactPlayer, { ReactPlayerProps } from 'react-player';
import i18n from 'i18next';
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

const cookieFirstToken = env.isClientSide()
  ? window.COOKIE_FIRST_TOKEN
  : env.cookieFirstToken();

export const YoutubePlayer: React.FC<ReactPlayerProps> = props => {
  const { url, seek, small, onClickPreview } = props;
  const playerRef = useRef<_ReactPlayer>(null);
  const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;
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

  if (!functionalCookies) {
    return (
      <ReactPlayerContainer className="cookies">
        {i18n.t('cookies.functional')}
        <CookieButtonStyle
          className={small && 'small'}
          type="button"
          onClick={() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            window.CookieFirst.acceptCategory('functional');
          }}
        >
          {i18n.t('cookies.accept_functional')}
        </CookieButtonStyle>
      </ReactPlayerContainer>
    );
  }

  return (
    <ReactPlayerContainer>
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
          if (cookieFirstToken) {
            setFunctionalCookies(
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              window.CookieFirst.consent.functional
            );
          }
          if (onClickPreview) {
            onClickPreview(event);
          }
        }}
      />
    </ReactPlayerContainer>
  );
};
