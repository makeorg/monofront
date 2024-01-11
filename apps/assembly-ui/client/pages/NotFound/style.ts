import { typography } from '@make.org/designsystem/tokens/typography';
import styled from 'styled-components';

export const NotFoundContainerStyle = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 20px;
`;

export const NotFoundTitleStyle = styled.h1`
  font-size: 125px;
  color: rgba(213, 213, 213, 1);
`;

export const NotFoundTextStyle = styled.p`
  font-size: ${typography.FontSize.Text.Arrondissement};
`;

export const NotFoundBackButtonStyle = styled.button`
  width: 100%;
  max-width: 340px;
  height: 40px;
  background-color: rgba(76, 65, 171, 1);
  color: white;
  border-radius: 10px;
  border: none;
  margin: auto auto 0px;
`;
