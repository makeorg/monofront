import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Redirect, useLocation } from 'react-router';
import loadable from '@loadable/component';
import { getHomeLink, getNotFoundPath } from '@make.org/utils/helpers/url';
import { DEFAULT_COUNTRY } from '@make.org/utils/constants/config';
import { useAppContext } from '@make.org/store';
import { SEQUENCE } from '@make.org/types/enums';
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
  ROUTE_ORGANISATION_PROFILE,
  ROUTE_ORGANISATION_PROPOSALS,
  ROUTE_ORGANISATION_VOTES,
  ROUTE_COUNTRY,
  ROUTE_STATIC_CONTACT,
  ROUTE_STATIC_LEGAL,
  ROUTE_STATIC_GTU,
  ROUTE_STATIC_DATA,
  ROUTE_STATIC_LEGAL_FR,
  ROUTE_STATIC_GTU_FR,
  ROUTE_STATIC_DATA_FR,
  ROUTE_RESULTS,
  ROUTE_TOP_IDEAS,
  ROUTE_PERSONALITY_PROFILE,
  ROUTE_TOP_IDEA_DETAILS,
  ROUTE_PROFILE_OPINIONS,
  ROUTE_STATIC_NOTFOUND,
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
  ROUTE_STATIC_A11Y,
  ROUTE_STATIC_MODERATION,
  ROUTE_STATIC_MODERATION_DE,
} from '@make.org/utils/routes';
import { usePageBackgoundColor } from '../hooks/usePageBackgroundColor';
import { QuestionWrapper } from '../pages/Consultation/QuestionWrapper';

const BrowsePage = loadable(() => import('../pages/Browse'));
const ParticipatePage = loadable(
  () => import('../pages/Consultation/Participate')
);
const ExplorePage = loadable(() => import('../pages/Consultation/Explore'));
const ResultsPage = loadable(() => import('../pages/Consultation/Results'));
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
const ProfileProposalsPage = loadable(
  () => import('../pages/Profile/Proposals')
);
const ProfileFavouritesPage = loadable(
  () => import('../pages/Profile/Favourites')
);
const ProfileOpinionsPage = loadable(() => import('../pages/Profile/Opinions'));

const OrganisationProposalsPage = loadable(
  () => import('../pages/Organisation/Proposals')
);
const OrganisationVotesPage = loadable(
  () => import('../pages/Organisation/Votes')
);

const PersonalityPage = loadable(() => import('../pages/Personality'));

const SearchPage = loadable(() => import('../pages/Search'));

const LegalPage = loadable(() => import('../pages/Static/Legal'));
const TermsOfUse = loadable(() => import('../pages/Static/TermsOfUse'));
const Data = loadable(() => import('../pages/Static/Data'));
const Contact = loadable(() => import('../pages/Static/Contact'));
const Accessibility = loadable(() => import('../pages/Static/A11y'));
const CookiesPage = loadable(() => import('../pages/Static/Cookies'));
const Moderation = loadable(() => import('../pages/Static/ModerationCharter'));

export const Routes: FC = () => {
  const { state } = useAppContext();
  const location = useLocation();
  const { country } = state.appConfig;
  const { pathname } = location;

  usePageBackgoundColor(pathname);

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
      <Route path={ROUTE_PROPOSAL}>
        <QuestionWrapper>
          <ProposalPage />
        </QuestionWrapper>
      </Route>
      <Route
        path={ROUTE_ACCOUNT_ACTIVATION}
        component={AccountActivationPage}
      />
      <Route path={ROUTE_PASSWORD_RECOVERY} component={PasswordRecoveryPage} />
      <Route path={ROUTE_PROFILE_EDIT} component={ProfileEditPage} />
      <Route path={ROUTE_PROFILE_PROPOSALS} component={ProfileProposalsPage} />
      <Route
        path={ROUTE_PROFILE_FAVOURITES}
        component={ProfileFavouritesPage}
      />
      <Route path={ROUTE_PROFILE_OPINIONS} component={ProfileOpinionsPage} />
      <Route
        path={ROUTE_ORGANISATION_PROPOSALS}
        component={OrganisationProposalsPage}
      />
      <Route
        path={ROUTE_ORGANISATION_VOTES}
        component={OrganisationVotesPage}
      />
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

      {/* Defaults routes for static pages (url in en language) */}
      <Route path={ROUTE_STATIC_NOTFOUND} component={NotFoundPage} />
      <Route path={ROUTE_STATIC_COOKIES} component={CookiesPage} />
      <Route path={ROUTE_STATIC_CONTACT} component={Contact} />
      <Route path={ROUTE_STATIC_LEGAL} component={LegalPage} />
      <Route path={ROUTE_STATIC_GTU} component={TermsOfUse} />
      <Route path={ROUTE_STATIC_DATA} component={Data} />
      <Route path={ROUTE_STATIC_A11Y} component={Accessibility} />
      <Route path={ROUTE_STATIC_MODERATION} component={Moderation} />

      {/* Routes used for fr language */}
      <Route path={ROUTE_STATIC_LEGAL_FR} component={LegalPage} />
      <Route path={ROUTE_STATIC_GTU_FR} component={TermsOfUse} />
      <Route path={ROUTE_STATIC_DATA_FR} component={Data} />
      <Route path={ROUTE_STATIC_A11Y_FR} component={Accessibility} />

      {/* Routes used for de language */}
      <Route path={ROUTE_STATIC_LEGAL_DE} component={LegalPage} />
      <Route path={ROUTE_STATIC_GTU_DE} component={TermsOfUse} />
      <Route path={ROUTE_STATIC_DATA_DE} component={Data} />
      <Route path={ROUTE_STATIC_CONTACT_DE} component={Contact} />
      <Route path={ROUTE_STATIC_A11Y_DE} component={Accessibility} />
      <Route path={ROUTE_STATIC_MODERATION_DE} component={Moderation} />

      <Route path={ROUTE_STATIC_NOTFOUND} component={NotFoundPage} />
      <Redirect exact path="/" to={getHomeLink(country || DEFAULT_COUNTRY)} />
      <Redirect path={ROUTE_EXPLORE_ROOT} to={ROUTE_EXPLORE_FIRST_PAGE} />

      {/* @todo To optimize, should be handled on server side */}
      <Redirect to={getNotFoundPath(country)} />
    </Switch>
  );
};
