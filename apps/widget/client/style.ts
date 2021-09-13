import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { BorderColors } from '@make.org/assets/vars/Colors';
import { Elements } from '@make.org/assets/vars/Elements';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';

export const WidgetContainer = styled.div`
  display: flex;
  border-radius: ${intToPx(Elements.BorderRadius)};
  border: 1px solid ${BorderColors.LightGrey};
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  height: 550px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    max-width: 635px;
  }
`;
