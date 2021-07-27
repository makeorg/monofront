import styled from 'styled-components';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';

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
