import styled from 'styled-components';

export const AppContent = styled.div`
  position: relative;
  min-height: 100vh;
  // needed for bottom sticky when main content is smaller than  viewport
  display: flex;
  flex-direction: column;
`;
