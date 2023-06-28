import React, { FC } from 'react';
import i18n from 'i18next';
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
import { PROPOSALS_LISTING_LIMIT } from '@make.org/utils/constants/proposal';
import { Pagination } from '@make.org/components/Pagination';
import { MiddlePageWrapperStyle } from '@make.org/ui/elements/MainElements';
import { useOrganisation } from '@make.org/utils/hooks/useOrganisation';
import { OrganisationProposalsPlaceholder } from './Placeholders/Proposals';
import { OrganisationProfileSkipLinks } from '../../app/SkipLinks/Organisation';
import { OrganisationProfileSidebar } from './Sidebar';
import { OrganisationProfileTabs } from './Tabs';
import NotFoundPage from '../NotFound';

const OrganisationProposalsPage: FC = () => {
  const { organisation, proposals, isLoading, proposalsTotal } =
    useOrganisation(true, false);

  const proposalsLength = proposals.length;
  const renderProposals = !!proposalsLength;
  const renderPlaceholder = !proposalsLength && !isLoading;

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
    return <NotFoundPage />;
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
              <section>
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
          {proposalsTotal > PROPOSALS_LISTING_LIMIT && (
            <Pagination
              itemsPerPage={PROPOSALS_LISTING_LIMIT}
              itemsTotal={proposalsTotal}
            />
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
