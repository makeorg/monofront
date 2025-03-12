import styled from 'styled-components';
import { Layouts, Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const PrivateAuthCardStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  max-width: ${intToPx(Layouts.ContainerWithPadding)};
  background-color: #f2f2f2;
  padding: 0px ${spacings.sm} ${spacings.sm};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0px ${spacings.m} ${spacings.m};
  }
  &.error {
    color: red;
  }
`;

export const OverlayLoader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(2px);
  z-index: 2;
`;
