import React from 'react';
import { getCookiesPageLink } from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import { clearNotificationBanner } from '@make.org/store/actions/notifications';
import { useAppContext } from '@make.org/store';
import { WhiteLink } from './style';

export const SocialMediaCookiesMessage: React.FC = () => {
  const { dispatch, state } = useAppContext();
  const { country } = state.appConfig;

  return (
    <>
      {i18n.t('common.notifications.cookies.social_media')}
      <WhiteLink
        to={getCookiesPageLink(country)}
        onClick={() => dispatch(clearNotificationBanner())}
      >
        {i18n.t('common.notifications.cookies.cookie_page')}
      </WhiteLink>
      .
    </>
  );
};
