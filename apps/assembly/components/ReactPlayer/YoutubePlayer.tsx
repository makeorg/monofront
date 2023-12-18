import React, { useRef, useCallback, useEffect } from 'react';
import _ReactPlayer, { ReactPlayerProps } from 'react-player';
import i18n from 'i18next';
import { ReactPlayerContainer, ReactPlayerPlayButtonStyle } from './style';

export const YoutubePlayer: React.FC<ReactPlayerProps> = props => {
  const { url, seek, small } = props;
  const playerRef = useRef<_ReactPlayer>(null);
  const ReactPlayer = _ReactPlayer as unknown as React.FC<ReactPlayerProps>;

  const onReady = useCallback(() => {
    if (seek) {
      playerRef.current?.seekTo(seek, 'seconds');
    }
  }, [seek]);

  useEffect(() => {
    if (seek) {
      playerRef.current?.seekTo(seek, 'seconds');
    }
  }, [seek]);

  // console warning (Unrecognized feature: 'web-share'.), can be ignored, due web-share feature in chrome not being recognized
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
