import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints, Layouts } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { GreyLinkStyle } from '@make.org/ui/elements/ButtonsElements';
import { MiddleColumnStyle } from '@make.org/ui/elements/FlexElements';
import { Image } from '@make.org/ui/components/Image';
import {
  TitleMStyle,
  TitleXXXSStyle,
} from '@make.org/designsystem/components/Typography/Titles/style';
import { TextMStyle } from '@make.org/designsystem/components/Typography/Text/style';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

import { SvgArrowReturn } from '@make.org/ui/Svg/elements';

export const SequenceContainerStyle = styled(MiddleColumnStyle)`
  position: relative;
  width: 100%;
  display: flex;
  flex: 1;
  max-width: ${intToPx(Layouts.ContainerWithPadding)};
  margin: 0 auto;
  padding: 0 ${spacings.m};
  &.widget {
    background-color: #f2f2f2;
    padding: 0px ${spacings.sm} ${spacings.sm};
    @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
      padding: 0px ${spacings.m} ${spacings.m};
    }
  }
`;

export const SequenceContentStyle = styled(MiddleColumnStyle)`
  width: 100%;
  flex: 1;
`;

export const SequenceAltTitleStyle = styled(TitleMStyle)`
  letter-spacing: 0.5px;
  align-self: flex-start;
  text-transform: none;
  margin-top: ${spacings.l};
`;

export const SequenceSpecialTitleStyle = styled(TextMStyle).attrs({
  as: 'div',
})`
  display: flex;
  border-radius: 8px;
  letter-spacing: 0.12px;
  padding: ${spacings.xs} ${spacings.s};
  background-color: ${colors.Background.Interface.DarkSecondary};
  margin-top: ${spacings.m};
  align-self: flex-start;
`;

export const SequenceSpecialIconStyle = styled(SvgArrowReturn)`
  margin-right: ${spacings.xs};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-right: ${spacings.s};
  }
`;

export const SequenceTitleStyle = styled(TitleXXXSStyle).attrs({
  as: 'h2',
})`
  letter-spacing: 0.12px;
  align-self: flex-start;
  text-transform: none;
  margin-top: ${spacings.l};
  &.widget {
    margin: 0;
    font-size: 14px;
  }
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Paris};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.GrandeCouronne};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${typography.FontSize.IleDeFrance};
  }
`;

export const ConsultationPageLinkStyle = styled(GreyLinkStyle)<{
  className: string;
}>`
  align-self: flex-start;
  margin: ${spacings.m} 0;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    position: absolute;
    line-height: 37px;
    left: ${spacings.m};
    bottom: 40px;
    margin: 0;
    &.static {
      position: static;
      margin: 40px 0;
    }
  }
`;

export const KindLabelControversyIconStyle = styled(Image)`
  width: 20px;
  height: 24px;
  margin-right: ${spacings.xs};
`;

export const KindLabelPopularIconStyle = styled(Image)`
  width: 24px;
  height: 24px;
  margin-right: ${spacings.xs};
`;
