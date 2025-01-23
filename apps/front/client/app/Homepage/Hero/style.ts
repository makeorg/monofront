import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { pxToRem, intToPx } from '@make.org/utils/helpers/styled';
import {
  FlexElementStyle,
  ColumnElementStyle,
} from '@make.org/ui/elements/FlexElements';
import { Breakpoints, Layouts } from '@make.org/assets/vars/Breakpoints';
import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';
import {
  TextLStyle,
  TextMStyle,
} from '@make.org/designsystem/components/Typography/Text/style';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';

export const HeroContentStyle = styled(FlexElementStyle)`
  width: 100%;
  flex-flow: column;
  max-width: ${intToPx(Layouts.ContainerWidth)};
  margin-top: ${spacings.xl};
  margin-bottom: ${spacings.xl};
  ${ContainerWithPadding};
  @media (min-width: ${pxToRem(Breakpoints.Desktop)}) {
    flex-flow: row;
    margin-top: ${spacings.xxl};
    margin-bottom: ${spacings.xxl};
  }
`;

export const HeroInnerContentStyle = styled(ColumnElementStyle)`
  flex: 1;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding-right: ${spacings.l};
  }
`;

export const HeroTitleStyle = styled.h2`
  font-family: ${typography.FontFamily.Marketing};
  font-weight: bold;
  line-height: ${typography.LineHeight.l150};
  font-size: ${typography.FontSize.France};
  color: ${colors.Content.Interface.Dark};
  letter-spacing: 0.5px;
  margin-bottom: ${spacings.m};
  text-transform: none;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    max-width: 520px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.Earth};
  }
`;

export const HeroDescriptionStyle = styled(TextMStyle)`
  display: flex;
  color: ${colors.Content.Interface.DarkSecondary};
  margin-bottom: ${spacings.xl};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: 90px;
  }
`;

export const HeroIncentiveStyle = styled(TextLStyle)`
  display: flex;
  flex-flow: column;
  font-size: ${typography.FontSize.PetiteCouronne};
  color: ${colors.Content.Interface.DarkSecondary};
`;

export const HeroListStyle = styled(UnstyledListStyle)`
  display: inline-grid;
  grid-template-columns: repeat(1, auto);
  grid-gap: ${spacings.m};
  margin-top: ${spacings.m};
  li {
    color: ${colors.Content.Interface.Dark};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    grid-template-columns: repeat(2, auto);
    li {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    grid-template-columns: repeat(3, auto);
  }
`;
