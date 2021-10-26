import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect, useLocation } from 'react-router';
import loadable from '@loadable/component';
import { getHomeLink } from '@make.org/utils/helpers/url';
import { DEFAULT_COUNTRY } from '@make.org/utils/constants/config';
import { useAppContext } from '@make.org/store';
import { COOKIE, SEQUENCE } from '@make.org/types/enums';
import {
  ROUTE_SEARCH,
  ROUTE_SEARCH_PROPOSALS,
  ROUTE_SEARCH_ORGANISATIONS,
  ROUTE_SEARCH_CONSULTATIONS,
  ROUTE_PARTICIPATE,
  ROUTE_EXPLORE,
  ROUTE_SEQUENCE,
  ROUTE_SEQUENCE_POPULAR,
  ROUTE_SEQUENCE_CONTROVERSIAL,
  ROUTE_SEQUENCE_KEYWORD,
  ROUTE_ACCOUNT_ACTIVATION,
  ROUTE_PROPOSAL,
  ROUTE_PASSWORD_RECOVERY,
  ROUTE_PROFILE,
  ROUTE_PROFILE_EDIT,
  ROUTE_PROFILE_PROPOSALS,
  ROUTE_PROFILE_FAVOURITES,
  ROUTE_PROFILE_FOLLOWING,
  ROUTE_ORGANISATION_PROFILE,
  ROUTE_ORGANISATION_PROPOSALS,
  ROUTE_ORGANISATION_VOTES,
  ROUTE_COUNTRY,
  ROUTE_STATIC_LEGAL_FR,
  ROUTE_STATIC_GTU_FR,
  ROUTE_STATIC_DATA_FR,
  ROUTE_STATIC_CONTACT_FR,
  ROUTE_RESULTS,
  ROUTE_TOP_IDEAS,
  ROUTE_PERSONALITY_PROFILE,
  ROUTE_TOP_IDEA_DETAILS,
  ROUTE_PROFILE_OPINIONS,
  ROUTE_STATIC_NOTFOUND,
  ROUTE_STATIC_LEGAL_EN,
  ROUTE_STATIC_GTU_EN,
  ROUTE_STATIC_DATA_EN,
  ROUTE_BROWSE_CONSULTATIONS,
  ROUTE_BROWSE_RESULTS,
  BASE_PREVIEW_PATH,
  ROUTE_STATIC_A11Y_FR,
  ROUTE_EXPLORE_ROOT,
  ROUTE_EXPLORE_FIRST_PAGE,
  ROUTE_CONSULTATION,
  ROUTE_STATIC_COOKIES,
  ROUTE_STATIC_LEGAL_DE,
  ROUTE_STATIC_GTU_DE,
  ROUTE_STATIC_DATA_DE,
  ROUTE_STATIC_CONTACT_DE,
  ROUTE_STATIC_A11Y_DE,
  isExplorePage,
} from '@make.org/utils/routes';
import Cookies from 'universal-cookie';
import { StateUserCookiesPreferences } from '@make.org/types';
import { TwitterUniversalTag } from '@make.org/utils/services/Trackers/TwitterTracking';
import { resetFilterAndSortState } from '@make.org/store/actions/filterAndSort';
import { usePageBackgoundColor } from '../hooks/usePageBackgroundColor';
import { QuestionWrapper } from '../pages/Consultation/QuestionWrapper';

