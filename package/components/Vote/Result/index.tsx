import React from 'react';
import {
  getTotalVotesCount,
  getVotesPercentFromScore,
} from '@make.org/utils/helpers/voteResult';
import { VoteType } from '@make.org/types';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { Tooltip } from '@make.org/ui/components/Tooltip';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import {
  VoteResultContainerStyle,
  VoteResultGraphStyle,
  VoteResultItemStyle,
  VoteResultBarStyle,
  VoteResultTotalLabelStyle,
} from './style';
import { UnvoteButton } from '../Button/Unvote';
import { VoteButtonWrapperStyle } from '../style';
import { voteButtonParams } from '../Button/Params';

type Props = {
  /** Proposal's Id */
  proposalId: string;
  /** Array of votes */
  votes: VoteType[];
  /** Voted key property */
  votedKey: string;
  /** Method called when vote button is clicked */
  handleUnvote: () => void;
  /** When waiting response from API */
  pending: boolean;
  /** Disable click on unvote button */
  disableClick?: boolean;
  /** Boolean to disable tooltip on button hover event */
  withTooltip?: boolean;
};

/**
 * Handles Vote Result Business Logic
 */
export const VoteResult: React.FC<Props> = ({
  votes,
  handleUnvote,
  votedKey,
  proposalId,
  pending = false,
  disableClick = false,
  withTooltip = true,
}) => {
  const { state } = useAppContext();
  const { source } = state.appConfig;
  const isWidget = source === 'widget';
  const votesCount = getTotalVotesCount(votes);
  const voteKeys = Object.keys(voteButtonParams);
  const votesPercent = getVotesPercentFromScore(votes);
  const transVoteMap = new Map([
    ['agree', i18n.t('vote.agree')],
    ['disagree', i18n.t('vote.disagree')],
    ['neutral', i18n.t('vote.neutral')],
  ]);

  const tooltipContent = (percent: number, voteKey: string) => (
    <>
      <p>{transVoteMap.get(voteKey) || voteKey}</p>
      <p>{i18n.t('common.percent', { percent })}</p>
    </>
  );

  const transResultVoteMap = new Map([
    ['agree', i18n.t('results.voted.agree')],
    ['disagree', i18n.t('results.voted.disagree')],
    ['neutral', i18n.t('results.voted.neutral')],
  ]);

  return (
    <VoteResultContainerStyle>
      <ScreenReaderItemStyle as="p">
        {transResultVoteMap.get(votedKey) || votedKey}
      </ScreenReaderItemStyle>
      <VoteButtonWrapperStyle>
        <UnvoteButton
          voteKey={votedKey}
          buttonClass={`${votedKey} voted`}
          handleUnvote={handleUnvote}
          displayPending={pending}
          disableClick={disableClick}
          withTooltip={withTooltip}
        />
      </VoteButtonWrapperStyle>
      <ScreenReaderItemStyle as="p">
        {i18n.t('results.total', { count: votesCount })}
      </ScreenReaderItemStyle>
      <ScreenReaderItemStyle as="ul">
        {voteKeys.map(voteKey => (
          <li key={`${voteKey}_percent_${proposalId}`}>
            {i18n.t('vote.with_percent', {
              votedKey: transVoteMap.get(voteKey) || voteKey,
              votedPercent: votesPercent[voteKey],
            })}
          </li>
        ))}
      </ScreenReaderItemStyle>
      <VoteResultGraphStyle className={isWidget ? 'widget' : ''}>
        {voteKeys.map(voteKey => (
          <VoteResultItemStyle key={`${voteKey}_item_${proposalId}`}>
            <Tooltip
              content={tooltipContent(votesPercent[voteKey], voteKey)}
              direction="left"
            >
              <VoteResultBarStyle
                className={isWidget ? 'widget' : ''}
                aria-label={i18n.t('common.display_tooltip') || undefined}
                color={voteButtonParams[voteKey].color}
                percent={votesPercent[voteKey]}
              />
            </Tooltip>
          </VoteResultItemStyle>
        ))}
      </VoteResultGraphStyle>
      <VoteResultTotalLabelStyle
        className={isWidget ? 'widget' : ''}
        aria-hidden
      >
        {i18n.t('vote.label', { count: votesCount })}
      </VoteResultTotalLabelStyle>
    </VoteResultContainerStyle>
  );
};
