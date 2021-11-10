import { color } from 'athena-design-tokens';
import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';
import styled from 'styled-components';

export const NavigationWrapperStyle = styled.div`
  padding-top: 15px;
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: ${color.white};
  border-bottom: 2px solid ${color.greyLighter};
`;

export const NavigationInnerStyle = styled.div`
  ${ContainerWithPadding};
`;
