import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';
import styled from 'styled-components';

export const ReactPlayerContainer = styled.div`
  font-size: ${typography.FontSize.Text.Bastille};
  display: flex;
  flex-flow: column;
  height: fit-content;
  justify-content: center;
  align-items: center;
  background-color: white;
  max-width: 500px;
  aspect-ratio: 16/9;
  width: 100%;

  .react-player {
    width: 100% !important;
    height: 100% !important;
  }

  &.cookies {
    border-radius: 10px;
    background: rgba(248, 248, 248, 1);
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

export const CookieButtonStyle = styled.button`
  font-size: ${typography.FontSize.Text.RueDeLappe};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacings.s} ${spacings.m};
  margin-top: ${spacings.s};
  height: fit-content;
  width: fit-content;
  border-radius: 4px;
  color: white;
  border-style: none;
  background-color: #4c41ab;
  margin: ${spacings.s} auto;
  &.small {
    font-size: 10px;
  }
`;
