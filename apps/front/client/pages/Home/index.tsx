import React, { FC, useEffect, useState } from 'react';
import { HomeViewType } from '@make.org/types';
import { trackDisplayHomepage } from '@make.org/utils/services/Tracking';
import { loadHomepage } from '@make.org/store/actions/views';
import { ViewsService } from '@make.org/utils/services/Views';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { MiddlePageWrapperStyle } from '@make.org/ui/elements/MainElements';
import { useAppContext } from '@make.org/store';
import { MetaTags } from '@make.org/components/MetaTags';
import { HighlightsBanner } from '../../app/Homepage/Highlights';
import { HomepageQuestions } from '../../app/Homepage/Questions';
import { FeaturedQuestions } from '../../app/Homepage/Featured/Questions';
import { FeaturedPosts } from '../../app/Homepage/Featured/Posts';
import { Hero } from '../../app/Homepage/Hero';
import { PartnershipBanner } from '../../app/Homepage/Partnership';
import { InternationalPlaceholder } from '../../app/Homepage/International';
import { HomepageSkipLinks } from '../../app/SkipLinks/Homepage';
import { HomepageWrapperStyle } from './style';

export const HomePage: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch, state } = useAppContext();
  const {
    appConfig: { country, language },
    views: { homepage },
  } = state;
  const isFR = country === 'FR';
  const isDE = country === 'DE';
  const displayPartnership = isFR || isDE;
  const hasConsultations =
    (homepage && homepage.currentQuestions.length > 0) ||
    (homepage && homepage.pastQuestions.length > 0);

  const initHomepage = async () => {
    setIsLoading(true);
    const homepageResponse: HomeViewType | null = await ViewsService.getHome(
      country,
      language
    );
    if (homepageResponse && country) {
      dispatch(loadHomepage(homepageResponse, country));
    }
    setIsLoading(false);
  };

  const { featuredQuestions, posts } = homepage || {
    featuredQuestions: [],
    posts: [],
  };
  const hasFeaturedQuestions = featuredQuestions?.length > 0;
  const hasPosts = posts?.length > 0;

  useEffect(() => {
    trackDisplayHomepage();
    if (!homepage || homepage.country !== country) {
      initHomepage();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [country]);

  return (
    <>
      <HomepageSkipLinks />
      <MetaTags />
      {isLoading && (
        <MiddlePageWrapperStyle>
          <Spinner />
        </MiddlePageWrapperStyle>
      )}
      {!isLoading && homepage && (
        <>
          <Hero />
          <HomepageWrapperStyle>
            <HighlightsBanner highlights={homepage.highlights} />
            {hasConsultations ? (
              <HomepageQuestions
                currentQuestions={homepage.currentQuestions}
                pastQuestions={homepage.pastQuestions}
              />
            ) : (
              <InternationalPlaceholder />
            )}
            {hasFeaturedQuestions && (
              <FeaturedQuestions questions={homepage.featuredQuestions} />
            )}
            {hasPosts && <FeaturedPosts posts={homepage.posts} />}
          </HomepageWrapperStyle>
          {displayPartnership && <PartnershipBanner />}
        </>
      )}
    </>
  );
};

// default export needed for loadable component
export default HomePage; // eslint-disable-line import/no-default-export
