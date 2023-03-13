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

export const IntroWrapperStyle = styled(MiddleColumnStyle)`
  padding: 30px ${intToPx(DefaultPadding.Mobile)};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 50px ${intToPx(DefaultPadding.Desktop)};
  }
`;

export const GreatCauseIntroLabelStyle = styled(BodyXSCondensed).attrs({
  as: 'span',
})`
  background-color: ${colors.Background.Interface.DarkMain};
  padding: 3px 10px 1px;
  color: ${colors.Content.Interface.Light};
  text-transform: uppercase;
  margin-bottom: 5px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Arrondissement};
    padding: 6px 12px 4px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 8px 18px 5px;
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
  margin-top: 10px;
  font-size: ${typography.FontSize.Arrondissement};
`;
