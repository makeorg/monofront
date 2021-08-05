import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import {
  LightBulbStyle,
  PlaceholderParagraphStyle,
} from '@make.org/ui/elements/PlaceholdersElements';
import { SvgLightBulb } from '@make.org/ui/Svg/elements';
import i18n from 'i18next';
import React, { FC } from 'react';

type Props = {
  name: string;
};

export const OrganisationProposalsPlaceholder: FC<Props> = ({ name }) => (
  <CenterColumnStyle>
    <SvgLightBulb style={LightBulbStyle} aria-hidden focusable="false" />
    <PlaceholderParagraphStyle>
      {i18n.t('organisation.proposals.text', {
        name,
      })}
    </PlaceholderParagraphStyle>
  </CenterColumnStyle>
);
