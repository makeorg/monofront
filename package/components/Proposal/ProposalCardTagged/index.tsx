import React, { FC } from 'react';
import { ProposalType } from '@make.org/types';
import { getProposalLink } from '@make.org/utils/helpers/url';
import {
  ProposalCardStyle,
  ProposalLinkElementStyle,
  ProposalInnerStyle,
} from '@make.org/ui/elements/ProposalCardElements';
import { useSwitchProposalContent } from '@make.org/utils/hooks/useSwitchProposalContent';
import { isInProgress } from '@make.org/utils/helpers/date';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import i18n from 'i18next';
import { ReportOptionsButton } from '@make.org/components/ReportOptions/Button';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { useAppContext } from '@make.org/store';
import { getProposalContent } from '@make.org/utils/helpers/proposal';
import { ShowTranslation } from '../ShowTranslationElement';
import { AuthorWrapperStyle } from '../DeprecatedAuthor/Styled';
import { DetailledVoteResults } from '../DetailledVoteResults';
import { OrganisationsVote } from '../../Vote/Organisation';
import { DeprecatedProposalAuthor } from '../DeprecatedAuthor';
import { ProposalFooterWithTagElement } from '../FooterElement/ProposalWithTag';
import { Vote } from '../../Vote';

type Props = {
  /** Object with all organisation's properties */
  proposal: ProposalType;
  /** Proposal's position in list */
  position: number;
  /** Size of proposals list */
  size: number;
};

export const ProposalCardTagged: FC<Props> = ({ proposal, position, size }) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;

  const proposalLink = getProposalLink(
    country,
    proposal.question.slug,
    proposal.id,
    proposal.slug
  );
  const canVote = isInProgress(proposal.question);
  const { switchProposalContent, showOriginal, setShowOriginal } =
    useSwitchProposalContent();
  const { proposalContent, proposalLanguage } = getProposalContent(
    showOriginal,
    proposal
  );

  return (
    <ProposalCardStyle aria-posinset={position} aria-setsize={size}>
      {!!proposal.translatedContent && (
        <ReportOptionsButton
          switchProposalContent={switchProposalContent}
          showOriginal={showOriginal}
        />
      )}
      <AuthorWrapperStyle>
        <DeprecatedProposalAuthor
          proposal={proposal}
          withAvatar
          withCreationDate
        />
      </AuthorWrapperStyle>
      <ProposalInnerStyle>
        <ColumnElementStyle>
          <ScreenReaderItemStyle>
            <>{i18n.t('proposal_card.content')}</>
          </ScreenReaderItemStyle>
          <ProposalLinkElementStyle
            id={`card_tagged_proposal_content_${position}`}
            to={proposalLink}
            lang={proposalLanguage}
          >
            {proposalContent}
          </ProposalLinkElementStyle>
          {!!proposal.translatedContent && (
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
        </ColumnElementStyle>

        {proposal.organisations && (
          <OrganisationsVote
            organisations={proposal.organisations}
            country={country}
          />
        )}
      </ProposalInnerStyle>
      <ProposalFooterWithTagElement tags={proposal.tags} />
    </ProposalCardStyle>
  );
};
