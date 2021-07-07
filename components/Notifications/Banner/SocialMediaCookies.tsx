import { WhiteLink } from 'Client/ui/Elements/Notifications/Banner/style';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCookiesPageLink } from 'Shared/helpers/url';
import { i18n } from '@make.org/utils/i18n';
import { clearNotificationBanner } from 'Shared/store/actions/notifications';
import { type StateRoot } from 'Shared/store/types';

export const SocialMediaCookiesMessage = () => {
  const dispatch = useDispatch();
  const { country } = useSelector((state: StateRoot) => state.appConfig);

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
