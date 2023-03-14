import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
import { SeparatorStyle } from '@make.org/ui/elements/SeparatorsElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { BorderRadius } from '@make.org/ui/elements/CardsElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';
import {
  UnstyledButtonStyle,
  BasicButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';

export const CommitmentPreviewSeparatorStyle = styled(SeparatorStyle)`
  margin: 10px 0 15px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 20px 0 30px;
  }
`;

export const CommitmentPreviewOpinionsWrapperStyle = styled(FlexElementStyle)`
  align-items: center;
  margin-bottom: 15px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-bottom: 25px;
  }
`;

export const CommitmentPreviewOpinionsIconWrapperStyle = styled.div<{
  transform: string;
}>`
  margin-right: 7.5px;
  svg {
    transform: ${props => props.transform};
  }
  svg .tofill {
    fill: ${props => props.color};
  }
`;

export const CommitmentPreviewOpinionsParagraphStyle = styled(ParagraphStyle)`
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  color: ${colors.Content.Interface.Dark};
  span {
    color: ${props => props.color};
  }
`;

export const CommitmentPreviewBoxStyle = styled(ParagraphStyle)`
  width: 100%;
  background-color: ${colors.Background.Interface.DarkSecondary};
  color: ${colors.Content.Interface.Dark};
  padding: 20px;
  border-radius: ${intToPx(BorderRadius)};
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const CommitmentPreviewDislaimerStyle = styled.div`
  width: 100%;
  background-color: ${colors.Background.Alert.Infos};
  color: ${colors.Content.Interface.Light};
  padding: 20px;
  border-radius: ${intToPx(BorderRadius)};
  margin-top: 15px;
`;

export const CommitmentPreviewParagraphStyle = styled(ParagraphStyle)`
  color: ${colors.Content.Interface.Light};
`;

export const CommitmentPreviewButtonsWrapperStyle = styled(FlexElementStyle)`
  margin-top: 20px;
  justify-content: flex-end;
`;

export const CommitmentPreviewCancelStyle = styled(UnstyledButtonStyle)`
  font-size: ${typography.FontSize.RueDeLappe};
  color: rgba(255, 255, 255, 0.65);
  text-decoration: underline;
  margin-right: 30px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const CommitmentPreviewConfirmStyle = styled.button.attrs(props => ({
  type: 'button',
  ...props,
}))`
  ${BasicButtonStyle}
  background-color: ${colors.Background.Interface.Lighter};
  color: ${colors.Content.Interface.Dark};
`;
