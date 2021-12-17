import React, { FC } from 'react';
import i18n from 'i18next';

import {
  ProfilePageSidebarWrapperStyle,
  ProfilePageSidebarStyle,
  ProfileAvatarLayoutStyle,
  ProfileAvatarStyle,
  ProfileContentWrapperStyle,
  ProfileTitleStyle,
  ProfileAlignLeftContentStyle,
  ProfileWebsiteLinkStyle,
  ProfileLinkIconStyle,
} from '@make.org/ui/elements/ProfileElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { TileWithTitle } from '@make.org/ui/components/TileWithTitle';
import { CertifiedIconStyle } from '@make.org/components/Proposal/DeprecatedAuthor/Styled';
import { formatOrganisationName } from '@make.org/utils/helpers/stringFormatter';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import { Sharing } from '@make.org/components/Sharing';
import { Avatar } from '@make.org/ui/components/Avatar';
import { OrganisationType } from '@make.org/types';
import { UserDescription } from '../../app/Profile/UserInformations/Description';

type Props = {
  organisation: OrganisationType;
};

export const OrganisationProfileSidebar: FC<Props> = ({ organisation }) => {
  const { state } = useAppContext();
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);

  return (
    <ProfilePageSidebarWrapperStyle>
      <ProfilePageSidebarStyle>
        <ScreenReaderItemStyle as="h2">
          {i18n.t('organisation.title', {
            name: formatOrganisationName(organisation.organisationName),
          })}
        </ScreenReaderItemStyle>
        <ProfileAvatarLayoutStyle>
          <ProfileAvatarStyle avatarSize={80}>
            <Avatar
              avatarSize={isMobile ? 120 : 160}
              avatarUrl={organisation.avatarUrl}
            />
          </ProfileAvatarStyle>
        </ProfileAvatarLayoutStyle>
        <ProfileContentWrapperStyle>
          <ProfileTitleStyle>
            <ScreenReaderItemStyle>
              {i18n.t('profile.common.labels.organisation')}
            </ScreenReaderItemStyle>
            {formatOrganisationName(organisation.organisationName)}
            <CertifiedIconStyle aria-hidden focusable="false" />
          </ProfileTitleStyle>
        </ProfileContentWrapperStyle>
        {organisation.description && (
          <>
            <ScreenReaderItemStyle>
              {i18n.t('profile.common.labels.biography')}
            </ScreenReaderItemStyle>
            <UserDescription description={organisation.description} />
          </>
        )}
        {organisation.website && (
          <ProfileAlignLeftContentStyle>
            <ScreenReaderItemStyle>
              {i18n.t('profile.common.labels.website')}
            </ScreenReaderItemStyle>
            <ProfileLinkIconStyle aria-hidden focusable="false" />
            <ProfileWebsiteLinkStyle
              as="a"
              target="_blank"
              rel="noopener"
              href={organisation.website}
            >
              {organisation.website}
            </ProfileWebsiteLinkStyle>
          </ProfileAlignLeftContentStyle>
        )}
      </ProfilePageSidebarStyle>
      <TileWithTitle title={i18n.t('profile.organisation.sharing_title')}>
        <Sharing />
      </TileWithTitle>
    </ProfilePageSidebarWrapperStyle>
  );
};
