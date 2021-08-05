import React, { FC } from 'react';
import i18n from 'i18next';
import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import {
  PlaceholderParagraphStyle,
  ThumbsUpStyle,
  ThumbsUpWrapperStyle,
} from '@make.org/ui/elements/PlaceholdersElements';
import { SvgThumbsUp } from '@make.org/ui/Svg/elements';

type Props = {
  name: string;
};

export const OrganisationVotesPlaceholder: FC<Props> = ({ name }) => (
  <CenterColumnStyle>
    <ThumbsUpWrapperStyle>
      <SvgThumbsUp aria-hidden style={ThumbsUpStyle} focusable="false" />
    </ThumbsUpWrapperStyle>
    <PlaceholderParagraphStyle>
      {i18n.t('organisation.votes.text', {
        name,
      })}
    </PlaceholderParagraphStyle>
  </CenterColumnStyle>
);
