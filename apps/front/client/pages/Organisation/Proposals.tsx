import React, { FC, useState } from 'react';
import i18n from 'i18next';
import { trackLoadMoreProposals } from '@make.org/utils/services/Tracking';
import { TRACKING } from '@make.org/types/enums';
import {
  TopComponentContext,
  TopComponentContextValue,
} from '@make.org/store/topComponentContext';
import { MetaTags } from '@make.org/components/MetaTags';
import { formatOrganisationName } from '@make.org/utils/helpers/stringFormatter';
import {
  ProfileContentHeaderStyle,
  ProfileHeaderStyle,
  ProfilePageContentStyle,
  ProfilePageContentWrapperStyle,
  ProfileTitleSeparatorStyle,
} from '@make.org/ui/elements/ProfileElements';
import { SecondLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { ProposalCardWithQuestion } from '@make.org/components/Proposal/ProposalCardWithQuestion';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { MiddlePageWrapperStyle } from '@make.org/ui/elements/MainElements';
import { Redirect } from 'react-router';
import { getHomeLink } from '@make.org/utils/helpers/url';
import { useAppContext } from '@make.org/store';
import { useOrganisation } from '@make.org/utils/hooks/useOrganisation';
import { LoadMoreWrapperStyle } from '../../app/Consultation/Styled/Proposal';
import { OrganisationProposalsPlaceholder } from './Placeholders/Proposals';
import { OrganisationProfileSkipLinks } from '../../app/SkipLinks/Organisation';
import { OrganisationProfileSidebar } from './Sidebar';
import { OrganisationProfileTabs } from './Tabs';

const OrganisationProposalsPage: FC = () => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const [loadMoreProposals, setLoadMoreProposals] = useState(false);
  const { organisation, proposals, isLoading, hasMore, page } = useOrganisation(
    loadMoreProposals,
    true
  );

  const clickLoadMore = () => {
    setLoadMoreProposals(true);
    trackLoadMoreProposals(TRACKING.COMPONENT_PARAM_PROPOSALS, page);
  };

  const proposalsLength = proposals.length;
  const renderProposals = !!proposalsLength;
  const renderPlaceholder = !proposalsLength && !isLoading;
  const displayLoadMoreButton = hasMore && !isLoading;

  const topComponentContext =
    TopComponentContextValue.getOrganisationProposalList();

  if (!organisation && isLoading) {
    return (
      <MiddlePageWrapperStyle>
        <Spinner />
      </MiddlePageWrapperStyle>
    );
  }

  if (!organisation) {
    return <Redirect to={getHomeLink(country)} />;
  }

  return (
    <>
      <MetaTags
        title={i18n.t('meta.organisation.proposals.title', {
          organisation: formatOrganisationName(organisation.organisationName),
        })}
      />
      <OrganisationProfileSkipLinks />
      <ProfileHeaderStyle />
      <ProfilePageContentWrapperStyle>
        <OrganisationProfileSidebar organisation={organisation} />
        <ProfilePageContentStyle>
          <OrganisationProfileTabs />
          <ProfileContentHeaderStyle>
            <SecondLevelTitleStyle>
              {i18n.t('organisation.proposals.title', {
                name: formatOrganisationName(organisation.organisationName),
              })}
            </SecondLevelTitleStyle>
            <ProfileTitleSeparatorStyle />
          </ProfileContentHeaderStyle>
          <TopComponentContext.Provider value={topComponentContext}>
            {renderProposals && (
              <section role="feed" aria-live="polite">
                {proposals.map((proposal, index) => (
                  <ProposalCardWithQuestion
                    key={proposal.id}
                    proposal={proposal}
                    position={index + 1}
                    size={proposalsLength}
                  />
                ))}
              </section>
            )}
          </TopComponentContext.Provider>
          {isLoading && <Spinner />}
          {displayLoadMoreButton && (
            <LoadMoreWrapperStyle>
              <RedButtonStyle onClick={clickLoadMore}>
                {i18n.t('consultation.proposal.load_more')}
              </RedButtonStyle>
            </LoadMoreWrapperStyle>
          )}
          {renderPlaceholder && (
            <OrganisationProposalsPlaceholder
              name={formatOrganisationName(organisation.organisationName)}
            />
          )}
        </ProfilePageContentStyle>
      </ProfilePageContentWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default OrganisationProposalsPage; // eslint-disable-line import/no-default-export
