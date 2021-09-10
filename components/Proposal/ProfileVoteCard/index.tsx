import React, { FC } from 'react';
import i18n from 'i18next';
import { OrganisationType, ProposalType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import { VoteIconStyle } from '@make.org/ui/elements/SvgElements';
import { RedLinkStyle } from '@make.org/ui/elements/LinkElements';
import {
  getOrganisationProfileLink,
  getProposalLink,
} from '@make.org/utils/helpers/url';
import { formatOrganisationName } from '@make.org/utils/helpers/stringFormatter';
import { CardStyle } from '@make.org/ui/elements/CardsElements';
import { AuthorWrapperStyle } from '@make.org/components/Proposal/DeprecatedAuthor/Styled';
import { DeprecatedProposalAuthor } from '@make.org/components/Proposal/DeprecatedAuthor';
import {
  ProposalInnerStyle,
  ProposalLinkElementStyle,
} from '@make.org/ui/elements/ProposalCardElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { CertifiedIconStyle } from '../Author/style';
import {
  ProfileVoteCardStyle,
  ProfileVoteWrapperStyle,
  ProfileVoteTitleStyle,
  ProfileHasVotedStyle,
} from './style';
import { VoteResultElement } from '../VoteResultElement';
import { ProposalFooterWithTagElement } from '../FooterElement/ProposalWithTag';

type Props = {
  /** Object with all organisation's properties */
  organisation: OrganisationType;
  /** Object with all proposal's properties */
  proposal: ProposalType;
  /** Nature of the organisation's vote */
  voteKey: string;
  /** Proposal's position in list */
  position: number;
  /** Size of proposals list */
  size: number;
};

export const ProfileVoteCard: FC<Props> = ({
  voteKey,
  organisation,
  proposal,
  position,
  size,
}) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  return (
    <ProfileVoteWrapperStyle aria-posinset={position} aria-setsize={size}>
      <ProfileVoteTitleStyle>
        <ProfileHasVotedStyle
          aria-label={i18n.t(`vote.${voteKey}`)}
          className={`${voteKey} voted`}
        >
          <VoteIconStyle className={`${voteKey} voted`} aria-hidden />
        </ProfileHasVotedStyle>
        <div>
          <RedLinkStyle
            to={getOrganisationProfileLink(
              organisation.country,
              organisation.slug
            )}
          >
            {formatOrganisationName(organisation.organisationName)}
          </RedLinkStyle>
          <CertifiedIconStyle aria-hidden focusable="false" />
          &nbsp;
          {i18n.t(`profile.organisation.proposal_${voteKey}`)}
        </div>
      </ProfileVoteTitleStyle>
      <ProfileVoteCardStyle>
        <CardStyle as="div">
          <AuthorWrapperStyle>
            <DeprecatedProposalAuthor proposal={proposal} withAvatar />
          </AuthorWrapperStyle>
          <ProposalInnerStyle>
            <ScreenReaderItemStyle>
              {i18n.t('proposal_card.content')}
            </ScreenReaderItemStyle>
            <ProposalLinkElementStyle
              id={`vote_card_proposal_content_${position}`}
              to={getProposalLink(
                country,
                proposal.question.slug,
                proposal.id,
                proposal.slug
              )}
              lang={proposal.question.language}
            >
              {proposal.content}
            </ProposalLinkElementStyle>
            <VoteResultElement
              proposalId={proposal.id}
              votes={proposal.votes}
              votedKey={voteKey}
              proposalKey={proposal.proposalKey}
              disableClick
              withTooltip={false}
            />
          </ProposalInnerStyle>

          <ProposalFooterWithTagElement tags={proposal.tags} />
        </CardStyle>
      </ProfileVoteCardStyle>
    </ProfileVoteWrapperStyle>
  );
};
