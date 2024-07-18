import React, { FC } from 'react';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { DateHelper } from '@make.org/utils/helpers/date';
import {
  FACEBOOK_LINK_EN,
  FACEBOOK_LINK_FR,
  GOOGLE_LINK_EN,
  GOOGLE_LINK_FR,
  GOOGLE_LINK_DE,
  LINKEDIN_LINK_EN,
  LINKEDIN_LINK_FR,
  LINKEDIN_LINK_DE,
  TWITTER_LINK_EN,
  TWITTER_LINK_FR,
  TWITTER_LINK_DE,
  HOTJAR_LINK,
  TOLD_LINK,
} from '@make.org/utils/constants/config';
import { trackClickModalCookieSave } from '@make.org/utils/services/Tracking';
import {
  initTrackersFromPreferences,
  removeTrackersFromPreferences,
  setCookieWithTrackingConsent,
} from '@make.org/utils/helpers/clientCookies';
import { displayNotificationBanner } from '@make.org/store/actions/notifications';
import { MetaTags } from '@make.org/components/MetaTags';
import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { NOTIF, TRACKING_CONSENT } from '@make.org/types/enums';
import {
  SvgLoudSpeaker,
  SvgSettings,
  SvgSmiley,
  SvgStats,
} from '@make.org/ui/Svg/elements';
import {
  CenterColumnStyle,
  ColumnElementStyle,
} from '@make.org/ui/elements/FlexElements';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import {
  CookieDescriptionStyle,
  CookieLabelStyle,
  CookieModalCookieDetailParagraphStyle,
  CookieModalElementStyle,
  CookieModalSectionWrapperStyle,
  CookieSectionWrapperStyle,
  CookieSVGStyle,
} from '@make.org/components/CookieModal/style';
import { CookieSwitch } from '@make.org/components/CookieModal/CookieSwitch';
import { trackingParamsService } from '@make.org/utils/services/TrackingParamsService';
import { ClientLogger } from '@make.org/logger/clientLogger';
import {
  StaticExternalLinkIconStyle,
  StaticPageWrapperStyle,
  StaticParagraphStyle,
  StaticPrimaryUnorderedListItemStyle,
  StaticPrimaryUnorderedListStyle,
  StaticSecondLevelTitleStyle,
  StaticSquareListItemStyle,
  StaticSquareListStyle,
  StaticThirdLevelTitleStyle,
  StaticTitleExtra,
} from './style';

