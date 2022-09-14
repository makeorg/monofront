import React from 'react';
import { Vote } from '@make.org/components/Vote';
import { ProposalType } from '@make.org/types';
import {
  getProposalLink,
  getParticipateLink,
} from '@make.org/utils/helpers/url';
import { OrganisationsVote } from '@make.org/components/Vote/Organisation';
import {
  ProposalCardStyle,
  ProposalLinkElementStyle,
  ProposalInnerStyle,
} from '@make.org/ui/elements/ProposalCardElements';
import { isInProgress } from '@make.org/utils/helpers/date';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import i18n from 'i18next';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { useAppContext } from '@make.org/store';
import { AuthorWrapperStyle } from '../DeprecatedAuthor/Styled';
import { DetailledVoteResults } from '../DetailledVoteResults';
import { DeprecatedProposalAuthor } from '../DeprecatedAuthor';
import { ProposalFooterWithQuestionElement } from '../FooterElement/ProposalWithQuestion';

type Props = {
  /** Object with all proposal's properties */
  proposal: ProposalType;
  /** Proposal's position in list */
  position: number;
  /** Size of proposals list */
  size: number;
  /** Show or not organisation who voted */
  withOrganisations?: boolean;
  /** Enable radius on Mobile */
  withMobileRadius?: boolean;
};

export const ProposalCardWithQuestion: React.FC<Props> = ({
  proposal,
  position,
  size,
  withOrganisations = false,
  withMobileRadius = false,
}) => {
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
    <ProposalCardStyle
      className={withMobileRadius ? 'mobile-radius' : ''}
      aria-posinset={position}
      aria-setsize={size}
    >
      <AuthorWrapperStyle>
        <DeprecatedProposalAuthor proposal={proposal} withAvatar />
      </AuthorWrapperStyle>
      <ProposalInnerStyle>
        <ColumnElementStyle>
          <ScreenReaderItemStyle>
            {i18n.t('proposal_card.content')}
          </ScreenReaderItemStyle>
          <ProposalLinkElementStyle
            to={proposalLink}
            lang={proposal.question.returnedLanguage}
          >
            {proposal.content}
          </ProposalLinkElementStyle>
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
        {withOrganisations && proposal.organisations && (
          <OrganisationsVote
            organisations={proposal.organisations}
            country={country}
          />
        )}
      </ProposalInnerStyle>
      <ProposalFooterWithQuestionElement
        question={proposal.question}
        consultationLink={getParticipateLink(country, proposal.question.slug)}
      />
    </ProposalCardStyle>
  );
};
