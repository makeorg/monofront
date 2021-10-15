import React, { FC } from 'react';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import i18n from 'i18next';
import { SequenceAltTitleStyle } from '@make.org/components/Sequence/Cards/style';
import MaintenancePicture from '@make.org/assets/images/maintenance.png';
import { SimpleLinkAsRedButton } from '@make.org/ui/elements/LinkElements';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  MaintenanceImageStyle,
  MaintenancePageStyle,
  MaintenanceTitleStyle,
  MakeSvgSmallLogo,
  MaintenanceParagraphStyle,
} from './style';

export const MaintenancePage: FC = () => (
  <>
    <MetaTags title={i18n.t('maintenance.subtitle')} />
    <MakeSvgSmallLogo focusable="false" aria-hidden>
      <ScreenReaderItemStyle>{i18n.t('header.logo_alt')}</ScreenReaderItemStyle>
    </MakeSvgSmallLogo>
    <MaintenancePageStyle>
      <MaintenanceImageStyle src={MaintenancePicture} />
      <MaintenanceTitleStyle>
        {i18n.t('maintenance.title')}
      </MaintenanceTitleStyle>
      <SequenceAltTitleStyle>
        {i18n.t('maintenance.subtitle')}
      </SequenceAltTitleStyle>
      <MaintenanceParagraphStyle as="p">
        {i18n.t('maintenance.description')}
      </MaintenanceParagraphStyle>
      <SimpleLinkAsRedButton href="https://make.org" target="__blank">
        {i18n.t('maintenance.button')}
      </SimpleLinkAsRedButton>
    </MaintenancePageStyle>
  </>
);
