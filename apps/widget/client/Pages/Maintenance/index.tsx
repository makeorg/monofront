import React, { FC } from 'react';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import i18n from 'i18next';
import {
  SequenceAltTitleStyle,
  SequenceParagraphStyle,
} from '@make.org/components/Sequence/Cards/style';
import MaintenancePicture from '@make.org/assets/images/maintenance.png';
import { SimpleLinkAsRedButton } from '@make.org/ui/elements/LinkElements';
import { MetaTags } from '@make.org/components/MetaTags';
import { LogoStyle } from '../../components/HeaderPanel/style';
import {
  MaintenanceImageStyle,
  MaintenancePageStyle,
  LogoWrapperStyle,
  MaintenanceTitleStyle,
} from './style';
import { WidgetContainer } from '../../style';

export const MaintenancePage: FC = () => (
  <>
    <MetaTags title={i18n.t('maintenance.subtitle')} />
    <WidgetContainer>
      <LogoWrapperStyle>
        <LogoStyle focusable="false" aria-hidden />
        <ScreenReaderItemStyle>
          {i18n.t('header.logo_alt')}
        </ScreenReaderItemStyle>
      </LogoWrapperStyle>
      <MaintenancePageStyle>
        <MaintenanceImageStyle src={MaintenancePicture} />
        <MaintenanceTitleStyle>
          {i18n.t('maintenance.title')}
        </MaintenanceTitleStyle>
        <SequenceAltTitleStyle>
          {i18n.t('maintenance.subtitle')}
        </SequenceAltTitleStyle>
        <SequenceParagraphStyle
          as="p"
          data-cy-container="final-card-description"
        >
          {i18n.t('maintenance.description')}
        </SequenceParagraphStyle>
        <SimpleLinkAsRedButton href="https://make.org" target="__blank">
          {i18n.t('maintenance.button')}
        </SimpleLinkAsRedButton>
      </MaintenancePageStyle>
    </WidgetContainer>
  </>
);
