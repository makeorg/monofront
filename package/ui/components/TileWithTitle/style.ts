import styled from 'styled-components';
import { colors } from '@make.org/designsystem/tokens/colors';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { BorderRadius } from '@make.org/ui/elements/CardsElements';
import { shadows } from '@make.org/designsystem/tokens/shadows';
import { FourthLevelTitleStyle } from '../../elements/TitleElements';

const DEFAULT_RADIUS: string = intToPx(BorderRadius);

export const TileWithTitleStyle = styled.div<{
  as: JSX.Element;
}>`
  background-color: ${colors.Background.Interface.Lighter};
  box-shadow: ${shadows.s10};
  margin-bottom: 20px;
  padding: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    border-radius: ${DEFAULT_RADIUS};
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export const PresentationTileWithTitleStyle = styled(TileWithTitleStyle)`
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    border-radius: 0 0 ${DEFAULT_RADIUS} ${DEFAULT_RADIUS};
  }
`;

export const TileTitleStyle = styled(FourthLevelTitleStyle)`
  display: flex;
  align-items: center;
  .tofill {
    fill: ${colors.Content.Interface.Dark};
  }
`;
