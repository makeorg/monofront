import styled from 'styled-components';
import { typography, color } from 'athena-design-tokens';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import {
  SvgPreviousArrowLeft,
  SvgMailSuccess,
} from '@make.org/ui/Svg/elements';

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

export const ReportFirstStepWrapperStyle = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: left;
  height: auto;
  max-width: 420px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    text-align: left;
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

export const ReportFormWrapperStyle = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  text-decoration: none;
  padding: 5px;
  background-color: ${color.greyLighter};
  border-radius: 8px;
  width: 375px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 420px;
    margin-bottom: 50px;
  }
`;

export const ReportFormItemWrapperStyle = styled.li`
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 8px;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  padding: 15px 20px;
  text-decoration: none;
  :last-child {
    margin-bottom: 0px;
  }
  &.selected {
    background-color: ${color.white};
    box-shadow: 0px 8px 12px -4px rgba(37, 49, 134, 0.08);
  }
`;

export const ReportFormAsTransparentButtonLabelStyle = styled.label`
  display: inline-flex;
  align-items: center;
  font-family: ${MakeFonts.CircularStandardBook};
  font-weight: normal;
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  width: 100%;
  text-align: center;
  &.selected,
  &:hover,
  &:focus {
    font-family: ${MakeFonts.CircularStandardBold};
    font-weight: bold;
    color: ${color.black};
  }
`;

export const ReportFormSvgWrapperStyle = styled.div`
  display: inline-flex;
  margin-right: 10px;
`;

export const ReportFormBackIconStyle = styled(SvgPreviousArrowLeft)`
  width: 15px;
`;

export const ReportFormIconButtonWrapperStyle = styled.div`
  padding: 2px 12px;
  border-radius: 20px;
  background-color: ${color.white};
  margin-right: 10px;
  border-radius: 20px;
  width: 45px;
  height: 23px;
`;

export const ReportFormBackButtonWrapperStyle = styled.button`
  display: inline-flex;
  flex-flow: wrap;
  align-items: left;
  padding: 0;
  border: none;
  background-color: transparent;
  margin: 0 auto 30px;
  width: 375px;
  align-items: center;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 420px;
  }
`;

export const ReportOptionsWrapperStyle = styled.div`
  width: 100%;
`;

export const ReportOptionsButtonStyle = styled.button`
  background-color: transparent;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: 0;
  border-color: transparent;
  margin: 10px 0;
  height: 40px;
`;

export const ReportOptionsButtonTextStyle = styled.p`
  padding-left: 10px;
  font-weight: bold;
`;

export const ReportOptionsSeparatorStyle = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${color.grey};
`;
