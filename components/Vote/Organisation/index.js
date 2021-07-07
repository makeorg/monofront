// @flow
import React from 'react';
import { type OrganisationSoftType } from 'Shared/types/organisation';
import { i18n } from 'Shared/i18n';
import { getOrganisationProfileLink } from 'Shared/helpers/url';
import { RedLinkRouterStyle } from 'Client/ui/Elements/LinkElements';
import { trackClickProposalProfile } from 'Shared/services/Tracking';
import { formatOrganisationName } from 'Shared/helpers/stringFormatter';
import { TYPE_ORGANISATION } from 'Shared/constants/user';
import { OrganisationsVoteWrapperStyle } from './style';

type Props = {
  organisations: OrganisationSoftType[],
  country: string,
};

export const OrganisationsVote = (props: Props) => {
  const { organisations, country } = props;

  if (!organisations.length) {
    return null;
  }

  return (
    <OrganisationsVoteWrapperStyle>
      {organisations.map((organisation, index) => (
        <React.Fragment key={organisation.organisationId}>
          {!!index && index + 1 < organisations.length && ', '}
          {!!index &&
            index + 1 === organisations.length &&
            i18n.t('profile.organisation.and')}
          <RedLinkRouterStyle
            to={getOrganisationProfileLink(
              country,
              organisation.organisationSlug
            )}
            onClick={() => trackClickProposalProfile(TYPE_ORGANISATION)}
          >
            {formatOrganisationName(organisation.organisationName)}
          </RedLinkRouterStyle>
        </React.Fragment>
      ))}
      {i18n.t('profile.organisation.hasVoted', {
        count: organisations.length,
      })}
    </OrganisationsVoteWrapperStyle>
  );
};
