import React, { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import i18n from 'i18next';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { QuestionService } from '@make.org/utils/services/Question';
import { DeprecatedProposalAuthor } from '@make.org/components/Proposal/DeprecatedAuthor';
import { getProposalLink, getExploreLink } from '@make.org/utils/helpers/url';
import { trackClickExploreTab } from '@make.org/utils/services/Tracking';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { CONSULTATION_NAVIGATION } from '@make.org/utils/constants/ids';
import { scrollToElementId } from '@make.org/utils/helpers/styled';
import { ProposalType, QuestionType } from '@make.org/types';
import {
  CardStyle,
  CardAltTitleStyle,
  FeaturedProposalItemStyle,
  ProposalContentStyle,
  ExploreLinkStyle,
} from './style';

type Props = {
  question: QuestionType;
};

export const FeaturedProposals: FC<Props> = ({ question }) => {
  const { country, pageId } = useParams<{ country: string; pageId: string }>();
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
    scrollToElementId(CONSULTATION_NAVIGATION);
    trackClickExploreTab();
  };

  if (!hasFeaturedProposals) {
    return null;
  }

  return (
    <CardStyle className="margin-bottom">
      <CardAltTitleStyle>
        {i18n.t('consultation.cards.featured_proposals.title')}
      </CardAltTitleStyle>
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
        to={getExploreLink(country, question.slug, Number(pageId))}
        onClick={handleClick}
      >
        {i18n.t('consultation.navigation.explore_desktop')}
      </ExploreLinkStyle>
    </CardStyle>
  );
};
