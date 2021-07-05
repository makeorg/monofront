import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { color, typography } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MiddleRowStyle } from './FlexElements';

export const SeparatorStyle = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${color.grey};
`;

export const SmallSeparatorStyle = styled(SeparatorStyle)`
  max-width: 60px;
`;

export const SmallSeparatorWithMarginStyle = styled(SmallSeparatorStyle)`
  margin: 5px 0 15px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 20px 0 30px;
  }
`;

export const SeparatorWrapperStyle = styled(MiddleRowStyle)`
  width: 100%;
  margin: 25px 0;
  &.no-margin-top {
    margin-top: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 35px 0;
  }
`;

export const TextSeparatorStyle = styled(MiddleRowStyle)`
  width: 60px;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
`;

export const ContentSeparatorStyle = styled(SeparatorStyle)`
  margin: 10px 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 15px 0;
  }
`;
