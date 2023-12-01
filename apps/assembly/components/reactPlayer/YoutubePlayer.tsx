import React, { useRef, useCallback, useEffect } from 'react';
import _ReactPlayer, { ReactPlayerProps } from 'react-player';
import i18n from 'i18next';
import { ReactPlayerContainer } from './style';

export const YoutubePlayer: React.FC<ReactPlayerProps> = props => {
  const { url, seek, background } = props;
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
    <ReactPlayerContainer className={background && 'background'}>
      <ReactPlayer
        ref={playerRef}
        url={`https://www.youtube.com/embed/${url}`}
        controls
        onReady={onReady}
        playing={seek && true}
        onError={(error: any, data?: any, hlsInstance?: any, hlsGlobal?: any) =>
          console.log(error, data, hlsInstance, hlsGlobal)
        }
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
