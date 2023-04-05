import styled from 'styled-components';
import {
  Breakpoints,
  DefaultPadding,
  Layouts,
} from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { MiddleColumnStyle } from '@make.org/ui/elements/FlexElements';
import { SecondLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { BodyXSCondensed } from '@make.org/designsystem/components/Body';
import { colors } from '@make.org/designsystem/tokens/colors';
import { typography } from '@make.org/designsystem/tokens/typography';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const IntroWrapperStyle = styled(MiddleColumnStyle)`
  padding: ${spacings.l} ${intToPx(DefaultPadding.Mobile)};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: ${spacings.xl} ${intToPx(DefaultPadding.Desktop)};
  }
`;

export const GreatCauseIntroLabelStyle = styled(BodyXSCondensed).attrs({
  as: 'span',
})`
  background-color: ${colors.Background.Interface.DarkMain};
  padding: 3px ${spacings.s} 1px;
  color: ${colors.Content.Interface.Light};
  text-transform: uppercase;
  margin-bottom: ${spacings.xs};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Arrondissement};
    padding: 6px 12px 4px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: ${spacings.s} ${spacings.m} ${spacings.xs};
  }
`;

export const GreatCauseIntroBannerTitleStyle = styled(SecondLevelTitleStyle)`
  text-align: center;
  max-width: 550px;
  color: ${props => props.theme.fontColor};
`;

export const IntroBannerTitleStyle = styled.h2`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

export const DefaultBannerMainContainer = styled.div`
  width: 100%;
  max-width: ${intToPx(Layouts.ContainerWidth)};
`;

export const DefaultBannerTitleStyle = styled(SecondLevelTitleStyle)`
  color: ${props => props.theme.fontColor};
`;

export const DefaultBannerTimeStyle = styled.div`
  color: ${props => props.theme.fontColor};
  margin-top: ${spacings.s};
  font-size: ${typography.FontSize.Arrondissement};
`;
