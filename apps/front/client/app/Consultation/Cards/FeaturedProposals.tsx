import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { i18n } from 'Shared/i18n';
import { UnstyledListStyle } from 'Client/ui/Elements/ListElements';
import { QuestionService } from 'Shared/services/Question';
import { DeprecatedProposalAuthor } from 'Client/ui/Proposal/DeprecatedAuthor';
import { getProposalLink, getExploreLink } from 'Shared/helpers/url';
import { trackClickExploreTab } from 'Shared/services/Tracking';
import { Spinner } from 'Client/ui/Elements/Loading/Spinner';
import { CONSULTATION_NAVIGATION } from 'Shared/constants/ids';
import { scrollToElementId } from 'Shared/helpers/styled';
import {
  CardStyle,
  CardAltTitleStyle,
  FeaturedProposalItemStyle,
  ProposalContentStyle,
  ExploreLinkStyle,
} from './style';

type Props = {
  question: QuestionType,
};

export const FeaturedProposals = ({ question }: Props) => {
  const { country, pageId } = useParams();
  const [featuredProposals, setFeaturedProposals] = useState([]);
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
        to={getExploreLink(country, question.slug, pageId)}
        onClick={handleClick}
      >
        {i18n.t('consultation.navigation.explore_desktop')}
      </ExploreLinkStyle>
    </CardStyle>
  );
};
