import React, { FC } from 'react';
import i18n from 'i18next';
import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import { SvgLightBulb } from '@make.org/ui/Svg/elements';
import {
  LightBulbStyle,
  PlaceholderParagraphStyle,
} from '@make.org/ui/elements/PlaceholdersElements';

export const ProfileProposalsPlaceholder: FC = () => (
  <CenterColumnStyle>
    <SvgLightBulb style={LightBulbStyle} focusable="false" />
    <PlaceholderParagraphStyle>
      {i18n.t('profile.proposals.text')}
    </PlaceholderParagraphStyle>
  </CenterColumnStyle>
);
