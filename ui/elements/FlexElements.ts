import styled, { css } from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';

export const FlexElementStyle = styled.div`
  display: flex;
`;

export const ColumnToRowElementStyle = styled(FlexElementStyle)`
  flex-flow: column;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex-flow: row;
  }
`;

export const ColumnElementStyle = styled(FlexElementStyle)`
  flex-flow: column;
`;

/* Row Elements */

export const CenterRowStyle = styled(FlexElementStyle)`
  justify-content: center;
`;

export const MiddleRowStyle = styled(CenterRowStyle)`
  align-items: center;
`;

export const SpaceBetweenRowStyle = styled(FlexElementStyle)`
  justify-content: space-between;
  &.fullwidth {
    width: 100%;
  }
`;

/* Column Elements */
export const CenterColumnStyle = styled(ColumnElementStyle)`
  align-items: center;
`;

export const MiddleColumnStyle = styled(CenterColumnStyle)`
  justify-content: center;
`;

export const StartColumnStyle = styled(ColumnElementStyle)`
  justify-content: start;
`;

export const SpaceBetweenColumnStyle = styled(ColumnElementStyle)`
  justify-content: space-between;
`;

/* Column To Row Elements */
export const CenterColumnStyleToRowStyle = styled(ColumnToRowElementStyle)`
  align-items: center;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    justify-content: center;
  }
`;

export const MiddleColumnToRowStyle = styled(CenterColumnStyleToRowStyle)<{
  column?: boolean;
}>`
  justify-content: center;
  ${({ column }) =>
    column
      ? css`
          flex-direction: column;
        `
      : ''}
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    align-items: center;
  }
`;

export const SpaceBetweenColumnToRowStyle = styled(ColumnToRowElementStyle)`
  align-items: center;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    justify-content: space-between;
  }
`;
