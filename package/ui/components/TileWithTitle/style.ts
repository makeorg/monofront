import styled from 'styled-components';
import { colors } from '@make.org/designsystem/tokens/colors';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { ShadowColors } from '@make.org/assets/vars/Colors';
import { Elements } from '@make.org/assets/vars/Elements';
import { FourthLevelTitleStyle } from '../../elements/TitleElements';

const DEFAULT_RADIUS: string = intToPx(Elements.BorderRadius);

export const TileWithTitleStyle = styled.div<{
  as: JSX.Element;
}>`
  background-color: ${colors.Background.Interface.Lighter};
  box-shadow: 0 1px 1px 0 ${ShadowColors.BlackZeroFiveOpacity};
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
