import React, { FC } from 'react';
import i18n from 'i18next';
import { ProposalType } from '@make.org/types';
import { AuthorWrapperStyle } from '@make.org/components/Proposal/DeprecatedAuthor/Styled';
import { DeprecatedProposalAuthor } from '@make.org/components/Proposal/DeprecatedAuthor';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { useSwitchProposalContent } from '@make.org/utils/hooks/useSwitchProposalContent';
import {
  ProposalElementStyle,
  ProposalLinkElementStyle,
} from '@make.org/ui/elements/ProposalCardElements';
import {
  getParticipateLink,
  getProposalLink,
} from '@make.org/utils/helpers/url';
import { getProposalContent } from '@make.org/utils/helpers/proposal';
import { ShowTranslation } from '../ShowTranslationElement';
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
  const { switchProposalContent, showOriginal, setShowOriginal } =
    useSwitchProposalContent();
  const { proposalContent, proposalLanguage } = getProposalContent(
    showOriginal,
    proposal
  );
  const formattedProposalStatus = proposal.status.toLowerCase();
  const isProposalAccepted = formattedProposalStatus === 'accepted';

  const isOldProposalWithoutCountry = !proposal.context.country;
  const proposalLink = isOldProposalWithoutCountry
    ? '#'
    : getProposalLink(
        proposal.context.country,
        proposal.question.slug,
        proposal.id,
        proposal.slug
      );
  const participateLink = isOldProposalWithoutCountry
    ? '#'
    : getParticipateLink(proposal.context.country, proposal.question.slug);

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
          switchProposalContent={switchProposalContent}
          showOriginal={showOriginal}
        />
      </AuthorWrapperStyle>
      <ScreenReaderItemStyle>
        <>{i18n.t('proposal_card.content')}</>
      </ScreenReaderItemStyle>
      {isProposalAccepted ? (
        <>
          <ProposalLinkElementStyle
            id={`proposal_card__proposal_content_${position}`}
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
        </>
      ) : (
        <>
          <ProposalElementStyle
            id={`proposal_card__proposal_content_${position}`}
            lang={proposalLanguage}
          >
            {proposalContent}
          </ProposalElementStyle>
          {!!proposal.translatedContent && (
            <ShowTranslation
              showOriginal={showOriginal}
              onClickAction={() => setShowOriginal(!showOriginal)}
            />
          )}
        </>
      )}
      {isProposalAccepted && (
        <DetailledVoteResults votes={proposal.votes} proposalId={proposal.id} />
      )}
      <ProposalFooterWithQuestionElement
        question={proposal.question}
        consultationLink={participateLink}
      />
    </ProfileProposalCardStyle>
  );
};
