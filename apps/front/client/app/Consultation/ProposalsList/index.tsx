import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { ProposalAuthor } from '@make.org/components/Proposal/Author';
import { ProposalSkeleton } from '@make.org/ui/components/Skeletons/Proposal';
import React, { FC } from 'react';
import { getProposalLink } from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import { ProposalType } from '@make.org/types';
import { Vote } from '@make.org/components/Vote';
import { DateHelper } from '@make.org/utils/helpers/date';
import { useParams } from 'react-router';
import { DATE } from '@make.org/types/enums';
import { SubmitProposal } from '../Cards/SubmitProposal';
import { NoProposalWrapperStyle } from '../../../pages/Consultation/style';
import {
  ProposalsListStyle,
  ProposalListItemStyle,
  ProposalCardStyle,
  ProposalLinkStyle,
  ProposalDateStyle,
} from './style';

type Props = {
  isLoading: boolean;
  proposals: ProposalType[] | [];
};

type SkeletonProps = {
  id: string;
};

const generateSkeletonsList = (count: number) => {
  const skeletonsList = [];

  for (let i = 1; i <= count; i += 1) {
    skeletonsList.push({ id: `skeleton-${i}` });
  }

  return skeletonsList;
};

export const ProposalsList: FC<Props> = ({ isLoading, proposals }) => {
  const { country } = useParams<{ country: string }>();
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
            <ProposalCardStyle>
              <ProposalAuthor proposal={proposal} />
              <ScreenReaderItemStyle>
                {i18n.t('proposal_card.content')}
              </ScreenReaderItemStyle>
              <ProposalLinkStyle
                lang={proposal.question.language}
                to={getProposalLink(
                  country,
                  proposal.question.slug,
                  proposal.id,
                  proposal.slug
                )}
              >
                {proposal.content}
              </ProposalLinkStyle>
              <Vote
                proposal={proposal}
                votes={proposal.votes}
                proposalKey={proposal.proposalKey}
                index={index}
              />
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
