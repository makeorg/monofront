import styled from 'styled-components';
import { typography, color } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { FormCenterAlignStyle } from '@make.org/ui/elements/FormElements';
import { FourthLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { TitleXXS } from '@make.org/designsystem/components/Titles';

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
      ? intToPx(typography.font.fontsize.XS.value)
      : intToPx(typography.font.fontsize.S.value)};
  font-family: ${props =>
    props.isPanel
      ? MakeFonts.CircularStandardBook
      : MakeFonts.CircularStandardBold};
  text-transform: none;
  margin-top: 35px;
  color: ${props => (props.isPanel ? color.greyDark : color.black)};
  text-transform: ${props => (props.isPanel ? 'none' : 'uppercase')};
  margin: 20px 0px;
`;

export const PanelForgotPasswordTitleStyle = styled(TitleXXS).attrs({
  as: 'h3',
})`
  text-transform: none;
  color: ${color.black};
  text-transform: uppercase;
  &.panel {
    text-transform: none;
  }
`;
