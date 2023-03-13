import styled from 'styled-components';
import { typography } from 'athena-design-tokens';
import { Breakpoints, Layouts } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { GreyLinkStyle } from '@make.org/ui/elements/ButtonsElements';
import { MiddleColumnStyle } from '@make.org/ui/elements/FlexElements';
import { Image } from '@make.org/ui/components/Image';
import { TitleM, TitleXXXS } from '@make.org/designsystem/components/Titles';
import { BodyMHighLight } from '@make.org/designsystem/components/Body';
import { colors } from '@make.org/designsystem/tokens/colors';

import { SvgArrowReturn } from '@make.org/ui/Svg/elements';

export const SequenceContainerStyle = styled(MiddleColumnStyle)`
  position: relative;
  width: 100%;
  display: flex;
  flex: 1;
  max-width: ${intToPx(Layouts.ContainerWithPadding)};
  margin: 0 auto;
  padding: 0 20px;
  &.widget {
    background-color: #f2f2f2;
    padding: 0px 15px 15px;
    @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
      padding: 0px 20px 20px;
    }
  }
`;

export const SequenceContentStyle = styled(MiddleColumnStyle)`
  width: 100%;
  flex: 1;
`;

export const SequenceAltTitleStyle = styled(TitleM)`
  letter-spacing: 0.5px;
  align-self: flex-start;
  text-transform: none;
  margin-top: 30px;
`;

export const SequenceSpecialTitleStyle = styled(BodyMHighLight).attrs({
  as: 'div',
})`
  display: flex;
  border-radius: 8px;
  letter-spacing: 0.12px;
  padding: 5px 10px;
  background-color: ${colors.Background.Interface.DarkSecondary};
  margin-top: 20px;
  align-self: flex-start;
`;

export const SequenceSpecialIconStyle = styled(SvgArrowReturn)`
  margin-right: 5px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-right: 10px;
  }
`;

export const SequenceTitleStyle = styled(TitleXXXS).attrs({ as: 'h2' })`
  letter-spacing: 0.12px;
  align-self: flex-start;
  text-transform: none;
  margin-top: 30px;
  &.widget {
    margin: 0;
    font-size: 14px;
  }
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.S.value)};
    &.widget {
      font-size: ${intToPx(typography.font.fontsize.S.value)};
    }
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.L.value)};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XL.value)};
  }
`;

export const ConsultationPageLinkStyle = styled(GreyLinkStyle)<{
  className: string;
}>`
  align-self: flex-start;
  margin: 20px 0;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    position: absolute;
    line-height: 37px;
    left: 20px;
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
  margin-right: 5px;
`;

export const KindLabelPopularIconStyle = styled(Image)`
  width: 24px;
  height: 24px;
  margin-right: 5px;
`;
