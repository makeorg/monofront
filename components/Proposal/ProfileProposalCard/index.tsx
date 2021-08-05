import React, { FC } from 'react';
import i18n from 'i18next';
import { ProposalType } from '@make.org/types';
import { AuthorWrapperStyle } from '@make.org/components/Proposal/DeprecatedAuthor/Styled';
import { DeprecatedProposalAuthor } from '@make.org/components/Proposal/DeprecatedAuthor';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  ProposalElementStyle,
  ProposalLinkElementStyle,
} from '@make.org/ui/elements/ProposalCardElements';
import {
  getParticipateLink,
  getProposalLink,
} from '@make.org/utils/helpers/url';
import { ProfileProposalCardStyle } from './style';
import { DetailledVoteResults } from '../DetailledVoteResults';
import { ProposalFooterWithQuestionElement } from '../FooterElement/ProposalWithQuestion';

type Props = {
  /** Object with all proposal's properties */
  proposal: ProposalType;
  /** Proposal's position in list */
  position: number;
  /** Size of proposals list */
  size: number;
};

export const ProfileProposalCard: FC<Props> = ({
  proposal,
  position,
  size,
}) => {
  const formattedProposalStatus = proposal.status.toLowerCase();
  const isProposalAccepted = formattedProposalStatus === 'accepted';

  return (
    <ProfileProposalCardStyle
      aria-posinset={position}
      aria-setsize={size}
      className={`proposal-${formattedProposalStatus}`}
    >
      <AuthorWrapperStyle>
        <DeprecatedProposalAuthor
          proposal={proposal}
          withAvatar
          formattedProposalStatus={formattedProposalStatus}
        />
      </AuthorWrapperStyle>
      <ScreenReaderItemStyle>
        {i18n.t('proposal_card.content')}
      </ScreenReaderItemStyle>
      {isProposalAccepted ? (
        <ProposalLinkElementStyle
          id={`proposal_card__proposal_content_${position}`}
          to={getProposalLink(
            proposal.context.country,
            proposal.question.slug,
            proposal.id,
            proposal.slug
          )}
          lang={proposal.question.language}
        >
          {proposal.content}
        </ProposalLinkElementStyle>
      ) : (
        <ProposalElementStyle
          id={`proposal_card__proposal_content_${position}`}
          lang={proposal.question.language}
        >
          {proposal.content}
        </ProposalElementStyle>
      )}
      {isProposalAccepted && (
        <DetailledVoteResults votes={proposal.votes} proposalId={proposal.id} />
      )}
      <ProposalFooterWithQuestionElement
        question={proposal.question}
        consultationLink={getParticipateLink(
          proposal.context.country,
          proposal.question.slug
        )}
      />
    </ProfileProposalCardStyle>
  );
};
