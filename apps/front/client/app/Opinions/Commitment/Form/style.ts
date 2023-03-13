import styled from 'styled-components';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { CenterRowStyle } from '@make.org/ui/elements/FlexElements';

export const OpinionFormStyle = styled.form`
  display: flex;
  flex-flow: column;
  margin-top: 20px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-top: 30px;
  }
`;

export const OpinionFormTitleStyle = styled(ParagraphStyle)`
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  margin-bottom: 20px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: 30px;
  }
`;

export const OpinionAreaWrapperStyle = styled.div`
  margin-bottom: 10px;
`;

export const OpinionSubmitWrapperStyle = styled(CenterRowStyle)`
  margin-top: 15px;
`;