const BrowsePage = loadable(() => import('../pages/Browse'));
const ParticipatePage = loadable(
  () => import('../pages/Consultation/Participate')
);
const ExplorePage = loadable(() => import('../pages/Consultation/Explore'));
export const ResultsPage = loadable(
  () => import('../pages/Consultation/Results')
);
const TopIdeasPage = loadable(() => import('../pages/Consultation/TopIdeas'));
const TopIdeaDetailsPage = loadable(
  () => import('../pages/Consultation/TopIdeaDetails')
);
const SequenceByKindPage = loadable(
  () => import('../pages/Consultation/SequenceByKind')
);
const SequenceByKeywordPage = loadable(
  () => import('../pages/Consultation/SequenceByKeyword')
);
const PasswordRecoveryPage = loadable(
  () => import('../pages/PasswordRecovery')
);
const NotFoundPage = loadable(() => import('../pages/NotFound'));
const HomePage = loadable(() => import('../pages/Home'));
const ProposalPage = loadable(() => import('../pages/Proposal'));
const AccountActivationPage = loadable(
  () => import('../pages/AccountActivation')
);
const ProfileEditPage = loadable(() => import('../pages/Profile/Edit'));

const ProfilePage = loadable(() => import('../pages/Profile'));

const ProfileOpinionsPage = loadable(() => import('../pages/Profile/Opinions'));

const OrganisationPage = loadable(() => import('../pages/Organisation'));

const PersonalityPage = loadable(() => import('../pages/Personality'));

const SearchPage = loadable(() => import('../pages/Search'));

const LegalPage = loadable(() => import('../pages/Static/Legal'));
const TermsOfUse = loadable(() => import('../pages/Static/TermsOfUse'));
const Data = loadable(() => import('../pages/Static/Data'));
const Contact = loadable(() => import('../pages/Static/Contact'));
const Accessibility = loadable(() => import('../pages/Static/A11y'));
const CookiesPage = loadable(() => import('../pages/Static/Cookies'));

