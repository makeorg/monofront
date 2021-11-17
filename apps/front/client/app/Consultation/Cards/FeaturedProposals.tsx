import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import i18n from 'i18next';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { QuestionService } from '@make.org/utils/services/Question';
import { DeprecatedProposalAuthor } from '@make.org/components/Proposal/DeprecatedAuthor';
import { getProposalLink, getExploreLink } from '@make.org/utils/helpers/url';
import { trackClickExploreTab } from '@make.org/utils/services/Tracking';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { IDS } from '@make.org/types/enums';
import { scrollToElementId } from '@make.org/utils/helpers/styled';
import { ProposalType, QuestionType } from '@make.org/types';
import {
  ParticipateCardStyle,
  ParticipateCardAltTitleStyle,
} from '@make.org/ui/elements/CardsElements';
import { SORT_RECENT } from '@make.org/utils/constants/explore';
import {
  FeaturedProposalItemStyle,
  ProposalContentStyle,
  ExploreLinkStyle,
} from './style';

type Props = {
  question: QuestionType;
};

export const FeaturedProposals: FC<Props> = ({ question }) => {
  const { country } = useParams<{ country: string; pageId: string }>();
  const [featuredProposals, setFeaturedProposals] = useState<ProposalType[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(false);
  const maxPartnerProposals = 1;
  const limit = 4;

  const getProposals = async () => {
    const response = await QuestionService.getFeaturedProposals(
      question.questionId,
      maxPartnerProposals,
      limit
    );

    if (response) {
      setFeaturedProposals(response.results);
    }

    return setIsLoading(false);
  };

  useEffect(() => {
    getProposals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const hasFeaturedProposals = featuredProposals.length > 0;
  const handleClick = () => {
    scrollToElementId(IDS.CONSULTATION_NAVIGATION);
    trackClickExploreTab();
  };

  if (!hasFeaturedProposals) {
    return null;
  }

  return (
    <ParticipateCardStyle className="margin-bottom">
      <ParticipateCardAltTitleStyle>
        {i18n.t('consultation.cards.featured_proposals.title')}
      </ParticipateCardAltTitleStyle>
      <>
        {isLoading ? (
          <Spinner />
        ) : (
          <UnstyledListStyle>
            {featuredProposals.map(featuredProposal => (
              <FeaturedProposalItemStyle key={featuredProposal.id}>
                <DeprecatedProposalAuthor
                  proposal={featuredProposal}
                  withAvatar
                />
                <ProposalContentStyle
                  to={getProposalLink(
                    country,
                    question.slug,
                    featuredProposal.id,
                    featuredProposal.slug
                  )}
                >
                  {featuredProposal.content}
                </ProposalContentStyle>
              </FeaturedProposalItemStyle>
            ))}
          </UnstyledListStyle>
        )}
      </>
      <ExploreLinkStyle
        to={getExploreLink(country, question.slug, 1, {
          sort: SORT_RECENT,
        })}
        onClick={handleClick}
      >
        {i18n.t('consultation.navigation.explore_desktop')}
      </ExploreLinkStyle>
    </ParticipateCardStyle>
  );
};
