import { color } from 'athena-design-tokens/dist/color';
import { Breakpoints } from 'Client/app/assets/vars/Breakpoints';
import { Elements } from 'Client/app/assets/vars/Elements';
import { intToPx } from 'Shared/helpers/styled';
import styled from 'styled-components';
import { MakeFonts } from 'Client/app/assets/vars/Fonts';
import { typography } from 'athena-design-tokens/dist/typography';
import { ParagraphStyle } from 'Client/ui/Elements/ParagraphElements';
import { ColumnElementStyle } from 'Client/ui/Elements/FlexElements';

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

export const ResultTitleWrapperStyle = styled(ColumnElementStyle)`
  padding-bottom: ${props => (props.isTopIdeas ? '0px' : '20px')};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding-bottom: ${props => (props.isTopIdeas ? '0px' : '30px')};
  }
`;

export const ResultCardIconStyle = styled.span`
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

export const ResultCardDescriptionStyle = styled(ParagraphStyle)`
  padding: ${props =>
    props.isControversials ? '10px 0px 0px' : '10px 0px 25px'};
  border-bottom: ${props =>
    props.isControversials ? '0px' : `solid 1px ${color.grey}`};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding-right: 70px;
  }
`;
