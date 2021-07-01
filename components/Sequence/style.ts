import styled from 'styled-components';
import { typography } from 'athena-design-tokens';

import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { Breakpoints, Layouts } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';

import { GreyLinkStyle } from 'Client/ui/Elements/Buttons/V2/style';
import { MiddleColumnStyle } from 'Client/ui/Elements/FlexElements';
import { SvgArrowReturn } from 'Client/ui/Svg/elements';

export const SequenceContainerStyle = styled(MiddleColumnStyle)`
  position: relative;
  width: 100%;
  display: flex;
  flex: 1;
  max-width: ${intToPx(Layouts.ContainerWithPadding)};
  margin: 0 auto;
  padding: 0 20px;
`;

export const SequenceContentStyle = styled(MiddleColumnStyle)`
  width: 100%;
  flex: 1;
`;

export const SequenceAltTitleStyle = styled.h2`
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  letter-spacing: 0.14px;
  align-self: flex-start;
  text-transform: none;
  margin-top: 30px;
`;

export const SequenceSpecialTitleStyle = styled.div`
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  letter-spacing: 0.12px;
  align-self: flex-start;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XL.value)};
  }
`;

export const SequenceSpecialIconStyle = styled(SvgArrowReturn)`
  margin-right: 5px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-right: 10px;
  }
`;

export const SequenceTitleStyle = styled.h2`
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  letter-spacing: 0.12px;
  align-self: flex-start;
  text-transform: none;
  margin-top: 30px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XL.value)};
  }
`;

export const ConsultationPageLinkStyle = styled(GreyLinkStyle)`
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
