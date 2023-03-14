import styled from 'styled-components';
import {
  SequenceParagraphStyle,
  SequenceMainTitleStyle,
} from '@make.org/components/Sequence/Cards/style';
import { typography } from '@make.org/designsystem/tokens/typography';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { colors } from '@make.org/designsystem/tokens/colors';

export const WidgetContainerStyle = styled(ColumnElementStyle)<{
  isStandardSequenceKind: boolean;
}>`
  border: 1px solid ${colors.Border.Interface.LightMain};
  width: 100%;
  height: ${props => (props.isStandardSequenceKind ? '550px' : '572px')};
  position: relative;
  overflow: hidden;
  max-width: 635px;
  background-color: #f2f2f2;
`;

export const ClosedConsultationTitleStyle = styled(SequenceMainTitleStyle)`
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  font-size: ${typography.FontSize.Arrondissement};
  line-height: 1.5;
  letter-spacing: 0.14px;
`;

export const ClosedConsultationDescriptionStyle = styled(
  SequenceParagraphStyle
)`
  font-family: ${typography.FontFamily.Default};
  font-size: ${typography.FontSize.RueDeLappe};
  line-height: 1.5;
  letter-spacing: 0.12px;
`;
