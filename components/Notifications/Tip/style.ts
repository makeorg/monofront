import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';

export const TipWrapperStyle = styled.div`
  position: relative;
  font-family: ${MakeFonts.CircularStandardBook};
  background-color: ${color.infos};
  color: ${color.white};
  padding: 6px 17px 6px 10px;
  border-radius: 2px;
  font-size: 14px;
  line-height: 1.5;
  letter-spacing: 0.14px;
`;

export const TriangleDownStyle = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 9px 6px 0 6px;
  border-color: ${color.infos} transparent transparent transparent;
  margin-bottom: 5px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: 10px;
  }
`;

export const TipLinkStyle = styled(UnstyledButtonStyle)`
  display: inline;
  color: ${color.white};
  text-decoration: underline;
  margin-left: 5px;
  font-family: ${MakeFonts.CircularStandardBook};
  &:hover,
  &:focus {
    color: ${color.white};
  }
`;
