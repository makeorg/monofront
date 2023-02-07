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
import { useSwitchProposalContent } from '@make.org/utils/hooks/useSwitchProposalContent';
import {
  ProposalLanguageContext,
  ProposalLanguageContextValue,
  ProposalLanguageContextValueType,
} from '@make.org/store/proposalLanguageContext';
import { ReportOptionsButton } from '@make.org/components/ReportOptions/Button';
import { isInProgress } from '@make.org/utils/helpers/date';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import i18n from 'i18next';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { useAppContext } from '@make.org/store';
import { getProposalContent } from '@make.org/utils/helpers/proposal';
import { ShowTranslation } from '../ShowTranslationElement';
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
  const { switchProposalContent, showOriginal, setShowOriginal } =
    useSwitchProposalContent();
  const { proposalContent, proposalLanguage } = getProposalContent(
    showOriginal,
    proposal
  );
  const proposalLanguageContext: ProposalLanguageContextValueType =
    ProposalLanguageContextValue.getProposalLanguage(proposalLanguage || '');

  return (
    <ProposalLanguageContext.Provider value={proposalLanguageContext}>
      <ProposalCardStyle
        className={withMobileRadius ? 'mobile-radius' : ''}
        aria-posinset={position}
        aria-setsize={size}
      >
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
          <ColumnElementStyle>
            <ScreenReaderItemStyle>
              <>{i18n.t('proposal_card.content')}</>
            </ScreenReaderItemStyle>
            <ProposalLinkElementStyle to={proposalLink} lang={proposalLanguage}>
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
    </ProposalLanguageContext.Provider>
  );
};
