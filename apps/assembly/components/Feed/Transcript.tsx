import React, { FC } from 'react';
import i18n from 'i18next';
import { YoutubePlayer } from '../ReactPlayer/YoutubePlayer';
import { VideoLogo } from '../../assets/Video';
import { LinkContentType } from '../../types';
import {
  TranscriptContainerStyle,
  TranscriptVideoContentStyle,
  TranscriptVideoTextContainerStyle,
  TranscriptVideoTitleStyle,
  TranscriptVideoTextStyle,
  TranscriptContentStyle,
  TranscriptTitleStyle,
} from './style';

export const TranscriptSources: FC<{ links: LinkContentType[] }> = ({
  links,
}) => (
  <TranscriptContainerStyle>
    <TranscriptTitleStyle>{i18n.t('feed.sources')}</TranscriptTitleStyle>
    <TranscriptContentStyle>
      {links.map(link => (
        <TranscriptVideoContentStyle key={link.title}>
          <YoutubePlayer url={link.url} small />
          <TranscriptVideoTextContainerStyle>
            <TranscriptVideoTitleStyle>
              <VideoLogo />
              {link.title}
            </TranscriptVideoTitleStyle>
            <TranscriptVideoTextStyle>{link.data}</TranscriptVideoTextStyle>
          </TranscriptVideoTextContainerStyle>
        </TranscriptVideoContentStyle>
      ))}
    </TranscriptContentStyle>
  </TranscriptContainerStyle>
);
