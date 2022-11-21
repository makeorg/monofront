import styled from 'styled-components';
import {
  CenterColumnStyle,
  MiddleRowStyle,
} from '@make.org/ui/elements/FlexElements';
import { color } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';

// @to do : to remove when deprecated sequence doesn't exist anymore
export const SequenceSharingInnerStyle = styled(CenterColumnStyle)`
  width: 100%;
  border-bottom: 2px solid ${color.greyLighter};
  padding: 0 0 10px 0;
  margin-bottom: 10px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 50%;
    border-bottom: none;
    border-right: 2px solid ${color.greyLighter};
    padding: 50px 25px 50px 0;
    margin-bottom: 0;
  }
`;

export const SequenceSharingWrapperStyle = styled(MiddleRowStyle)`
  width: 100%;
`;

// @todo: to keep for new sequence
export const SequenceShareInnerStyle = styled(CenterColumnStyle)`
  width: 100%;
  padding: 0 0 30px 0;
`;

export const SequenceShareSeparatorStyle = styled.hr`
  width: 80px;
  height: 2px;
  border-style: none;
  background-color: ${color.grey};
  margin-bottom: 30px;
`;
