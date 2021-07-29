import { color } from 'athena-design-tokens/dist/color';
import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';
import styled from 'styled-components';

export const NavigationWrapperStyle = styled.div`
  padding-top: 15px;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: ${color.white};
`;

export const NavigationInnerStyle = styled.div`
  ${ContainerWithPadding};
`;