export const Routes: FC = () => {
  const cookies = new Cookies();
  const preferencesCookies: StateUserCookiesPreferences = cookies.get(
    COOKIE.USER_PREFERENCES
  );
  const { state, dispatch } = useAppContext();
  const location = useLocation();
  const { country } = state.appConfig;
  const { pathname } = location;

  usePageBackgoundColor(pathname);

  React.useEffect(() => {
    if (preferencesCookies?.twitter_tracking) {
      TwitterUniversalTag.pageView();
    }
    // reset Filter ans Sort State on Explore Page
    if (!isExplorePage(location.pathname)) {
      dispatch(resetFilterAndSortState());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <Switch>
      <Route path={ROUTE_BROWSE_CONSULTATIONS} component={BrowsePage} />
      <Route path={ROUTE_BROWSE_RESULTS} component={BrowsePage} />
      <Redirect path={ROUTE_CONSULTATION} to={ROUTE_PARTICIPATE} />

      <Route path={ROUTE_PARTICIPATE}>
        <QuestionWrapper withRedirect>
          <ParticipatePage />
        </QuestionWrapper>
      </Route>
      <Route path={ROUTE_EXPLORE}>
        <QuestionWrapper withRedirect>
          <ExplorePage />
        </QuestionWrapper>
      </Route>
      <Route path={ROUTE_SEQUENCE_KEYWORD}>
        <QuestionWrapper withRedirect>
          <SequenceByKeywordPage />
        </QuestionWrapper>
      </Route>
      <Route path={ROUTE_SEQUENCE}>
        <QuestionWrapper withRedirect>
          <SequenceByKindPage kind={SEQUENCE.KIND_STANDARD} />
        </QuestionWrapper>
      </Route>
      <Route path={ROUTE_SEQUENCE_POPULAR}>
        <QuestionWrapper withRedirect>
          <SequenceByKindPage kind={SEQUENCE.KIND_CONSENSUS} />
        </QuestionWrapper>
      </Route>
      <Route path={ROUTE_SEQUENCE_CONTROVERSIAL}>
        <QuestionWrapper withRedirect>
          <SequenceByKindPage kind={SEQUENCE.KIND_CONTROVERSY} />
        </QuestionWrapper>
      </Route>
      <Route path={ROUTE_RESULTS}>
        <QuestionWrapper>
          <ResultsPage />
        </QuestionWrapper>
      </Route>
      <Route path={`${BASE_PREVIEW_PATH}${ROUTE_RESULTS}`}>
        <QuestionWrapper>
          <ResultsPage />
        </QuestionWrapper>
      </Route>
      <Route path={ROUTE_TOP_IDEA_DETAILS}>
        <QuestionWrapper>
          <TopIdeaDetailsPage />
        </QuestionWrapper>
      </Route>
      <Route path={ROUTE_TOP_IDEAS}>
        <QuestionWrapper>
          <TopIdeasPage />
        </QuestionWrapper>
      </Route>
      <Route
        path={ROUTE_ACCOUNT_ACTIVATION}
        component={AccountActivationPage}
      />
      <Route path={ROUTE_PROPOSAL} component={ProposalPage} />
      <Route path={ROUTE_PASSWORD_RECOVERY} component={PasswordRecoveryPage} />
      <Route path={ROUTE_PROFILE_EDIT} component={ProfileEditPage} />
      <Route path={ROUTE_PROFILE_PROPOSALS} component={ProfilePage} />
      <Route path={ROUTE_PROFILE_FAVOURITES} component={ProfilePage} />
      <Route path={ROUTE_PROFILE_FOLLOWING} component={ProfilePage} />
      <Route path={ROUTE_PROFILE_OPINIONS} component={ProfileOpinionsPage} />
      <Route path={ROUTE_ORGANISATION_PROPOSALS} component={OrganisationPage} />
      <Route path={ROUTE_ORGANISATION_VOTES} component={OrganisationPage} />
      <Route path={ROUTE_SEARCH} component={SearchPage} />
      <Route path={ROUTE_SEARCH_PROPOSALS} component={SearchPage} />
      <Route path={ROUTE_SEARCH_ORGANISATIONS} component={SearchPage} />
      <Route path={ROUTE_SEARCH_CONSULTATIONS} component={SearchPage} />
      <Route path={ROUTE_PERSONALITY_PROFILE} component={PersonalityPage} />
      <Redirect
        path={ROUTE_ORGANISATION_PROFILE}
        to={ROUTE_ORGANISATION_PROPOSALS}
      />
      <Redirect path={ROUTE_PROFILE} to={ROUTE_PROFILE_PROPOSALS} />
      <Route exact path={ROUTE_COUNTRY} component={HomePage} />
      <Route path={ROUTE_STATIC_NOTFOUND} component={NotFoundPage} />
      <Route path={ROUTE_STATIC_COOKIES} component={CookiesPage} />

      {/* Routes used for fr language */}
      <Route path={ROUTE_STATIC_LEGAL_FR} component={LegalPage} />
      <Route path={ROUTE_STATIC_GTU_FR} component={TermsOfUse} />
      <Route path={ROUTE_STATIC_DATA_FR} component={Data} />
      <Route path={ROUTE_STATIC_CONTACT_FR} component={Contact} />
      <Route path={ROUTE_STATIC_A11Y_FR} component={Accessibility} />

      {/* Routes used for en language */}
      <Route path={ROUTE_STATIC_LEGAL_EN} component={LegalPage} />
      <Route path={ROUTE_STATIC_GTU_EN} component={TermsOfUse} />
      <Route path={ROUTE_STATIC_DATA_EN} component={Data} />

      {/* Routes used for de language */}
      <Route path={ROUTE_STATIC_LEGAL_DE} component={LegalPage} />
      <Route path={ROUTE_STATIC_GTU_DE} component={TermsOfUse} />
      <Route path={ROUTE_STATIC_DATA_DE} component={Data} />
      <Route path={ROUTE_STATIC_CONTACT_DE} component={Contact} />
      <Route path={ROUTE_STATIC_A11Y_DE} component={Accessibility} />

      <Route path={ROUTE_STATIC_NOTFOUND} component={NotFoundPage} />
      <Redirect exact path="/" to={getHomeLink(country || DEFAULT_COUNTRY)} />
      <Redirect path={ROUTE_EXPLORE_ROOT} to={ROUTE_EXPLORE_FIRST_PAGE} />

      <Route component={NotFoundPage} />
    </Switch>
  );
};
