import styled from 'styled-components';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { Elements } from '@make.org/assets/vars/Elements';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { colors } from '@make.org/designsystem/tokens/colors';
import { shadows } from '@make.org/designsystem/tokens/shadows';

export const SearchPageSidebarStyle = styled(ColumnElementStyle)`
  width: 100%;
  padding: 0 20px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    position: sticky;
    top: 0;
    z-index: 2;
    order: 1;
    max-width: 360px;
    padding: 0;
    margin-left: 20px;
  }
`;

export const SeachRegisterButtonStyle = styled(RedButtonStyle)`
  margin-top: 15px;
  svg {
    width: 13px;
    height: 13px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    svg {
      width: 15px;
      height: 15px;
    }
  }
`;

export const SearchSidebarTileStyle = styled.div<{
  image: string;
}>`
  width: 100%;
  background-image: url(${props => props.image});
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: ${colors.Background.Interface.Lighter};
  border-radius: ${intToPx(Elements.BorderRadius)};
  box-shadow: ${shadows.s10};
  padding: 20px;
`;
