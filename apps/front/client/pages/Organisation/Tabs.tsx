/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC } from 'react';
import i18n from 'i18next';
import {
  TabListStyle,
  TabNavStyle,
  TabStyle,
} from '@make.org/ui/elements/TabsElements';
import { useParams } from 'react-router';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '@make.org/store';
import {
  getRouteOrganisationProposals,
  getRouteOrganisationVotes,
  isOrganisationProposals,
  isOrganisationVotes,
} from '@make.org/utils/routes';

export const OrganisationProfileTabs: FC = () => {
  const { state } = useAppContext();
  const { pathname } = useLocation();
  const params: { organisationSlug: string } = useParams();
  const { organisationSlug } = params;
  const { country } = state.appConfig;

  const organisationProposalsLink = getRouteOrganisationProposals(
    country,
    organisationSlug
  );
  const organisationFavouritesLink = getRouteOrganisationVotes(
    country,
    organisationSlug
  );
  const isOrganisationProposalsActive = isOrganisationProposals(pathname);
  const isOrganisationVotesActive = isOrganisationVotes(pathname);

  return (
    <TabNavStyle
      aria-label={i18n.t('common.secondary_nav') || undefined}
      id="organisation_nav"
    >
      <TabListStyle>
        <TabStyle isSelected={isOrganisationProposalsActive}>
          <Link
            to={organisationProposalsLink}
            aria-current={isOrganisationProposalsActive}
          >
            <>{i18n.t('organisation.tabs.proposals')}</>
          </Link>
        </TabStyle>
        <TabStyle isSelected={isOrganisationVotesActive}>
          <Link
            to={organisationFavouritesLink}
            aria-current={isOrganisationVotesActive}
          >
            <>{i18n.t('organisation.tabs.votes')}</>
          </Link>
        </TabStyle>
      </TabListStyle>
    </TabNavStyle>
  );
};
