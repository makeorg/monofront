import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';
import styled from 'styled-components';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const NavigationWrapperStyle = styled.div`
  padding-top: ${spacings.sm};
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: ${colors.Background.Interface.Lighter};
  border-bottom: 2px solid ${colors.Border.Interface.DarkSecondary};
`;

export const NavigationInnerStyle = styled.div`
  ${ContainerWithPadding};
`;
