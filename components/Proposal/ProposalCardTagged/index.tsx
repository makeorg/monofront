import React, { FC } from 'react';
import { ProposalType } from '@make.org/types';
import { getProposalLink } from '@make.org/utils/helpers/url';
import {
  ProposalCardStyle,
  ProposalStyle,
  ProposalInnerStyle,
} from '@make.org/ui/elements/ProposalCardElements';
import { isInProgress } from '@make.org/utils/helpers/date';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import i18n from 'i18next';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { useAppContext } from '@make.org/store';
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

  return (
    <ProposalCardStyle aria-posinset={position} aria-setsize={size}>
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
            {i18n.t('proposal_card.content')}
          </ScreenReaderItemStyle>
          <ProposalStyle
            id={`card_tagged_proposal_content_${position}`}
            to={proposalLink}
            lang={proposal.question.language}
          >
            {proposal.content}
          </ProposalStyle>
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