const CookiesPage: FC = () => {
  const { dispatch, state } = useAppContext();
  const { country } = state.appConfig;
  const { trackingConsent } = state.user;
  const formattedDate = DateHelper.localizedAndFormattedDate(
    '2021/3/28',
    'dd MMMM yyyy'
  );
  const isFR = country === 'FR';
  const isDE = country === 'DE';
  const facebookLink = isFR ? FACEBOOK_LINK_FR : FACEBOOK_LINK_EN;
  const googleLink = () => {
    if (isFR) return GOOGLE_LINK_FR;
    if (isDE) return GOOGLE_LINK_DE;
    return GOOGLE_LINK_EN;
  };
  const twitterLink = () => {
    if (isFR) return TWITTER_LINK_FR;
    if (isDE) return TWITTER_LINK_DE;
    return TWITTER_LINK_EN;
  };
  const linkedInLink = () => {
    if (isFR) return LINKEDIN_LINK_FR;
    if (isDE) return LINKEDIN_LINK_DE;
    return LINKEDIN_LINK_EN;
  };

  const handlePreferences = () => {
    trackClickModalCookieSave('cookies-accept-preferences');
    setCookieWithTrackingConsent(trackingConsent);
    removeTrackersFromPreferences(trackingConsent);
    initTrackersFromPreferences(
      trackingConsent,
      ClientLogger.getInstance(),
      trackingParamsService.visitorId
    );
    dispatch(
      displayNotificationBanner(
        NOTIF.COOKIES_PREFERENCES_UPDATE_MESSAGE,
        NOTIF.NOTIFICATION_LEVEL_INFORMATION
      )
    );
  };

  return (
    <>
      <MetaTags
        title={i18n.t('meta.cookies.title')}
        description={i18n.t('meta.cookies.description')}
      />
      <StaticPageWrapperStyle>
        <StaticSecondLevelTitleStyle>
          {i18n.t('cookies_management.title')}
        </StaticSecondLevelTitleStyle>
        <StaticTitleExtra>
          <p>{i18n.t('cookies_management.dated', { date: formattedDate })}</p>
        </StaticTitleExtra>
        <StaticPrimaryUnorderedListStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              {i18n.t('cookies_management.intro.title')}
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              {i18n.t('cookies_management.intro.first_paragraph')}
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              {i18n.t('cookies_management.intro.second_paragraph')}
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              {i18n.t('cookies_management.use.title')}
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              {i18n.t('cookies_management.use.first_paragraph')}
            </StaticParagraphStyle>
            <StaticParagraphStyle>
              {i18n.t('cookies_management.use.second_paragraph')}
            </StaticParagraphStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              {i18n.t('cookies_management.partners.title')}
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              {i18n.t('cookies_management.partners.intro')}
            </StaticParagraphStyle>
            <StaticSquareListStyle>
              <StaticSquareListItemStyle>
                {'Google : '}
                <RedHTMLLinkElementStyle
                  href={googleLink()}
                  target="_blank"
                  rel="noopener"
                >
                  {googleLink()}
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Facebook : '}
                <RedHTMLLinkElementStyle
                  href={facebookLink}
                  target="_blank"
                  rel="noopener"
                >
                  {facebookLink}
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'Twitter : '}
                <RedHTMLLinkElementStyle
                  href={twitterLink()}
                  target="_blank"
                  rel="noopener"
                >
                  {twitterLink()}
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
              <StaticSquareListItemStyle>
                {'LinkedIn : '}
                <RedHTMLLinkElementStyle
                  href={linkedInLink()}
                  target="_blank"
                  rel="noopener"
                >
                  {linkedInLink()}
                  <StaticExternalLinkIconStyle aria-hidden focusable="false" />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </RedHTMLLinkElementStyle>
              </StaticSquareListItemStyle>
            </StaticSquareListStyle>
          </StaticPrimaryUnorderedListItemStyle>
          <StaticPrimaryUnorderedListItemStyle>
            <StaticThirdLevelTitleStyle>
              {i18n.t('cookies_management.details.title')}
            </StaticThirdLevelTitleStyle>
            <StaticParagraphStyle>
              {i18n.t('cookies_management.details.intro')}
            </StaticParagraphStyle>
            <CookieModalSectionWrapperStyle>
              <CookieModalElementStyle className="with-separator">
                <SvgSettings
                  style={CookieSVGStyle}
                  aria-hidden
                  focusable="false"
                />
                <ColumnElementStyle>
                  <CookieSectionWrapperStyle>
                    <CookieDescriptionStyle>
                      <strong>
                        {i18n.t('cookies_management.details.technicals.name')}
                      </strong>{' '}
                      {i18n.t(
                        'cookies_management.details.technicals.description'
                      )}
                    </CookieDescriptionStyle>
                    <CookieLabelStyle className="cookie-page">
                      {i18n.t('cookies_management.details.mandatory')}
                    </CookieLabelStyle>
                  </CookieSectionWrapperStyle>
                  <CookieModalCookieDetailParagraphStyle className="cookie-page">
                    {i18n.t('cookies_management.details.technicals.secure')}
                    <CookieLabelStyle className="cookie-page">
                      {i18n.t('cookies_management.details.duration', {
                        duration: i18n.t('cookies_management.details.session'),
                      })}
                    </CookieLabelStyle>
                  </CookieModalCookieDetailParagraphStyle>
                  <CookieModalCookieDetailParagraphStyle className="cookie-page">
                    {i18n.t(
                      'cookies_management.details.technicals.secure-expiration'
                    )}
                    <CookieLabelStyle className="cookie-page">
                      {i18n.t('cookies_management.details.duration', {
                        duration: i18n.t('cookies_management.details.session'),
                      })}
                    </CookieLabelStyle>
                  </CookieModalCookieDetailParagraphStyle>
                  <CookieModalCookieDetailParagraphStyle className="cookie-page">
                    {i18n.t(
                      'cookies_management.details.technicals.demographics'
                    )}
                    <CookieLabelStyle className="cookie-page">
                      {i18n.t('cookies_management.details.duration', {
                        duration: i18n.t('cookies_management.details.month', {
                          count: 1,
                        }),
                      })}
                    </CookieLabelStyle>
                  </CookieModalCookieDetailParagraphStyle>
                </ColumnElementStyle>
              </CookieModalElementStyle>
              <CookieModalElementStyle className="with-separator">
                <SvgSmiley
                  style={CookieSVGStyle}
                  aria-hidden
                  focusable="false"
                />
                <ColumnElementStyle>
                  <CookieSectionWrapperStyle>
                    <CookieDescriptionStyle>
                      <strong>
                        {i18n.t('cookies_management.details.preferences.name')}
                      </strong>{' '}
                      {i18n.t(
                        'cookies_management.details.preferences.description'
                      )}
                    </CookieDescriptionStyle>
                    <CookieLabelStyle className="cookie-page">
                      {i18n.t('cookies_management.details.mandatory')}
                    </CookieLabelStyle>
                  </CookieSectionWrapperStyle>
                  <CookieModalCookieDetailParagraphStyle className="cookie-page">
                    {i18n.t(
                      'cookies_management.details.preferences.google-connect'
                    )}
                  </CookieModalCookieDetailParagraphStyle>
                  <CookieModalCookieDetailParagraphStyle className="cookie-page">
                    {i18n.t(
                      'cookies_management.details.preferences.facebook-connect'
                    )}
                  </CookieModalCookieDetailParagraphStyle>
                  <CookieModalCookieDetailParagraphStyle className="cookie-page">
                    {i18n.t(
                      'cookies_management.details.preferences.session-id'
                    )}
                    <CookieLabelStyle className="cookie-page">
                      {i18n.t('cookies_management.details.duration', {
                        duration: i18n.t('cookies_management.details.session'),
                      })}
                    </CookieLabelStyle>
                  </CookieModalCookieDetailParagraphStyle>
                  <CookieModalCookieDetailParagraphStyle className="cookie-page">
                    {i18n.t(
                      'cookies_management.details.preferences.session-id-expiration'
                    )}
                    <CookieLabelStyle className="cookie-page">
                      {i18n.t('cookies_management.details.duration', {
                        duration: i18n.t('cookies_management.details.session'),
                      })}
                    </CookieLabelStyle>
                  </CookieModalCookieDetailParagraphStyle>
                  <CookieModalCookieDetailParagraphStyle className="cookie-page">
                    {i18n.t('cookies_management.details.preferences.user-id')}
                    <CookieLabelStyle className="cookie-page">
                      {i18n.t('cookies_management.details.duration', {
                        duration: i18n.t('cookies_management.details.year', {
                          count: 1,
                        }),
                      })}
                    </CookieLabelStyle>
                  </CookieModalCookieDetailParagraphStyle>
                  <CookieModalCookieDetailParagraphStyle className="cookie-page">
                    {i18n.t(
                      'cookies_management.details.preferences.cookie-preferences'
                    )}
                    <CookieLabelStyle className="cookie-page">
                      {i18n.t('cookies_management.details.duration', {
                        duration: i18n.t('cookies_management.details.year', {
                          count: 1,
                        }),
                      })}
                    </CookieLabelStyle>
                  </CookieModalCookieDetailParagraphStyle>
                </ColumnElementStyle>
              </CookieModalElementStyle>
              <CookieModalElementStyle className="with-separator">
                <SvgStats
                  style={CookieSVGStyle}
                  aria-hidden
                  focusable="false"
                />
                <ColumnElementStyle>
                  <CookieSectionWrapperStyle>
                    <CookieDescriptionStyle>
                      <strong>
                        {i18n.t('cookies_management.details.statistics.name')}
                      </strong>{' '}
                      {i18n.t(
                        'cookies_management.details.statistics.description'
                      )}
                    </CookieDescriptionStyle>
                    <CookieLabelStyle className="cookie-page">
                      {i18n.t('cookies_management.details.mandatory')}
                    </CookieLabelStyle>
                  </CookieSectionWrapperStyle>
                  <CookieModalCookieDetailParagraphStyle className="cookie-page">
                    {i18n.t('cookies_management.details.statistics.visitor-id')}
                    <CookieLabelStyle className="cookie-page">
                      {i18n.t('cookies_management.details.duration', {
                        duration: i18n.t('cookies_management.details.year', {
                          count: 1,
                        }),
                      })}
                    </CookieLabelStyle>
                  </CookieModalCookieDetailParagraphStyle>
                  <CookieModalCookieDetailParagraphStyle className="cookie-page">
                    {i18n.t(
                      'cookies_management.details.statistics.visitor-created-at'
                    )}
                    <CookieLabelStyle className="cookie-page">
                      {i18n.t('cookies_management.details.duration', {
                        duration: i18n.t('cookies_management.details.year', {
                          count: 1,
                        }),
                      })}
                    </CookieLabelStyle>
                  </CookieModalCookieDetailParagraphStyle>
                  <CookieModalCookieDetailParagraphStyle className="cookie-page block">
                    {i18n.t('cookies_management.details.statistics.hotjar')}
                    <RedHTMLLinkElementStyle
                      href={HOTJAR_LINK}
                      target="_blank"
                      rel="noopener"
                    >
                      {HOTJAR_LINK}
                      <StaticExternalLinkIconStyle
                        aria-hidden
                        focusable="false"
                      />
                      <ScreenReaderItemStyle>
                        {i18n.t('common.open_new_window')}
                      </ScreenReaderItemStyle>
                    </RedHTMLLinkElementStyle>
                  </CookieModalCookieDetailParagraphStyle>
                  <CookieModalCookieDetailParagraphStyle className="cookie-page block">
                    {i18n.t('cookies_management.details.statistics.told')}
                    <RedHTMLLinkElementStyle
                      href={TOLD_LINK}
                      target="_blank"
                      rel="noopener"
                    >
                      {TOLD_LINK}
                      <StaticExternalLinkIconStyle
                        aria-hidden
                        focusable="false"
                      />
                      <ScreenReaderItemStyle>
                        {i18n.t('common.open_new_window')}
                      </ScreenReaderItemStyle>
                    </RedHTMLLinkElementStyle>
                  </CookieModalCookieDetailParagraphStyle>
                </ColumnElementStyle>
              </CookieModalElementStyle>
              <CookieModalElementStyle>
                <SvgLoudSpeaker
                  style={CookieSVGStyle}
                  aria-hidden
                  focusable="false"
                />
                <ColumnElementStyle>
                  <CookieDescriptionStyle>
                    <strong>
                      {i18n.t('cookies_management.details.social.name')}
                    </strong>{' '}
                    {i18n.t('cookies_management.details.social.description')}
                  </CookieDescriptionStyle>
                  <CookieSwitch
                    onCookiePage
                    tracker={TRACKING_CONSENT.FACEBOOK_TRACKING}
                    value={trackingConsent.facebook_tracking}
                    description={i18n.t(
                      'cookies_management.details.social.facebook_tracking'
                    )}
                  />
                  <CookieSwitch
                    onCookiePage
                    value={trackingConsent.twitter_tracking}
                    tracker={TRACKING_CONSENT.TWITTER_TRACKING}
                    description={i18n.t(
                      'cookies_management.details.social.twitter_tracking'
                    )}
                  />
                  <CookieSwitch
                    onCookiePage
                    tracker={TRACKING_CONSENT.FACEBOOK_SHARING}
                    value={trackingConsent.facebook_sharing}
                    description={i18n.t(
                      'cookies_management.details.social.facebook_sharing'
                    )}
                  />
                  <CookieSwitch
                    onCookiePage
                    tracker={TRACKING_CONSENT.TWITTER_SHARING}
                    value={trackingConsent.twitter_sharing}
                    description={i18n.t(
                      'cookies_management.details.social.twitter_sharing'
                    )}
                  />
                  <CookieSwitch
                    onCookiePage
                    tracker={TRACKING_CONSENT.LINKEDIN_SHARING}
                    value={trackingConsent.linkedin_sharing}
                    description={i18n.t(
                      'cookies_management.details.social.linkedin_sharing'
                    )}
                  />
                </ColumnElementStyle>
              </CookieModalElementStyle>
            </CookieModalSectionWrapperStyle>
            <CenterColumnStyle>
              <RedButtonStyle type="button" onClick={handlePreferences}>
                {i18n.t('cookies_management.button')}
              </RedButtonStyle>
            </CenterColumnStyle>
          </StaticPrimaryUnorderedListItemStyle>
        </StaticPrimaryUnorderedListStyle>
      </StaticPageWrapperStyle>
    </>
  );
};

// eslint-disable-next-line import/no-default-export
export default CookiesPage;
