import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { ProposalAuthor } from '@make.org/components/Proposal/Author';
import { ProposalSkeleton } from '@make.org/ui/components/Skeletons/Proposal';
import React, { FC } from 'react';
import { getProposalLink } from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import { useSwitchProposalContent } from '@make.org/utils/hooks/useSwitchProposalContent';
import { ReportOptionsButton } from '@make.org/components/ReportOptions/Button';
import { ProposalType } from '@make.org/types';
import { Vote } from '@make.org/components/Vote';
import { DateHelper } from '@make.org/utils/helpers/date';
import { DATE } from '@make.org/types/enums';
import { useAppContext } from '@make.org/store';
import { ShowTranslation } from '@make.org/components/Proposal/ShowTranslationElement';
import { getProposalContent } from '@make.org/utils/helpers/proposal';
import { SubmitProposal } from '../Cards/SubmitProposal';
import { NoProposalWrapperStyle } from '../../../pages/Consultation/style';
import {
  ProposalsListStyle,
  ProposalListItemStyle,
  ProposalCardStyle,
  ProposalLinkStyle,
  ProposalDateStyle,
  ProposalAndVoteWrapperStyle,
} from './style';

type Props = {
  isLoading: boolean;
  proposals: ProposalType[] | [];
};

type SkeletonProps = {
  id: string;
};

type CardProps = {
  proposal: ProposalType;
  country: string;
  index: number;
};

const generateSkeletonsList = (count: number) => {
  const skeletonsList = [];

  for (let i = 1; i <= count; i += 1) {
    skeletonsList.push({ id: `skeleton-${i}` });
  }

  return skeletonsList;
};

export const ProposalsCard: FC<CardProps> = ({ proposal, country, index }) => {
  const { switchProposalContent, showOriginal, setShowOriginal } =
    useSwitchProposalContent();
  const { proposalContent, proposalLanguage } = getProposalContent(
    showOriginal,
    proposal
  );

  return (
    <ProposalCardStyle>
      {!!proposal.translatedContent && (
        <ReportOptionsButton
          switchProposalContent={switchProposalContent}
          showOriginal={showOriginal}
          proposalId={proposal.id}
          translationLanguage={proposal.translatedLanguage}
        />
      )}
      <ProposalAuthor proposal={proposal} />
      <ProposalAndVoteWrapperStyle>
        <ScreenReaderItemStyle>
          {i18n.t('proposal_card.content')}
        </ScreenReaderItemStyle>
        <ProposalLinkStyle
          lang={proposalLanguage}
          to={getProposalLink(
            country,
            proposal.question.slug,
            proposal.id,
            proposal.slug
          )}
        >
          {proposalContent}
        </ProposalLinkStyle>
        <Vote
          proposal={proposal}
          votes={proposal.votes}
          proposalKey={proposal.proposalKey}
          index={index}
        />
      </ProposalAndVoteWrapperStyle>
      {!!proposal.translatedContent && (
        <ShowTranslation
          showOriginal={showOriginal}
          onClickAction={() => setShowOriginal(!showOriginal)}
        />
      )}
      <ScreenReaderItemStyle>
        {i18n.t('proposal_card.author.date')}
      </ScreenReaderItemStyle>
      <ProposalDateStyle
        dateTime={
          DateHelper.localizedAndFormattedDate(
            proposal.createdAt,
            DATE.P_FORMAT
          ) || ''
        }
      >
        {DateHelper.localizedAndFormattedDate(
          proposal.createdAt,
          DATE.PP_FORMAT
        )}
      </ProposalDateStyle>
    </ProposalCardStyle>
  );
};

export const ProposalsList: FC<Props> = ({ isLoading, proposals }) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const skeletonsList: SkeletonProps[] = generateSkeletonsList(12);
  const hasProposals = proposals.length > 0;

  if (isLoading) {
    return (
      <ProposalsListStyle>
        {skeletonsList.map(skeleton => (
          <ProposalListItemStyle key={skeleton.id}>
            <ProposalSkeleton />
          </ProposalListItemStyle>
        ))}
      </ProposalsListStyle>
    );
  }

  if (hasProposals) {
    return (
      <ProposalsListStyle>
        {proposals.map((proposal: ProposalType, index: number) => (
          <ProposalListItemStyle
            key={proposal.id}
            role="feed"
            aria-live="assertive"
          >
            <ProposalsCard
              proposal={proposal}
              country={country}
              index={index}
            />
          </ProposalListItemStyle>
        ))}
      </ProposalsListStyle>
    );
  }

  return (
    <NoProposalWrapperStyle>
      <SubmitProposal />
    </NoProposalWrapperStyle>
  );
};
