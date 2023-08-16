import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { typography } from '@make.org/designsystem/tokens/typography';
import { BorderRadius } from '@make.org/ui/elements/CardsElements';
import { ProfileHasVotedStyle } from '@make.org/components/Proposal/ProfileVoteCard/style';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';
import { TextMStyle } from '@make.org/designsystem/components/Typography/Text/style';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const ThemeResultsWrapperStyle = styled(FlexElementStyle)`
  align-items: center;
`;

export const ThemeResultsButtonStyle = styled(ProfileHasVotedStyle)`
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    min-width: 38px;
    height: 38px;
    font-size: ${typography.FontSize.RueDeLappe};
    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const ThemeResultsDetailsStyle = styled(ParagraphStyle)`
  display: flex;
  flex-flow: column;
  margin-left: ${spacings.xs};
`;

export const ThemeAgreeResultsStyle = styled(ParagraphStyle)`
  font-family: ${typography.FontFamily.Highlight};
  font-weight: bold;
  color: ${props => props.color};
`;

export const ThemeQualifiedStyle = styled.span`
  display: inline-flex;
  font-family: ${typography.FontFamily.Highlight};
  font-weight: bold;
  color: ${colors.Content.Interface.Dark};
  margin: 0 ${spacings.sm} 0 ${spacings.xs};
`;

export const TopIdeaListItemStyle = styled.li`
  margin-bottom: ${spacings.s};
  &:first-child {
    margin-top: ${spacings.xl};
  }
  padding: ${spacings.l} ${spacings.m};
  background-color: ${colors.Background.Interface.Lighter};
  border-radius: ${intToPx(BorderRadius)};
  border: solid 1px ${colors.Border.Interface.DarkMain};
`;

export const TopIdeaItemTitleStyle = styled(TextMStyle)`
  margin-bottom: ${spacings.l};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: ${spacings.sm};
  }
  letter-spacing: 0.14px;
`;
