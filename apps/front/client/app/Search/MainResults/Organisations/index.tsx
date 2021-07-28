import React from 'react';
import { Link } from 'react-router-dom';
import { OrganisationType } from '@make.org/types';
import i18n from 'i18next';
import { getOrganisationProfileLink } from '@make.org/utils/helpers/url';
import { Avatar } from '@make.org/ui/components/Avatar';

import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  ProfileContentWrapperStyle,
  ProfileTitleStyle,
  ProfileAvatarLayoutStyle,
} from '@make.org/ui/elements/ProfileElements';
import { CertifiedIconStyle } from '@make.org/components/Proposal/DeprecatedAuthor/Styled';
import { formatOrganisationName } from '@make.org/utils/helpers/stringFormatter';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import {
  SearchOrganisationsListStyle,
  SearchOrganisationsListItemStyle,
  SearchOrganisationItemStyle,
  SearchOrganisationAvatarStyle,
} from './style';
import { MainResultsOrganisationsMobile } from './Mobile';

type Props = {
  organisations: OrganisationType[];
};

export const MainResultsOrganisations: React.FC<Props> = ({
  organisations,
}) => {
  const { state } = useAppContext();
  const { country, device } = state.appConfig;
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
                <SearchOrganisationAvatarStyle avatarSize={80}>
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
