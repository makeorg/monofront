import React from 'react';
import { OrganisationSoftType } from '@make.org/types';
import { i18n } from '@make.org/utils/i18n';
import { getOrganisationProfileLink } from '@make.org/utils/helpers/url';
import { RedLinkRouterStyle } from '@make.org/ui/elements/LinkElements';
import { trackClickProposalProfile } from '@make.org/utils/services/Tracking';
import { formatOrganisationName } from '@make.org/utils/helpers/stringFormatter';
import { TYPE_ORGANISATION } from '@make.org/utils/constants/user';
import { OrganisationsVoteWrapperStyle } from './style';

type Props = {
  organisations: OrganisationSoftType[],
  country: string,
};

export const OrganisationsVote: React.FC<Props> = (props) => {
  const { organisations, country } = props;

  if (!organisations.length) {
    return null;
  }

  return (
    <OrganisationsVoteWrapperStyle>
      {organisations.map((organisation, index) => (
        <React.Fragment key={organisation.organisationId}>
          {!!index && index + 1 < organisations.length && ', '}
          {!!index
            && index + 1 === organisations.length
            && i18n.t('profile.organisation.and')}
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
