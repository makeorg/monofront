import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { typography } from '@make.org/designsystem/tokens/typography';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { TitleS } from '@make.org/designsystem/components/Titles';

export const ThirdLevelTitleCircularStyle = styled(TitleS).attrs({ as: 'h3' })`
  text-transform: none;
`;

export const SecondLevelTitleStyle = styled.h2`
  font-size: ${typography.FontSize.PetiteCouronne};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.IleDeFrance};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.France};
  }
`;

export const ThirdLevelTitleStyle = styled.h3`
  font-size: ${typography.FontSize.Arrondissement};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Paris};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.PetiteCouronne};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${typography.FontSize.GrandeCouronne};
  }
`;

export const FourthLevelTitleStyle = styled.h4`
  font-size: ${typography.FontSize.RueDeLappe};
  &.not-great-cause-proposal {
    margin: 0 0 ${spacings.sm};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${typography.FontSize.Paris};
  }
`;
