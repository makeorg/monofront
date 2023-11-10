import React, { FC } from 'react';
import { useLocation } from 'react-router';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import i18n from 'i18next';
import { trackClickShare } from '@make.org/utils/services/Tracking';
import {
  SvgFacebookLogoF,
  SvgTwitterLogo,
  SvgLinkedinLogoIn,
} from '@make.org/ui/Svg/elements';
import {
  twitterShareUrl,
  facebookShareUrl,
  linkedinShareUrl,
} from '@make.org/utils/helpers/social';
import { NOTIF } from '@make.org/types/enums';
import { useAppContext } from '@make.org/store';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import {
  SharingStyle,
  FacebookButtonStyle,
  TwitterButtonStyle,
  LinkedInButtonStyle,
} from './Styled';

/**
 * Renders Sharing
 */
export const Sharing: FC = () => {
  const location = useLocation();
  const { state, dispatch } = useAppContext();
  const { facebook_sharing, twitter_sharing, linkedin_sharing } =
    state.user.trackingConsent;

  const displayCookieNotification = () =>
    dispatch(
      displayNotificationBanner(
        NOTIF.SOCIAL_MEDIA_COOKIES_MESSAGE,
        NOTIF.NOTIFICATION_LEVEL_INFORMATION
      )
    );

  return (
    <SharingStyle as={UnstyledListStyle}>
      <li>
        {facebook_sharing ? (
          <FacebookButtonStyle
            rel="noopener"
            aria-label={i18n.t('sharing.facebook') || undefined}
            as="a"
            href={facebookShareUrl(location.pathname)}
            onClick={() => trackClickShare('facebook')}
          >
            <SvgFacebookLogoF aria-hidden focusable="false" />
          </FacebookButtonStyle>
        ) : (
          <FacebookButtonStyle
            aria-label={i18n.t('sharing.facebook') || undefined}
            onClick={displayCookieNotification}
            type="button"
          >
            <SvgFacebookLogoF aria-hidden focusable="false" />
          </FacebookButtonStyle>
        )}
      </li>
      <li>
        {twitter_sharing ? (
          <TwitterButtonStyle
            rel="noopener"
            aria-label={i18n.t('sharing.twitter') || undefined}
            as="a"
            href={twitterShareUrl(location.pathname, '', '')}
            onClick={() => trackClickShare('twitter')}
          >
            <SvgTwitterLogo aria-hidden focusable="false" />
          </TwitterButtonStyle>
        ) : (
          <TwitterButtonStyle
            aria-label={i18n.t('sharing.twitter') || undefined}
            onClick={displayCookieNotification}
            type="button"
          >
            <SvgTwitterLogo aria-hidden focusable="false" />
          </TwitterButtonStyle>
        )}
      </li>
      <li>
        {linkedin_sharing ? (
          <LinkedInButtonStyle
            rel="noopener"
            aria-label={i18n.t('sharing.linkedin') || undefined}
            as="a"
            href={linkedinShareUrl(location.pathname)}
            onClick={() => trackClickShare('linkedin')}
          >
            <SvgLinkedinLogoIn aria-hidden focusable="false" />
          </LinkedInButtonStyle>
        ) : (
          <LinkedInButtonStyle
            aria-label={i18n.t('sharing.linkedin') || undefined}
            onClick={displayCookieNotification}
            type="button"
          >
            <SvgLinkedinLogoIn aria-hidden focusable="false" />
          </LinkedInButtonStyle>
        )}
      </li>
    </SharingStyle>
  );
};
