import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';

export const PromptContainer = styled.div`
  position: sticky;
  bottom: 0;
  background-color: white;
  z-index: 100;
  width: 100%;
  margin: auto auto 0 auto;
  padding: ${spacings.m};
  max-width: ${intToPx(Breakpoints.LargeDesktop)};
  height: 80px;
  border: 1px solid blue;
`;
