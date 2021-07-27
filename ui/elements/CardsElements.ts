import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { ShadowColors } from '@make.org/assets/vars/Colors';
import {
  Breakpoints,
  Layouts,
  DefaultPadding,
} from '@make.org/assets/vars/Breakpoints';
import { Elements } from '@make.org/assets/vars/Elements';

export const CardStyle = styled.article`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  width: 100%;
  flex: 1 1 auto;
  max-width: ${intToPx(Layouts.ContainerWidth)};
  padding: ${intToPx(DefaultPadding.Mobile)};
  background-color: ${color.white};
  box-shadow: 0 1px 1px 0 ${ShadowColors.BlackZeroFiveOpacity};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    border-radius: ${intToPx(Elements.BorderRadius)};
  }
`;

export const TallCardStyle = styled(CardStyle)`
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    max-height: 550px;
    padding: ${intToPx(DefaultPadding.Desktop)};
  }
`;
