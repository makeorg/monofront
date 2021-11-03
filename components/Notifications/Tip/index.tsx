import React from 'react';
import { useAppContext } from '@make.org/store';
import { NotificationMessage } from '../Message';
import { TipWrapperStyle, TriangleDownStyle } from './style';
import { NotificationIcon } from '../Icon';

type Props = {
  /** isFirstSequenceVote for specific design on sequence firstProposal */
  isFirstSequenceVote: boolean;
};

export const Tip: React.FC<Props> = ({ isFirstSequenceVote = false }) => {
  const { state } = useAppContext();
  const { tip } = state.notifications;
  const { source } = state.appConfig;
  const isWidget = source === 'widget';
  const { contentId = '', level = '' } = tip;

  if (!contentId) return null;

  return (
    <>
      <TipWrapperStyle
        isWidget={isWidget}
        className={isFirstSequenceVote ? 'first-vote' : ''}
      >
        <NotificationIcon level={level} context="tip" />
        <NotificationMessage name={contentId} />
      </TipWrapperStyle>
      {isFirstSequenceVote && <TriangleDownStyle />}
    </>
  );
};
