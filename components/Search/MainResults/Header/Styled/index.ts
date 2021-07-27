import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import {
  PlayfairParagraphStyle,
  ParagraphStyle,
} from '@make.org/ui/elements/ParagraphElements';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';

export const MainResultsHeaderStyle = styled.div`
  padding: 0 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0;
  }
`;

export const MainResultsHeaderContentStyle = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid ${color.greyLighter};
  margin-bottom: 20px;
`;

export const MainResultsTitleWrapperStyle = styled(ParagraphStyle)`
  color: ${color.greyDark};
`;

export const MainResultsTitleStyle = styled(PlayfairParagraphStyle)`
  display: inline-flex;
  margin-right: 10px;
`;
