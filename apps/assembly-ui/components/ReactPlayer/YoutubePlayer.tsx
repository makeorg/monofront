import React, { useRef, useCallback, useEffect } from 'react';
import _ReactPlayer, { ReactPlayerProps } from 'react-player';
import i18n from 'i18next';
import { useCookieFirst } from 'react-cookiefirst';
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

export const YoutubePlayer: React.FC<ReactPlayerProps> = props => {
  const { url, seek, small } = props;
  const playerRef = useRef<_ReactPlayer>(null);
  const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;
  const { consent, openPanel } = useCookieFirst();

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

  if (!consent?.functional && !env.isDev()) {
    return (
      <ReactPlayerContainer className={small ? 'small cookies' : 'cookies'}>
        {i18n.t('cookies.youtube')}
        <CookieButtonStyle
          className={small && 'small'}
          type="button"
          onClick={() => openPanel()}
        >
          {i18n.t('cookies.update_action')}
        </CookieButtonStyle>
      </ReactPlayerContainer>
    );
  }

  return (
    <ReactPlayerContainer className={small && 'small'}>
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
      />
    </ReactPlayerContainer>
  );
};
