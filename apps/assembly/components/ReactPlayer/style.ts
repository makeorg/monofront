import styled from 'styled-components';

export const ReactPlayerContainer = styled.div`
  display: flex;
  height: fit-content;
  justify-content: flex-start;
  align-items: center;
  background-color: white;
  max-width: 500px;
  aspect-ratio: 16/9;
  .react-player {
    width: 100% !important;
    height: 100% !important;
  }
  &.small {
    width: 200px;
  }
`;

export const ReactPlayerPlayButtonStyle = styled.button`
  border-style: solid;
  border-width: 15px 0 15px 25px;
  border-color: transparent transparent transparent white;
  background-color: transparent;
  cursor: pointer;

  &:hover {
    border-color: transparent transparent transparent #404040;
  }
`;
