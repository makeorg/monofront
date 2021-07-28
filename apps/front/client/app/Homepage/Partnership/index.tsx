import React, { FC } from 'react';
import { ExternalLinkIconStyle } from '@make.org/ui/elements/ButtonsElements';
import { getWebflowDynamicLink } from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import { ROUTE_PARTNERSHIP } from '@make.org/utils/routes';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  PartnershipInnerStyle,
  PartnershipParagraphStyle,
  PartnershipSectionStyle,
  PartnershipSubtitleStyle,
  PartnershipTitleStyle,
  PartnershipRedButton,
} from './style';

export const PartnershipBanner: FC = () => {
  const { language } = useSelector((state: StateRoot) => state.appConfig);

  return (
    <PartnershipSectionStyle
      as="section"
      aria-labelledby="partnership_title"
      id="partnership"
      data-cy-container="partnership"
    >
      <PartnershipInnerStyle>
        <PartnershipSubtitleStyle data-cy-container="partnership_subtitle">
          {i18n.t('homepage.partnership.subtitle')}
        </PartnershipSubtitleStyle>
        <PartnershipTitleStyle
          id="partnership_title"
          data-cy-container="partnership_title"
        >
          {i18n.t('homepage.partnership.title')}
        </PartnershipTitleStyle>
        <PartnershipParagraphStyle
          dangerouslySetInnerHTML={{
            __html: i18n.t('homepage.partnership.description'),
          }}
          data-cy-container="partnership_description"
        />
        <PartnershipRedButton
          as="a"
          href={getWebflowDynamicLink(language, ROUTE_PARTNERSHIP)}
          target="_blank"
          rel="noopener"
        >
          {i18n.t('homepage.partnership.button')}
          <> </>
          <ExternalLinkIconStyle aria-hidden focusable="false" />
          <ScreenReaderItemStyle>
            {i18n.t('common.open_new_window')}
          </ScreenReaderItemStyle>
        </PartnershipRedButton>
      </PartnershipInnerStyle>
    </PartnershipSectionStyle>
  );
};
