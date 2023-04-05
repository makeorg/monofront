import styled from 'styled-components';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { typography } from '@make.org/designsystem/tokens/typography';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { CenterRowStyle } from '@make.org/ui/elements/FlexElements';

export const OpinionFormStyle = styled.form`
  display: flex;
  flex-flow: column;
  margin-top: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-top: ${spacings.l};
  }
`;

export const OpinionFormTitleStyle = styled(ParagraphStyle)`
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  margin-bottom: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: ${spacings.l};
  }
`;

export const OpinionAreaWrapperStyle = styled.div`
  margin-bottom: ${spacings.s};
`;

export const OpinionSubmitWrapperStyle = styled(CenterRowStyle)`
  margin-top: ${spacings.sm};
`;
