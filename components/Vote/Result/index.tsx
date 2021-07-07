import React from 'react';
import { getTotalVotesCount, getVotesPercent } from '@make.org/utils/helpers/voteResult';
import { VoteType } from '@make.org/types';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { voteStaticParams } from '@make.org/utils/constants/vote';
import { Tooltip } from '@make.org/ui/components/Tooltip';
import { i18n } from '@make.org/utils/i18n';
import {
  VoteResultContainerStyle,
  VoteResultGraphStyle,
  VoteResultItemStyle,
  VoteResultTotalLabelStyle,
  VoteResultBarStyle,
} from './style';
import { ResultTooltip } from './Tooltip';
import { UnvoteButton } from '../Button/Unvote';
import { VoteButtonWrapperStyle } from '../style';

type Props = {
  /** Proposal's Id */
  proposalId: string,
  /** Array of votes */
  votes: VoteType[],
  /** Voted key property */
  votedKey: string,
  /** Method called when vote button is clicked */
  handleUnvote: () => void | Promise<void>,
  /** When waiting response from API */
  pending: boolean,
  /** Disable click on unvote button */
  disableClick: boolean,
  /** Boolean to disable tooltip on button hover event */
  withTooltip: boolean,
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
  const votesCount = getTotalVotesCount(votes);
  const voteKeys = Object.keys(voteStaticParams);
  const votesPercent = getVotesPercent(votes, votesCount);
  const tooltipContent = (percent, voteKey) => (
    <ResultTooltip votePercent={percent} voteKey={voteKey} />
  );

  return (
    <VoteResultContainerStyle>
      <ScreenReaderItemStyle as="p">
        {i18n.t(`results.voted.${votedKey}`)}
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
        {voteKeys.map((voteKey) => (
          <li key={`${voteKey}_percent_${proposalId}`}>
            {i18n.t('vote.with_percent', {
              votedKey: i18n.t(`vote.${voteKey}`),
              votedPercent: votesPercent[voteKey],
            })}
          </li>
        ))}
      </ScreenReaderItemStyle>
      <VoteResultGraphStyle>
        {voteKeys.map((voteKey) => (
          <VoteResultItemStyle key={`${voteKey}_item_${proposalId}`}>
            <Tooltip
              content={tooltipContent(votesPercent[voteKey], voteKey)}
              direction="left"
            >
              <VoteResultBarStyle
                aria-label={i18n.t('common.display_tooltip')}
                color={voteStaticParams[voteKey].color}
                percent={votesPercent[voteKey]}
              />
            </Tooltip>
          </VoteResultItemStyle>
        ))}
      </VoteResultGraphStyle>
      <VoteResultTotalLabelStyle aria-hidden>
        {i18n.t('vote.label', { count: votesCount })}
      </VoteResultTotalLabelStyle>
    </VoteResultContainerStyle>
  );
};
