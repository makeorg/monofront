import styled from 'styled-components';
import { colors } from '@make.org/designsystem/tokens/colors';

export const SwitchButtonStyle = styled.button<{ isChecked: boolean }>`
  position: relative;
  border-radius: 20px;
  min-width: 42px;
  height: 20px;
  background-color: ${props =>
    props.isChecked
      ? colors.Content.Alert.Positive
      : colors.Background.Interface.DarkMain};
  border: 0;

  &:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: ${props => (props.isChecked ? 'calc(100% - 19px);' : '3px')};
    bottom: 2px;
    background-color: ${colors.Content.Interface.Light};
    -webkit-transition: 0.4s;
    transition: 0.4s;
    border-radius: 50%;
  }
`;
