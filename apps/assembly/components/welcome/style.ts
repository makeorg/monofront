import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const WelcomeContainer = styled.div`
  width: 100%;
  max-width: ${intToPx(Breakpoints.LargeDesktop)};
  margin: auto;
  padding: ${spacings.m};
`;

export const WelcomeContent = styled.div`
  height: 120px;
  margin-bottom: 80px;
  border: 1px solid black;
`;
