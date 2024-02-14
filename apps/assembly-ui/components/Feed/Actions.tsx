import React, { FC, useState } from 'react';
import i18n from 'i18next';
import {
  ActionsButtonStyle,
  ActionsButtonsContainerStyle,
  ActionsContainerStyle,
  ActionsTitleStyle,
} from './style';
import { DOCUMENT, TRANSCRIPT } from '.';
import { FeedItemType } from '../../types';
import { useAssemblyContext } from '../../store/context';
import { StreamLLM } from '../Prompt/Stream';
import { disableFeedStreaming } from '../../store/feed/actions';

type Props = {
  item: FeedItemType;
};

export const Actions: FC<Props> = ({ item }) => {
  const [mode, setMode] = useState(TRANSCRIPT);
  const { state, dispatch } = useAssemblyContext();
  const { isStreaming } = state.feed;

  const { setStartStream } = StreamLLM(item.question, mode);

  const handleDocumentQuestion = () => {
    setMode(DOCUMENT);
    dispatch(disableFeedStreaming());
    setStartStream(true);
  };

  return (
    <ActionsContainerStyle>
      <ActionsTitleStyle>{i18n.t('feed.hyperlinks_title')}</ActionsTitleStyle>
      <ActionsButtonsContainerStyle>
        <ActionsButtonStyle
          type="button"
          disabled={isStreaming}
          onClick={() => handleDocumentQuestion()}
        >
          {i18n.t('feed.document_sources')}
        </ActionsButtonStyle>
      </ActionsButtonsContainerStyle>
    </ActionsContainerStyle>
  );
};
