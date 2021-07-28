// @flow
import { ScreenReaderItemStyle } from 'Client/ui/Elements/AccessibilityElements';
import { ProposalAuthor } from 'Client/ui/Proposal/Author';
import { ProposalSkeleton } from 'Client/ui/Skeletons/Proposal';
import React from 'react';
import { getProposalLink } from 'Shared/helpers/url';
import { i18n } from 'Shared/i18n';
import { type ProposalType } from 'Shared/types/proposal';
import { Vote } from 'Client/features/vote';
import { DateHelper } from 'Shared/helpers/date';
import { useParams } from 'react-router';
import {
  DATE_CAPITALIZE_L_FORMAT,
  DATE_LOWERCASE_LL_FORMAT,
} from 'Shared/constants/date';
import {
  ProposalsListStyle,
  ProposalListItemStyle,
  ProposalCardStyle,
  ProposalLinkStyle,
  ProposalDateStyle,
} from './style';

type Props = {
  isLoading: boolean,
  proposals: ProposalType[] | [],
};

type SkeletonProps = {
  id: string,
};

const generateSkeletonsList = (count: number) => {
  const skeletonsList = [];

  for (let i = 1; i <= count; i += 1) {
    skeletonsList.push({ id: `skeleton-${i}` });
  }

  return skeletonsList;
};

export const ProposalsList = ({ isLoading, proposals }: Props) => {
  const { country } = useParams();
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
          <ProposalListItemStyle key={proposal.id}>
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
                dateTime={DateHelper.localizedAndFormattedDate(
                  proposal.createdAt,
                  DATE_CAPITALIZE_L_FORMAT
                )}
              >
                {DateHelper.localizedAndFormattedDate(
                  proposal.createdAt,
                  DATE_LOWERCASE_LL_FORMAT
                )}
              </ProposalDateStyle>
            </ProposalCardStyle>
          </ProposalListItemStyle>
        ))}
      </ProposalsListStyle>
    );
  }

  // @todo check with product team for behavior without proposals
  return null;
};
