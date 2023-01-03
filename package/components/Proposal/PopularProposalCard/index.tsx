import React, { FC, useState } from 'react';
import i18n from 'i18next';
import { isInProgress } from '@make.org/utils/helpers/date';
import { ProposalType } from '@make.org/types';
import {
  ProposalLinkElementStyle,
  ProposalInnerStyle,
} from '@make.org/ui/elements/ProposalCardElements';
import { closePanel, removePanelContent } from '@make.org/store/actions/panel';
import { ReportOptionsButton } from '@make.org/components/ReportOptions/Button';
import { DeprecatedProposalAuthor } from '@make.org/components/Proposal/DeprecatedAuthor';
import { AuthorWrapperStyle } from '@make.org/components/Proposal/DeprecatedAuthor/Styled';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { getProposalLink } from '@make.org/utils/helpers/url';
import { useAppContext } from '@make.org/store';
import { getProposalContent } from '@make.org/utils/helpers/proposal';
import { ShowTranslation } from '../ShowTranslationElement';
import { Vote } from '../../Vote';
import { DetailledVoteResults } from '../DetailledVoteResults';
import {
  PopularProposalWrapperStyle,
  PopularProposalHeader,
  PopularProposalTagStyle,
} from './style';

type Props = {
  /** Object with all proposal's properties */
  proposal: ProposalType;
  /** Proposal's position in list */
  position: number;
  /** Size of proposals list */
  size: number;
};

export const PopularProposalCard: FC<Props> = ({
  proposal,
  position = 0,
  size = 0,
}) => {
  const { state, dispatch } = useAppContext();
  const { country } = state.appConfig;
  const canVote = isInProgress(proposal.question);
  const [showOriginal, setShowOriginal] = useState<boolean>(false);
  const { proposalContent, proposalLanguage } = getProposalContent(
    showOriginal,
    proposal
  );

  const switchProposalContent = () => {
    setShowOriginal(!showOriginal);
    dispatch(closePanel());
    dispatch(removePanelContent());
  };

  return (
    <PopularProposalWrapperStyle aria-posinset={position} aria-setsize={size}>
      <PopularProposalHeader aria-hidden>
        {`#${position}`}
      </PopularProposalHeader>
      {!showOriginal && (
        <ReportOptionsButton switchProposalContent={switchProposalContent} />
      )}
      <AuthorWrapperStyle>
        <DeprecatedProposalAuthor proposal={proposal} withAvatar />
      </AuthorWrapperStyle>
      <ProposalInnerStyle>
        <ScreenReaderItemStyle>
          <>{i18n.t('proposal_card.content')}</>
        </ScreenReaderItemStyle>
        <ProposalLinkElementStyle
          id={`popular_proposal_content_${position}`}
          to={getProposalLink(
            country,
            proposal.question.slug,
            proposal.id,
            proposal.slug
          )}
          lang={proposalLanguage}
        >
          {proposalContent}
        </ProposalLinkElementStyle>
        {!!proposal.translatedLanguage && (
          <ShowTranslation
            showOriginal={showOriginal}
            onClickAction={() => setShowOriginal(!showOriginal)}
          />
        )}
        {canVote ? (
          <Vote
            proposal={proposal}
            votes={proposal.votes}
            proposalKey={proposal.proposalKey}
            index={position}
          />
        ) : (
          <DetailledVoteResults
            votes={proposal.votes}
            proposalId={proposal.id}
          />
        )}
      </ProposalInnerStyle>
      {proposal.selectedStakeTag && proposal.selectedStakeTag.display && (
        <PopularProposalTagStyle>
          <ScreenReaderItemStyle
            dangerouslySetInnerHTML={{
              __html: i18n.t('consultation.tags.proposal_list'),
            }}
          />
          {proposal.selectedStakeTag.label}
        </PopularProposalTagStyle>
      )}
    </PopularProposalWrapperStyle>
  );
};
