import styled from 'styled-components';
import { getBarHeight, intToPx } from '@make.org/utils/helpers/styled';
import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { colors } from '@make.org/designsystem/tokens/colors';

export const VoteResultStyle = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  min-width: 275px;
  margin: 10px 0;
  padding: 0 10px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 30px 0;
  }
`;

export const VoteResultContainerStyle = styled(CenterColumnStyle)`
  margin-right: 10px;
`;

export const VoteResultGraphStyle = styled(UnstyledListStyle)`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-start;
  height: 20px;
  max-width: 20px;
  margin-top: 10px;
`;

export const VoteResultItemStyle = styled.li`
  display: flex;
  height: 100%;
  align-items: flex-end;
`;

export const VoteResultBarStyle = styled.button<{ percent: number }>`
  display: flex;
  width: 6px;
  min-height: 5px;
  margin: 0 2px;
  height: ${props => getBarHeight(props.percent, 20)};
  background-color: ${props => props.color};
  border: none;
  padding: 0;
`;

export const VoteResultTotalLabelStyle = styled.p`
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.DarkSecondary};
  text-align: center;
  margin-top: 5px;
  &.widget {
    font-size: 10px;
  }
`;
