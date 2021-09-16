import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { BorderColors } from '@make.org/assets/vars/Colors';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { SequenceParagraphStyle } from '@make.org/components/Sequence/Cards/style';
import { typography } from 'athena-design-tokens';
import { SequenceMainTitleStyle } from '../../../components/Sequence/Cards/style';

export const WidgetContainer = styled.div`
  display: flex;
  border: 1px solid ${BorderColors.LightGrey};
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  height: 550px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    max-width: 635px;
  }
`;
export const ClosedConsultationTitleStyle = styled(SequenceMainTitleStyle)`
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  line-height: 1.5;
  letter-spacing: 0.14px;
`;

export const ClosedConsultationDescriptionStyle = styled(
  SequenceParagraphStyle
)`
  font-family: ${MakeFonts.CircularStandardBook};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  line-height: 1.5;
  letter-spacing: 0.12px;
`;
