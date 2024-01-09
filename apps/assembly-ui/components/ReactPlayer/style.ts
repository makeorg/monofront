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
  .react-player {
    width: 100% !important;
    height: 100% !important;
  }
  &.cookies {
    border-radius: 10px;
    background: rgba(248, 248, 248, 1);
  }
  &.small {
    font-size: ${typography.FontSize.Text.RueDeLappe};
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

export const CookieButtonStyle = styled.button`
  font-size: ${typography.FontSize.Text.RueDeLappe};
  color: rgba(76, 65, 171, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacings.xs} ${spacings.s};
  margin-top: ${spacings.s};
  height: fit-content;
  width: fit-content;
  border: 1px solid rgba(76, 65, 171, 1);
  border-radius: 4px;
  background-color: white;
  &.small {
    font-size: 10px;
  }
`;
