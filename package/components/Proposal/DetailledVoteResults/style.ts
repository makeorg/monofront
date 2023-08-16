import styled, { keyframes } from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import {
  ColumnElementStyle,
  CenterColumnStyle,
  FlexElementStyle,
} from '@make.org/ui/elements/FlexElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

const DetailledContainer = `
  width: 100%;
  max-width: 750px;
  align-self: center;
`;

export const DetailledItemStyle = styled.li`
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  padding: 0 ${spacings.sm};
  min-width: 200px;
  &.disagree {
    border-left: 1px solid ${colors.Border.Interface.DarkSecondary};
    border-right: 1px solid ${colors.Border.Interface.DarkSecondary};
  }
`;

export const DetailledItemListStyle = styled(UnstyledListStyle)`
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  margin-bottom: ${spacings.m};
  ${DetailledContainer};
`;

export const VoteDataListStyle = styled(ColumnElementStyle)`
  margin-left: ${spacings.s};
  justify-content: center;
`;

const VoteDataItemStyle = styled.span`
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.DarkSecondary};
  margin: 3px 0;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const VoteDataBoldItemStyle = styled(VoteDataItemStyle)`
  font-size: ${typography.FontSize.Arrondissement};
  font-family: ${typography.FontFamily.Highlight};
  font-weight: bold;
`;

export const QualificationDataListStyle = styled(UnstyledListStyle)`
  margin-top: ${spacings.s};
`;

const ProgessAnim = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

export const VoteProgressContainerStyle = styled(CenterColumnStyle)`
  margin: ${spacings.m} 0;
  ${DetailledContainer};
`;

export const VoteCounterStyle = styled(ParagraphStyle)`
  font-family: ${typography.FontFamily.Highlight};
  font-weight: bold;
`;

export const VoteProgressWrapperStyle = styled(FlexElementStyle)`
  width: 100%;
  margin-top: ${spacings.xs};
`;

export const VoteProgressItemStyle = styled.div<{
  color: string;
  percent: number;
}>`
  max-width: ${props => props.percent}%;
  background: ${props => props.color};
  height: 5px;
  transition: width 0.5s ease-in;
  animation: ${ProgessAnim} 2s 1 forwards;
`;
