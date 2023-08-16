import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { shadows } from '@make.org/designsystem/tokens/shadows';
import {
  SvgPreviousArrowLeft,
  SvgMailSuccess,
} from '@make.org/ui/Svg/elements';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

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
  font-size: ${typography.FontSize.Paris};
  font-family: ${typography.FontFamily.Highlight};
  font-weight: bold;
  text-transform: none;
  margin-bottom: 35px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.IleDeFrance};
  }
`;

export const ReportTextStyle = styled.p`
  display: flex;
  justify-content: flex-start;
  font-size: ${typography.FontSize.Arrondissement};
  font-family: ${typography.FontFamily.Default};
  margin: ${spacings.l} 0px ${spacings.l};
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
  padding: ${spacings.xs};
  background-color: ${colors.Background.Interface.DarkSecondary};
  border-radius: 8px;
  width: 375px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 420px;
    margin-bottom: ${spacings.xl};
  }
`;

export const ReportFormItemWrapperStyle = styled.li`
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 8px;
  font-size: ${typography.FontSize.Arrondissement};
  padding: ${spacings.sm} ${spacings.m};
  text-decoration: none;
  :last-child {
    margin-bottom: 0px;
  }
  &.selected {
    background-color: ${colors.Background.Interface.Lighter};
    box-shadow: ${shadows.s20};
  }
`;

export const ReportFormAsTransparentButtonLabelStyle = styled.label`
  display: inline-flex;
  align-items: center;
  font-family: ${typography.FontFamily.Default};
  font-weight: normal;
  color: ${colors.Content.Interface.DarkSecondary};
  font-size: ${typography.FontSize.Arrondissement};
  width: 100%;
  text-align: center;
  &.selected,
  &:hover,
  &:focus {
    font-family: ${typography.FontFamily.Highlight};
    font-weight: bold;
    color: ${colors.Content.Interface.Dark};
  }
`;

export const ReportFormSvgWrapperStyle = styled.div`
  display: inline-flex;
  margin-right: ${spacings.s};
`;

export const ReportFormBackIconStyle = styled(SvgPreviousArrowLeft)`
  width: 15px;
`;

export const ReportFormIconButtonWrapperStyle = styled.div`
  padding: 2px 12px;
  border-radius: 20px;
  background-color: ${colors.Background.Interface.Lighter};
  margin-right: ${spacings.s};
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
  margin: 0 auto ${spacings.l};
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
  margin: ${spacings.s} 0;
  height: 40px;
`;

export const ReportOptionsButtonTextStyle = styled.p`
  padding-left: ${spacings.s};
  font-weight: bold;
`;

export const ReportOptionsSeparatorStyle = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${colors.Background.Interface.DarkMain};
`;
