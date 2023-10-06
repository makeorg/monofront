import { typography } from '@make.org/designsystem/tokens/typography';
import styled from 'styled-components';

export const AppContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 50px;
  min-height: 100%;
  padding: 20px 20px 50px 20px;
  font-family: ${typography.FontFamily.Display};
`;
