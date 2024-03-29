import React from 'react';
import i18n from 'i18next';
import { Link } from 'react-router-dom';
import { ProposalType } from '@make.org/types';
import {
  getSequenceLink,
  getParticipateLink,
} from '@make.org/utils/helpers/url';
import { ReportOptionsButton } from '@make.org/components/ReportOptions/Button';
import { ContentSeparatorStyle } from '@make.org/ui/elements/SeparatorsElements';
import { TallCardStyle } from '@make.org/ui/elements/CardsElements';
import { isInProgress } from '@make.org/utils/helpers/date';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { useSwitchProposalContent } from '@make.org/utils/hooks/useSwitchProposalContent';
import {
  TopComponentContext,
  TopComponentContextValueType,
  TopComponentContextValue,
} from '@make.org/store/topComponentContext';
import { useAppContext } from '@make.org/store';
import { getProposalContent } from '@make.org/utils/helpers/proposal';
import {
  ProposalLanguageContext,
  ProposalLanguageContextValue,
  ProposalLanguageContextValueType,
} from '@make.org/store/proposalLanguageContext';
import { ShowTranslation } from '../ShowTranslationElement';
import { DetailledVoteResults } from '../DetailledVoteResults';
import { Vote } from '../../Vote';
import { DeprecatedProposalAuthor } from '../DeprecatedAuthor';
import {
  InnerProposalStyle,
  ProposalCardContentStyle,
  ProposalCardSeparatorStyle,
  ProposalFooterStyle,
  FooterContentSeparatorStyle,
  FooterContentStyle,
  DescriptionStyle,
  ButtonWrapperStyle,
  ButtonStyle,
} from './style';

type Props = {
  /** Object with all proposal's properties */
  proposal: ProposalType;
};

export const SingleProposalCard: React.FC<Props> = ({ proposal }) => {
  const isConsultationOpened = isInProgress(proposal.question);
  const topComponentContext: TopComponentContextValueType =
    TopComponentContextValue.getSingleProposal();
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const { switchProposalContent, showOriginal, setShowOriginal } =
    useSwitchProposalContent();
  const { proposalContent, proposalLanguage } = getProposalContent(
    showOriginal,
    proposal
  );
  const proposalLanguageContext: ProposalLanguageContextValueType =
    ProposalLanguageContextValue.getProposalLanguage(proposalLanguage || '');

  return (
    <TopComponentContext.Provider value={topComponentContext}>
      <ProposalLanguageContext.Provider value={proposalLanguageContext}>
        <TallCardStyle id="proposal_card">
          <InnerProposalStyle>
            {!!proposal.translatedContent && (
              <ReportOptionsButton
                switchProposalContent={switchProposalContent}
                showOriginal={showOriginal}
                proposalId={proposal.id}
                translationLanguage={proposal.translatedLanguage}
              />
            )}
            <DeprecatedProposalAuthor proposal={proposal} />
            <ProposalCardSeparatorStyle />
            <ScreenReaderItemStyle>
              {i18n.t('proposal_card.content')}
            </ScreenReaderItemStyle>
            <ProposalCardContentStyle lang={proposalLanguage}>
              {proposalContent}
            </ProposalCardContentStyle>
            {isConsultationOpened ? (
              <Vote
                proposal={proposal}
                votes={proposal.votes}
                proposalKey={proposal.proposalKey}
              />
            ) : (
              <DetailledVoteResults
                votes={proposal.votes}
                proposalId={proposal.id}
              />
            )}
          </InnerProposalStyle>
          {!!proposal.translatedContent && (
            <ShowTranslation
              showOriginal={showOriginal}
              onClickAction={() => setShowOriginal(!showOriginal)}
            />
          )}
          <ProposalFooterStyle>
            <ContentSeparatorStyle />
            <FooterContentStyle>
              <DescriptionStyle
                dangerouslySetInnerHTML={{
                  __html: i18n.t('proposal_page.footer_text', {
                    operation_name: `<a 
                  lang=${proposal.question.returnedLanguage}
                  href="${getParticipateLink(
                    country,
                    proposal.question.slug
                  )}">${proposal.question.wording.title}</a>`,
                  }),
                }}
              />
              <FooterContentSeparatorStyle />
              <ButtonWrapperStyle>
                {isConsultationOpened && (
                  <ButtonStyle
                    as={Link}
                    to={getSequenceLink(country, proposal.question.slug)}
                  >
                    {i18n.t('proposal_page.button_1')}
                  </ButtonStyle>
                )}
                <ButtonStyle
                  as={Link}
                  to={getParticipateLink(country, proposal.question.slug)}
                >
                  {i18n.t('proposal_page.button_2')}
                </ButtonStyle>
              </ButtonWrapperStyle>
            </FooterContentStyle>
          </ProposalFooterStyle>
        </TallCardStyle>
      </ProposalLanguageContext.Provider>
    </TopComponentContext.Provider>
  );
};
