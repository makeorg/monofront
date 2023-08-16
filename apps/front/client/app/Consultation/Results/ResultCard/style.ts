import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { TitleSStyle } from '@make.org/designsystem/components/Typography/Titles/style';
import { colors } from '@make.org/designsystem/tokens/colors';
import { BorderRadius } from '@make.org/ui/elements/CardsElements';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { TitleStyleType } from '@make.org/designsystem/components/Typography/Titles';

export const ResultCardStyle = styled.section`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  background-color: ${colors.Background.Interface.Lighter};
  border-radius: ${intToPx(BorderRadius)};
  padding: 25px;
  margin-bottom: ${spacings.l};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: ${spacings.l};
  }
`;

export const ResultTitleWrapperStyle = styled(ColumnElementStyle)<{
  isTopIdeas: boolean;
}>`
  padding-bottom: ${props => (props.isTopIdeas ? '0px' : `${spacings.m}`)};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding-bottom: ${props => (props.isTopIdeas ? '0px' : `${spacings.l}`)};
  }
`;

export const ResultCardIconStyle = styled.span<{ focusable: string }>`
  margin-bottom: ${spacings.sm};
`;

export const ResultCardTitleStyle = styled(TitleSStyle).attrs({
  as: 'h4',
  type: TitleStyleType.highlight,
})`
  text-transform: none;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    font-size: ${typography.FontSize.IleDeFrance};
  }
`;

export const ResultCardDescriptionStyle = styled(ParagraphStyle)<{
  isControversials: boolean;
}>`
  padding: ${props =>
    props.isControversials
      ? `${spacings.s} 0px 0px`
      : `${spacings.s} 0px 25px`};
  border-bottom: ${props =>
    props.isControversials
      ? '0px'
      : `solid 1px ${colors.Border.Interface.DarkMain}`};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding-right: 70px;
  }
`;
