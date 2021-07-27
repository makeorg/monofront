// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { type OrganisationType } from '@make.org/utils/types/organisation';
import i18n from 'i18next';
import { getOrganisationProfileLink } from '@make.org/utils/helpers/url';
import { type StateRoot } from '@make.org/utils/store/types';
import { Avatar } from '@make.org/ui/Avatar';
import {
  SearchOrganisationsListStyle,
  SearchOrganisationsListItemStyle,
  SearchOrganisationItemStyle,
  SearchOrganisationAvatarStyle,
} from 'Client/features/search/Styled';

import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  ProfileContentWrapperStyle,
  ProfileTitleStyle,
  ProfileAvatarLayoutStyle,
} from '@make.org/ui/elements/ProfileElements';
import { CertifiedIconStyle } from '@make.org/ui/Proposal/DeprecatedAuthor/Styled';
import { formatOrganisationName } from '@make.org/utils/helpers/stringFormatter';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { MainResultsOrganisationsMobile } from './Mobile';

type Props = {
  organisations: OrganisationType[],
};

export const MainResultsOrganisations = ({ organisations }: Props) => {
  const { country, device } = useSelector(
    (state: StateRoot) => state.appConfig
  );
  const isMobile = matchMobileDevice(device);

  if (isMobile) {
    return <MainResultsOrganisationsMobile organisations={organisations} />;
  }
  return (
    <div id="organisations_list" role="feed">
      <SearchOrganisationsListStyle>
        {organisations.map(organisation => (
          <SearchOrganisationsListItemStyle key={organisation.organisationId}>
            <SearchOrganisationItemStyle
              as={Link}
              to={getOrganisationProfileLink(country, organisation.slug)}
            >
              <ProfileAvatarLayoutStyle>
                <SearchOrganisationAvatarStyle>
                  <Avatar avatarSize={80} avatarUrl={organisation.avatarUrl} />
                </SearchOrganisationAvatarStyle>
                <ProfileContentWrapperStyle>
                  <ProfileTitleStyle>
                    <ScreenReaderItemStyle>
                      {i18n.t('profile.common.labels.organisation')}
                    </ScreenReaderItemStyle>
                    {formatOrganisationName(organisation.organisationName)}
                    <CertifiedIconStyle aria-hidden focusable="false" />
                  </ProfileTitleStyle>
                </ProfileContentWrapperStyle>
              </ProfileAvatarLayoutStyle>
            </SearchOrganisationItemStyle>
          </SearchOrganisationsListItemStyle>
        ))}
      </SearchOrganisationsListStyle>
    </div>
  );
};
