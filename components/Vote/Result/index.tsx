import React from 'react';
import {
  getTotalVotesCount,
  getVotesPercentFromScore,
} from '@make.org/utils/helpers/voteResult';
import { VoteType } from '@make.org/types';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { voteStaticParams } from '@make.org/utils/constants/vote';
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
  const voteKeys = Object.keys(voteStaticParams);
  const votesPercent = getVotesPercentFromScore(votes);
  const tooltipContent = (percent: number, voteKey: string) => (
    <>
      <p>{i18n.t(`vote.${voteKey}`)}</p>
      <p>{i18n.t('common.percent', { percent })}</p>
    </>
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
        {voteKeys.map(voteKey => (
          <li key={`${voteKey}_percent_${proposalId}`}>
            {i18n.t('vote.with_percent', {
              votedKey: i18n.t(`vote.${voteKey}`),
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
                aria-label={i18n.t('common.display_tooltip')}
                color={voteStaticParams[voteKey].color}
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
