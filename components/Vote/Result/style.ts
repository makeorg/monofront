import styled from 'styled-components';
import { getBarHeight, intToPx } from '@make.org/utils/helpers/styled';
import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { color, typography } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';

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
  height: 30px;
  justify-content: center;
  align-items: flex-start;
  margin-top: 5px;
`;

export const VoteResultItemStyle = styled.li`
  display: flex;
  height: 100%;
  align-items: flex-end;
`;

export const VoteResultBarStyle = styled.button`
  display: flex;
  width: 6px;
  min-height: 5px;
  margin: 0 2px;
  h(props(props)props => getBarHeight(props.percent)};
  background-(props(props)props => props.color};
  border: none;
  padding: 0;
`;

export const VoteResultTotalLabelStyle = styled.p`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${color.greyDark};
  text-align: center;
  margin-top: 5px;
`;
