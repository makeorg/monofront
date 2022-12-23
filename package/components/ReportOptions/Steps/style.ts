import styled from 'styled-components';
import { typography } from 'athena-design-tokens';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { SvgMailSuccess } from '@make.org/ui/Svg/elements';

export const ReportWrapperStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: left;
  height: 100%;
  max-width: 720px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    justify-content: start;
    align-items: center;
  }
`;

export const ReportTitleStyle = styled.h1`
  display: flex;
  justify-content: flex-start;
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  font-family: ${MakeFonts.CircularStandardBold};
  text-transform: none;
  margin-bottom: 35px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XL.value)};
  }
`;

export const ReportTextStyle = styled.p`
  display: flex;
  justify-content: flex-start;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  font-family: ${MakeFonts.CircularStandardBook};
  margin: 30px 0px 30px;
`;

export const ReportButtonWrapperStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: auto auto 0px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    justify-content: flex-start;
    margin: 0px;
  }
`;

export const SvgConfirmationStyle = styled(SvgMailSuccess)`
  align-self: center;
`;
