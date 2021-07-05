import styled from 'styled-components';

export const SwitchButtonInternalWrapperStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SwitchButtonStyle = styled.button`
  margin: 0;
  padding: 0;
  border-radius: 5px;
  min-width: 40px;
  width: 40px;
  height: 10px;
  display: flex;
  background-color: ${props =>
    props.isChecked ? 'rgba(80, 122, 31, 0.4)' : 'rgba(0, 0, 0, 0.15)'};

  vertical-align: middle;
  border: 0;
`;

export const SwitchButtonInternalLabelStyle = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 16px;
  width: 16px;
  left: ${props => (props.isChecked ? 'calc(100% - 16px);' : '0')};
  bottom: 3px;
  background-color: ${props =>
    props.isChecked ? 'rgba(80, 122, 31, 1)' : 'rgba(0, 0, 0, 1)'};
  transition: 0.4s;
  border-radius: 50%;
`;
