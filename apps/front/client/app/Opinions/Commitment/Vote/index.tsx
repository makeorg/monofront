import React, { FC } from 'react';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  VoteContainerStyle,
  VoteWrapperStyle,
} from '@make.org/components/Vote/style';
import i18n from 'i18next';
import { VoteButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { VoteIconStyle } from '@make.org/ui/elements/SvgElements';
import { opinionsVoteStaticParams } from '../../params';

const voteKeys = Object.keys(opinionsVoteStaticParams);

type Props = {
  vote: (key: string) => void;
};

export const CommitmentVote: FC<Props> = ({ vote }) => (
  <VoteContainerStyle className="opinions">
    <ScreenReaderItemStyle as="p">
      {i18n.t('vote.intro_title')}
    </ScreenReaderItemStyle>
    <VoteWrapperStyle>
      {voteKeys.map(voteKey => (
        <li key={opinionsVoteStaticParams[voteKey].label}>
          <VoteButtonStyle
            aria-label={opinionsVoteStaticParams[voteKey].label}
            className={voteKey}
            data-cy-button="vote"
            data-cy-vote-key={voteKey}
            onClick={() => vote(voteKey)}
          >
            <VoteIconStyle className={voteKey} aria-hidden focusable="false" />
          </VoteButtonStyle>
        </li>
      ))}
    </VoteWrapperStyle>
  </VoteContainerStyle>
);
