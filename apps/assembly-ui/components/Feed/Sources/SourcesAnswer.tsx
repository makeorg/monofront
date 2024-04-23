import React, { FC } from 'react';
import i18n from 'i18next';
import { FeedItemType, SourceAnswerType } from '../../../types';
import { DOCUMENT } from '..';
import { YoutubePlayer } from '../../ReactPlayer/YoutubePlayer';
import {
  SourcesDocumentStyle,
  SourcesVideoStyle,
  SourcesAnswerContentDocumentStyle,
  SourcesAnswerContentVideoStyle,
  SourcesAnswerTextIntroStyle,
  SourcesAnswerTextBoldStyle,
  SourcesAnswerDocumentLink,
} from './style';

type Props = { item: FeedItemType };

export const SourcesAnswer: FC<Props> = ({ item }) => {
  const { sources } = item;
  const { source_title, source_url, source_page, source_speech_time } =
    sources as SourceAnswerType;

  if (item.mode === DOCUMENT) {
    return (
      <SourcesAnswerContentDocumentStyle>
        <SourcesDocumentStyle aria-hidden focusable="false" />
        <SourcesAnswerTextIntroStyle>
          <span>{i18n.t('feed.answer_sources_document')}</span>
          <span>&quot;</span>
          <SourcesAnswerTextBoldStyle>
            {source_title}
          </SourcesAnswerTextBoldStyle>
          <span>&quot;.</span>
        </SourcesAnswerTextIntroStyle>
        <SourcesAnswerDocumentLink
          href={`${source_url}#page=${source_page}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {i18n.t('feed.answer_sources_consult_doc')}
        </SourcesAnswerDocumentLink>
      </SourcesAnswerContentDocumentStyle>
    );
  }

  return (
    <SourcesAnswerContentVideoStyle>
      <SourcesVideoStyle aria-hidden focusable="false" />
      <SourcesAnswerTextIntroStyle>
        <span>{i18n.t('feed.answer_sources_video')}</span>
        <span>&quot;</span>
        <SourcesAnswerTextBoldStyle>{source_title}</SourcesAnswerTextBoldStyle>
        <span>&quot;</span>
        <span>{i18n.t('feed.answer_sources_video_2')}</span>
      </SourcesAnswerTextIntroStyle>
      <SourcesAnswerTextIntroStyle>
        <span>{i18n.t('feed.answer_sources_video_time')}</span>
        <SourcesAnswerTextBoldStyle>
          {source_speech_time}
        </SourcesAnswerTextBoldStyle>
      </SourcesAnswerTextIntroStyle>
      <span>{i18n.t('feed.answer_sources_video_extract')}</span>
      <YoutubePlayer url={source_url} seek={source_speech_time} />
    </SourcesAnswerContentVideoStyle>
  );
};
