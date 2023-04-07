import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { FormCenterAlignStyle } from '@make.org/ui/elements/FormElements';
import { FourthLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { colors } from '@make.org/designsystem/tokens/colors';

export const ForgotPasswordStyle = styled.section`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100px;
  max-width: 697px;
`;

export const ForgotPasswordFormStyle = styled(FormCenterAlignStyle)`
  max-width: 490px;
`;

export const ForgotPasswordTitleStyle = styled(FourthLevelTitleStyle)<{
  isPanel?: boolean;
}>`
  text-align: center;
  font-size: ${props =>
    props.isPanel
      ? typography.FontSize.Arrondissement
      : typography.FontSize.Paris};
  font-family: ${props =>
    props.isPanel
      ? typography.FontFamily.Default
      : typography.FontFamily.Hightlight};
  font-weight: ${props => (props.isPanel ? 'normal' : 'bold')};
  text-transform: none;
  margin-top: 35px;
  color: ${props =>
    props.isPanel
      ? colors.Content.Interface.DarkSecondary
      : colors.Content.Interface.Dark};
  text-transform: ${props => (props.isPanel ? 'none' : 'uppercase')};
  margin: 20px 0px;
`;
