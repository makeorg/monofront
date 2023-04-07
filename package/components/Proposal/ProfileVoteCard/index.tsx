import React, { FC, useMemo } from 'react';
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
import { useSwitchProposalContent } from '@make.org/utils/hooks/useSwitchProposalContent';
import { AuthorWrapperStyle } from '@make.org/components/Proposal/DeprecatedAuthor/Styled';
import { DeprecatedProposalAuthor } from '@make.org/components/Proposal/DeprecatedAuthor';
import {
  ProposalInnerStyle,
  ProposalLinkElementStyle,
} from '@make.org/ui/elements/ProposalCardElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { getProposalContent } from '@make.org/utils/helpers/proposal';
import { ShowTranslation } from '../ShowTranslationElement';
import { CertifiedIconStyle } from '../Author/style';
import { ReportOptionsButton } from '../../ReportOptions/Button';
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
  const transVoteMap = useMemo(
    () =>
      new Map([
        ['agree', i18n.t('profile.organisation.proposal_agree')],
        ['disagree', i18n.t('profile.organisation.proposal_disagree')],
        ['neutral', i18n.t('profile.organisation.proposal_neutral')],
      ]),
    []
  );
  const { switchProposalContent, showOriginal, setShowOriginal } =
    useSwitchProposalContent();
  const { proposalContent, proposalLanguage } = getProposalContent(
    showOriginal,
    proposal
  );

  return (
    <ProfileVoteWrapperStyle aria-posinset={position} aria-setsize={size}>
      <ProfileVoteTitleStyle>
        <ProfileHasVotedStyle
          aria-label={transVoteMap.get(voteKey) || voteKey}
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
          {transVoteMap.get(voteKey) || voteKey}
        </div>
      </ProfileVoteTitleStyle>
      <ProfileVoteCardStyle>
        <CardStyle as="div">
          {!!proposal.translatedContent && (
            <ReportOptionsButton
              switchProposalContent={switchProposalContent}
              showOriginal={showOriginal}
              proposalId={proposal.id}
              translationLanguage={proposal.translatedLanguage}
            />
          )}
          <AuthorWrapperStyle>
            <DeprecatedProposalAuthor proposal={proposal} withAvatar />
          </AuthorWrapperStyle>
          <ProposalInnerStyle>
            <ScreenReaderItemStyle>
              <>{i18n.t('proposal_card.content')}</>
            </ScreenReaderItemStyle>
            <ProposalLinkElementStyle
              id={`vote_card_proposal_content_${position}`}
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
            {!!proposal.translatedContent && (
              <ShowTranslation
                showOriginal={showOriginal}
                onClickAction={() => setShowOriginal(!showOriginal)}
              />
            )}
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
