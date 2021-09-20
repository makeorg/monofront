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
      <MaintenanceTitleStyle>Ongoing maintenance</MaintenanceTitleStyle>
      <SequenceAltTitleStyle>
        Oops, we’re sorry! Make.org is currently down for maintenance.
      </SequenceAltTitleStyle>
      <MaintenanceParagraphStyle as="p">
        Feel free to come back in few minutes to discover the proposals offered
        by other citizens and submit yours.
      </MaintenanceParagraphStyle>
      <SimpleLinkAsRedButton href="https://make.org" target="__blank">
        Find out more about Make.org
      </SimpleLinkAsRedButton>
    </MaintenancePageStyle>
  </>
);
