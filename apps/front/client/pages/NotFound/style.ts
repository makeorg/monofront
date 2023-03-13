import styled from 'styled-components';
import { typography } from 'athena-design-tokens';
import { colors } from '@make.org/designsystem/tokens/colors';
import { intToPx } from '@make.org/utils/helpers/styled';
import {
  Breakpoints,
  Layouts,
  DefaultPadding,
} from '@make.org/assets/vars/Breakpoints';
import { MiddleColumnStyle } from '@make.org/ui/elements/FlexElements';
import { SecondLevelTitleStyle } from '@make.org/ui/elements/TitleElements';

export const NotFoundPageContentStyle = styled(MiddleColumnStyle)`
  flex: 1 1 auto;
  padding: ${intToPx(DefaultPadding.Mobile)};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: ${intToPx(DefaultPadding.Desktop)};
  }
`;

export const NotFoundPageInnerStyle = styled(MiddleColumnStyle)`
  width: 100%;
  flex: 1 1 auto;
  padding: ${intToPx(DefaultPadding.Mobile)};
  max-width: ${intToPx(Layouts.ContainerWidth)};
  max-height: 550px;
  background-color: ${colors.Background.Interface.DarkSecondary};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: ${intToPx(DefaultPadding.Desktop)};
  }
`;

export const NotFoundIntroStyle = styled.p`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  color: ${colors.Content.Make.Secondary};
  font-style: italic;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XL.value)};
  }
`;

export const NotFoundTitleStyle = styled(SecondLevelTitleStyle)`
  font-size: ${intToPx(typography.font.fontsize.X2L.value)};
  line-height: 1;
  margin: 15px 0 30px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.X5L.value)};
  }
`;
