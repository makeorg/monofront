import styled from 'styled-components';

export const GridStyle = styled.div<{
  col: string;
  rowGap: string;
  colGap: string;
  justify: string;
  align: string;
}>`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: ${props => props.col};
  row-gap: ${props => props.rowGap};
  column-gap: ${props => props.colGap};
  justify-items: ${props => props.justify};
  align-items: ${props => props.align};
`;
