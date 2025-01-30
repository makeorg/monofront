import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const PrimaryButtonStyle = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 9999px;
  font-size: ${typography.FontSize.Arrondissement};
  padding: ${spacings.s} ${spacings.m};
  text-decoration: none;
  background-color: transparent;
  color: ${colors.Content.Interface.Dark};
  border: 1px solid ${colors.Border.Interface.Darker};
  transition: all 0.25s ease-out;
  > svg {
    margin-right: ${spacings.xs};
  }
  .tofill {
    fill: ${colors.Content.Interface.Dark};
  }
  &.clicked,
  &.clicked:hover {
    color: #253186;
    background-color: #fafaff;
    border-color: #253186;
    .tofill {
      fill: #253186;
    }
  }
  &: hover {
    color: #3444bc;
    background-color: #e3e5f7;
    border-color: #3444bc;
    .tofill {
      fill: #3444bc;
    }
  }
  &:disabled {
    color: #8d8d99;
    background-color: #fafaff;
    border-color: #8d8d99;
    cursor: not-allowed;
    .tofill {
      fill: #8d8d99;
    }
  }
`;
