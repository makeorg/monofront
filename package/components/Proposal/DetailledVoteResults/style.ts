import styled, { keyframes } from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import {
  ColumnElementStyle,
  CenterColumnStyle,
  FlexElementStyle,
} from '@make.org/ui/elements/FlexElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';

export const DetailledContainer = `
  width: 100%;
  max-width: 750px;
  align-self: center;
`;

export const DetailledItemStyle = styled.li`
  display: flex;
  flex-flow: column;
  flex: 1 1 auto;
  padding: 0 15px;
  min-width: 200px;
  &.disagree {
    border-left: 1px solid ${color.greyLighter};
    border-right: 1px solid ${color.greyLighter};
  }
`;

export const DetailledItemListStyle = styled(UnstyledListStyle)`
  display: flex;
  justify-content: space-between;
  overflow-x: auto;
  margin-bottom: 20px;
  ${DetailledContainer};
`;

export const VoteDataListStyle = styled(ColumnElementStyle)`
  margin-left: 10px;
  justify-content: center;
`;

export const VoteDataItemStyle = styled.span`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${color.greyDark};
  margin: 3px 0;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const VoteDataBoldItemStyle = styled(VoteDataItemStyle)`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  font-family: ${MakeFonts.CircularStandardBold};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const QualificationDataListStyle = styled(UnstyledListStyle)`
  margin-top: 10px;
`;

const ProgessAnim = keyframes`
  0% { width: 0; }
  100% { width: 100%; }
`;

export const VoteProgressContainerStyle = styled(CenterColumnStyle)`
  margin: 20px 0;
  ${DetailledContainer};
`;

export const VoteCounterStyle = styled(ParagraphStyle)`
  font-family: ${MakeFonts.CircularStandardBold};
`;

export const VoteProgressWrapperStyle = styled(FlexElementStyle)`
  width: 100%;
  margin-top: 5px;
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
