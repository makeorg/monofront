import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { TitleS } from '@make.org/designsystem/components/Titles';
import { BodyMDefault } from '@make.org/designsystem/components/Body';
import { shadows } from '@make.org/designsystem/tokens/shadows';

export const SwitchCountryLanguageContainerStyle = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    justify-content: flex-start;
  }
`;

export const SwitchCountryLanguageTitleStyle = styled(TitleS).attrs({
  as: 'h2',
})`
  text-transform: none;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.IleDeFrance};
  }
`;

export const SwitchCountrySubtitleStyle = styled(BodyMDefault)`
  text-transform: none;
  color: ${colors.Content.Interface.DarkSecondary};
  margin-top: ${spacings.s};
`;

export const MultilingualRadioListWrapperStyle = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  list-style: none;
  text-decoration: none;
  margin-top: ${spacings.m};
  padding: ${spacings.xs};
  background-color: ${colors.Background.Interface.DarkSecondary};
  border-radius: 8px;
  max-height: 220px;
  overflow-y: scroll;

  &.languages-switch {
    margin-bottom: ${spacings.l};
  }
`;

export const MultilingualRadioItemWrapperStyle = styled.li`
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
    box-shadow: ${shadows.s40};
    border-radius: 8px;
  }
  &:focus {
    font-family: ${typography.FontFamily.Hightlight};
    font-weight: bold;
    color: ${colors.Content.Interface.Dark};
  }
`;

export const MultilingualRadioAsTransparentButtonLabelStyle = styled.label`
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
    font-family: ${typography.FontFamily.Hightlight};
    font-weight: bold;
    color: ${colors.Content.Interface.Dark};
  }
`;

export const CountryLanguageSwitchRedButtonStyle = styled(RedButtonStyle)`
  max-width: 120px;
  width: 100%;
  margin: ${spacings.l} auto 0px auto;
`;
