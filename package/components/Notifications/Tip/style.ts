import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { BodySDefault } from '@make.org/designsystem/components/Body';

export const TipWrapperStyle = styled(BodySDefault).attrs({ as: 'div' })`
  position: relative;
  background-color: ${color.infos};
  color: ${color.white};
  padding: 6px 10px;
  border-radius: 2px;
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
