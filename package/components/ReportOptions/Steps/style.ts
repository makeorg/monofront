import styled from 'styled-components';
import { typography } from 'athena-design-tokens';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';

export const ReportWrapperStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: left;
  height: 100%;
  max-width: 720px;
  justify-content: flex-end;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    justify-content: center;
    text-align: center;
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
