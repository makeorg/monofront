import styled from 'styled-components';

export const ReactPlayerContainer = styled.div`
  display: flex;
  height: fit-content;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  border-radius: 15px;
  &.background {
    background-color: #f2f4fc;
    height: 100%;
    align-items: flex-start;
    div:first-child {
      position: sticky;
      top: 10px;
      width: 100% !important;
      height: auto !important;
      aspect-ratio: 16/9;
    }
  }
`;
