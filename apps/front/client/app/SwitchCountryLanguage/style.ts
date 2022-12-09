import { color, typography } from 'athena-design-tokens';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { SvgCheck } from '@make.org/ui/Svg/elements';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { Link } from 'react-router-dom';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MakeFonts } from '@make.org/assets/vars/Fonts';

export const SwitchCountryLanguageContainerStyle = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    justify-content: flex-start;
  }
`;

export const SwitchCountryLanguageTitleStyle = styled.h2`
  font-family: ${MakeFonts.CircularStandardBold};
  font-weight: bold;
  text-transform: none;
  font-size: ${intToPx(typography.font.fontsize.L.value)};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XL.value)};
  }
`;

export const SwitchCountrySubtitleStyle = styled.p`
  font-family: ${MakeFonts.CircularStandardBook};
  text-transform: none;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.greyDark};
  margin-top: 10px;
`;

export const CountryListStyle = styled(UnstyledListStyle)`
  width: 100%;
  border: red solid 1px;
  max-height: 142px;
  overflow-y: auto;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const CountryLinkStyle = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  text-decoration: none;
  background-color: ${color.greyLighter};
  border-radius: 8px;
  border: 1px solid ${color.grey};
  min-width: 225px;
  &.selected {
    font-family: ${MakeFonts.CircularStandardBold};
    font-weight: bold;
    background-color: ${color.white};
  }
`;

export const SelectedCountryIconStyle = styled(SvgCheck)`
  width: 12px;
  .tofill {
    fill: ${color.black};
  }
`;

export const MultilingualTransparentButtonFilterStyle = styled.button`
  display: flex;
  justify-content: center;
  padding: 10px 20px;
  border-radius: 8px;
  line-height: 1.31;
  border: solid 1px ${color.grey};
  background-color: transparent;
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${color.black};
  &.selected {
    background-color: ${color.brandPrimary};
    color: ${color.white};
    font-family: ${MakeFonts.CircularStandardBold};
    font-weight: bold;
  }
  &:hover,
  &:focus {
    border: solid 1px ${color.brandPrimary};
  }
`;

export const MultilingualRadioListWrapperStyle = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  text-decoration: none;
  margin-top: 20px;
  padding: 5px;
  background-color: ${color.greyLighter};
  border-radius: 8px;

  &.countries-switch {
    max-height: 220px;
    overflow-y: scroll;
  }

  &.languages-switch {
    margin-bottom: 30px;
  }
`;

export const MultilingualRadioItemWrapperStyle = styled.li`
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
    box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.08);
    border-radius: 8px;
  }
  &:focus {
    font-family: ${MakeFonts.CircularStandardBold};
    font-weight: bold;
    color: ${color.black};
  }
`;

export const MultilingualRadioAsTransparentButtonLabelStyle = styled.label`
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

export const CountryLanguageSwitchRedButtonStyle = styled(RedButtonStyle)`
  max-width: 120px;
  width: 100%;
  margin: 30px auto 0px auto;
`;
