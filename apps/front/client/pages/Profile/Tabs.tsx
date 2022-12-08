/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC } from 'react';
import i18n from 'i18next';
import { ProfileTabIconStyle } from '@make.org/ui/elements/ProfileElements';
import {
  TabListStyle,
  TabNavStyle,
  TabStyle,
} from '@make.org/ui/elements/TabsElements';
import { Link, useLocation } from 'react-router-dom';
import { useAppContext } from '@make.org/store';
import {
  getRouteProfileFavourites,
  getRouteProfileProposals,
  isProfileFavourites,
  isProfileProposals,
} from '@make.org/utils/routes';

export const ProfileTabs: FC = () => {
  const { state } = useAppContext();
  const { pathname } = useLocation();
  const { country } = state.appConfig;

  const profileProposalsLink = getRouteProfileProposals(country);
  const profileFavouritesLink = getRouteProfileFavourites(country);
  const isProfileProposalsActive = isProfileProposals(pathname);
  const isProfileFavouritesActive = isProfileFavourites(pathname);

  return (
    <TabNavStyle
      aria-label={i18n.t('common.secondary_nav') || undefined}
      id="profile_nav"
    >
      <TabListStyle>
        <TabStyle isSelected={isProfileProposalsActive}>
          <Link
            to={profileProposalsLink}
            aria-current={isProfileProposalsActive}
            data-cy-link="tab-proposals"
          >
            <>{i18n.t('profile.tabs.proposals')}</>
          </Link>
        </TabStyle>
        <TabStyle isSelected={isProfileFavouritesActive}>
          <Link
            to={profileFavouritesLink}
            aria-current={isProfileFavouritesActive}
            className="inline"
            data-cy-link="tab-favorites"
          >
            <>{i18n.t('profile.tabs.favourites')}</>
            <ProfileTabIconStyle aria-hidden focusable="false" />
          </Link>
        </TabStyle>
      </TabListStyle>
    </TabNavStyle>
  );
};
