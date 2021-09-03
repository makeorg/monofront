import React, { FC } from 'react';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import i18n from 'i18next';
import { SequenceTitleStyle } from '@make.org/components/Sequence/style';
import {
  SequenceAltTitleStyle,
  SequenceParagraphStyle,
} from '@make.org/components/Sequence/Cards/style';
import MaintenancePicture from '@make.org/assets/images/maintenance.png';
import { SimpleLinkAsRedButton } from '@make.org/ui/elements/LinkElements';
import { LogoStyle } from '../SidePanel/style';
import {
  MaintenanceImageStyle,
  MaintenancePageStyle,
  LogoWrapperStyle,
} from './style';
import { WidgetContainer } from '../../style';

export const Maintenance: FC = () => (
  <WidgetContainer>
    <LogoWrapperStyle>
      <LogoStyle focusable="false" aria-hidden />
      <ScreenReaderItemStyle>{i18n.t('header.logo_alt')}</ScreenReaderItemStyle>
    </LogoWrapperStyle>
    <MaintenancePageStyle>
      <MaintenanceImageStyle src={MaintenancePicture} />
      <SequenceTitleStyle style={{ marginBottom: 20 }}>
        {i18n.t('maintenance.title')}
      </SequenceTitleStyle>
      <SequenceAltTitleStyle>
        {i18n.t('maintenance.subtitle')}
      </SequenceAltTitleStyle>

      <SequenceParagraphStyle as="p" data-cy-container="final-card-description">
        {i18n.t('maintenance.description')}
      </SequenceParagraphStyle>
      <SimpleLinkAsRedButton href="https://make.org" target="__blank">
        {i18n.t('maintenance.button')}
      </SimpleLinkAsRedButton>
    </MaintenancePageStyle>
  </WidgetContainer>
);
