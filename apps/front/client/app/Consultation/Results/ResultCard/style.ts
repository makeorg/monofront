import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { Elements } from '@make.org/assets/vars/Elements';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { TitleS } from '@make.org/designsystem/components/Titles';
import { colors } from '@make.org/designsystem/tokens/colors';

export const ResultCardStyle = styled.section`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  background-color: ${colors.Background.Interface.Lighter};
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

export const ResultCardIconStyle = styled.span<{ focusable: string }>`
  margin-bottom: 15px;
`;

export const ResultCardTitleStyle = styled(TitleS)`
  text-transform: none;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.IleDeFrance};
  }
`;

export const ResultCardDescriptionStyle = styled(ParagraphStyle)<{
  isControversials: boolean;
}>`
  padding: ${props =>
    props.isControversials ? '10px 0px 0px' : '10px 0px 25px'};
  border-bottom: ${props =>
    props.isControversials
      ? '0px'
      : `solid 1px ${colors.Border.Interface.DarkMain}`};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding-right: 70px;
  }
`;
