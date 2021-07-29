import { color, typography } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { Elements } from '@make.org/assets/vars/Elements';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';

export const ResultCardStyle = styled.section`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  background-color: ${color.white};
  border-radius: ${intToPx(Elements.BorderRadius)};
  padding: 25px;
  margin-bottom: 30px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 30px;
  }
`;

export const ResultTitleWrapperStyle = styled(ColumnElementStyle)<{
  isTopIdeas: boolean;
}>`
  padding-bottom: ${props => (props.isTopIdeas ? '0px' : '20px')};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding-bottom: ${props => (props.isTopIdeas ? '0px' : '30px')};
  }
`;

export const ResultCardIconStyle = styled.span<{ focusable: boolean }>`
  margin-bottom: 15px;
`;

export const ResultCardTitleStyle = styled.h4`
  font-family: ${MakeFonts.CircularStandardBold};
  text-transform: none;
  font-size: ${intToPx(typography.font.fontsize.L.value)};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${intToPx(typography.font.fontsize.XL.value)};
  }
`;

export const ResultCardDescriptionStyle = styled(ParagraphStyle)<{
  isControversials: boolean;
}>`
  padding: ${props =>
    props.isControversials ? '10px 0px 0px' : '10px 0px 25px'};
  border-bottom: ${props =>
    props.isControversials ? '0px' : `solid 1px ${color.grey}`};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding-right: 70px;
  }
`;
