import React, { useEffect } from 'react';
import i18n from 'i18next';
import {
  SvgSettings,
  SvgSmiley,
  SvgStats,
  SvgLoudSpeaker,
  SvgArrowLeft,
} from '@make.org/ui/Svg/elements';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import {
  trackDisplayModalCookieSecondStep,
  trackClickModalCookieBack,
} from '@make.org/utils/services/Tracking';
import { TRACKING_CONSENT } from '@make.org/types/enums';
import { useAppContext } from '@make.org/store';
import {
  CookieModalContentStyle,
  CookieModalHeaderWrapperStyle,
  CookieModalButtonWithLinkStyle,
  CookieModalSectionTitleStyle,
  CookieModalCookieDetailParagraphStyle,
  CookieModalSectionWrapperStyle,
  CookieModalElementStyle,
  CookieModalBackButtonStyle,
  CookieSVGStyle,
  CookieSectionWrapperStyle,
  CookieDescriptionStyle,
  CookieLabelStyle,
} from './style';
import { CookieSwitch } from './CookieSwitch';

type Props = {
  toggleCustomization: () => void;
  handleRejectAll: () => void;
};

export const SecondStepCookie: React.FC<Props> = ({
  toggleCustomization,
  handleRejectAll,
}) => {
  const { state } = useAppContext();
  const { trackingConsent } = state.user;
  const handleBack = () => {
    trackClickModalCookieBack();
    toggleCustomization();
  };

  useEffect(() => {
    trackDisplayModalCookieSecondStep();
  }, []);

  return (
    <CookieModalContentStyle>
      <CookieModalHeaderWrapperStyle>
        <CookieModalBackButtonStyle
          type="button"
          onClick={handleBack}
          aria-label={i18n.t('cookie_modal.back') || undefined}
        >
          <SvgArrowLeft width="10" height="10" aria-hidden focusable="false" />
        </CookieModalBackButtonStyle>
        <CookieModalButtonWithLinkStyle
          type="button"
          onClick={handleRejectAll}
          className="with-margin-bottom"
        >
          {i18n.t('cookie_modal.refuse')}
        </CookieModalButtonWithLinkStyle>
      </CookieModalHeaderWrapperStyle>
      <CookieModalSectionTitleStyle>
        {i18n.t('cookie_modal.details.title')}
      </CookieModalSectionTitleStyle>
      <CookieModalSectionWrapperStyle>
        <CookieModalElementStyle className="with-separator">
          <SvgSettings style={CookieSVGStyle} aria-hidden focusable="false" />
          <ColumnElementStyle>
            <CookieSectionWrapperStyle>
              <CookieDescriptionStyle
                dangerouslySetInnerHTML={{
                  __html: i18n.t('cookie_modal.details.technicals'),
                }}
              />
              <CookieLabelStyle>
                {i18n.t('cookie_modal.mandatory')}
              </CookieLabelStyle>
            </CookieSectionWrapperStyle>
            <CookieModalCookieDetailParagraphStyle>
              {i18n.t('cookie_modal.technicals.secure')}
            </CookieModalCookieDetailParagraphStyle>
            <CookieModalCookieDetailParagraphStyle>
              {i18n.t('cookie_modal.technicals.expiration')}
            </CookieModalCookieDetailParagraphStyle>
            <CookieModalCookieDetailParagraphStyle>
              {i18n.t('cookie_modal.technicals.demographics')}
            </CookieModalCookieDetailParagraphStyle>
          </ColumnElementStyle>
        </CookieModalElementStyle>
        <CookieModalElementStyle className="with-separator">
          <SvgSmiley style={CookieSVGStyle} aria-hidden focusable="false" />
          <ColumnElementStyle>
            <CookieSectionWrapperStyle>
              <CookieDescriptionStyle
                dangerouslySetInnerHTML={{
                  __html: i18n.t('cookie_modal.details.preferences'),
                }}
              />
              <CookieLabelStyle>
                {i18n.t('cookie_modal.mandatory')}
              </CookieLabelStyle>
            </CookieSectionWrapperStyle>
            <CookieModalCookieDetailParagraphStyle>
              {i18n.t('cookie_modal.preferences.authentication')}
            </CookieModalCookieDetailParagraphStyle>
            <CookieModalCookieDetailParagraphStyle>
              {i18n.t('cookie_modal.preferences.session')}
            </CookieModalCookieDetailParagraphStyle>
            <CookieModalCookieDetailParagraphStyle>
              {i18n.t('cookie_modal.preferences.expiration')}
            </CookieModalCookieDetailParagraphStyle>
            <CookieModalCookieDetailParagraphStyle>
              {i18n.t('cookie_modal.preferences.user')}
            </CookieModalCookieDetailParagraphStyle>
            <CookieModalCookieDetailParagraphStyle>
              {i18n.t('cookie_modal.preferences.cookie')}
            </CookieModalCookieDetailParagraphStyle>
          </ColumnElementStyle>
        </CookieModalElementStyle>
        <CookieModalElementStyle className="with-separator">
          <SvgStats style={CookieSVGStyle} aria-hidden focusable="false" />
          <ColumnElementStyle>
            <CookieSectionWrapperStyle>
              <CookieDescriptionStyle
                dangerouslySetInnerHTML={{
                  __html: i18n.t('cookie_modal.details.statistics'),
                }}
              />
              <CookieLabelStyle>
                {i18n.t('cookie_modal.mandatory')}
              </CookieLabelStyle>
            </CookieSectionWrapperStyle>
            <CookieModalCookieDetailParagraphStyle>
              {i18n.t('cookie_modal.statistics.visitor')}
            </CookieModalCookieDetailParagraphStyle>
            <CookieModalCookieDetailParagraphStyle>
              {i18n.t('cookie_modal.statistics.created-at')}
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
            <CookieDescriptionStyle
              dangerouslySetInnerHTML={{
                __html: i18n.t('cookie_modal.details.social_media'),
              }}
            />
            <CookieSwitch
              tracker={TRACKING_CONSENT.FACEBOOK_TRACKING}
              value={trackingConsent.facebook_tracking}
              description={i18n.t('cookie_modal.social_media.facebook_pixel')}
            />
            <CookieSwitch
              tracker={TRACKING_CONSENT.TWITTER_TRACKING}
              value={trackingConsent.twitter_tracking}
              description={i18n.t('cookie_modal.social_media.twitter_pixel')}
            />
            <CookieSwitch
              tracker={TRACKING_CONSENT.FACEBOOK_SHARING}
              value={trackingConsent.facebook_sharing}
              description={i18n.t('cookie_modal.social_media.facebook_sharing')}
            />
            <CookieSwitch
              tracker={TRACKING_CONSENT.TWITTER_SHARING}
              value={trackingConsent.twitter_sharing}
              description={i18n.t('cookie_modal.social_media.twitter_sharing')}
            />
            <CookieSwitch
              tracker={TRACKING_CONSENT.LINKEDIN_SHARING}
              value={trackingConsent.linkedin_sharing}
              description={i18n.t('cookie_modal.social_media.linkedin_sharing')}
            />
          </ColumnElementStyle>
        </CookieModalElementStyle>
      </CookieModalSectionWrapperStyle>
    </CookieModalContentStyle>
  );
};
