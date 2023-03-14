import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { typography } from '@make.org/designsystem/tokens/typography';
import { BorderRadius } from '@make.org/ui/elements/CardsElements';
import { ProfileHasVotedStyle } from '@make.org/components/Proposal/ProfileVoteCard/style';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';
import { BodyMHighLight } from '@make.org/designsystem/components/Body';
import { colors } from '@make.org/designsystem/tokens/colors';

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
  margin-left: 5px;
`;

export const ThemeAgreeResultsStyle = styled(ParagraphStyle)`
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  color: ${props => props.color};
`;

export const ThemeQualifiedStyle = styled.span`
  display: inline-flex;
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  color: ${colors.Content.Interface.Dark};
  margin: 0 15px 0 5px;
`;

export const TopIdeaListItemStyle = styled.li`
  margin-bottom: 10px;
  &:first-child {
    margin-top: 50px;
  }
  padding: 25px 20px;
  background-color: ${colors.Background.Interface.Lighter};
  border-radius: ${intToPx(BorderRadius)};
  border: solid 1px ${colors.Border.Interface.DarkMain};
`;

export const TopIdeaItemTitleStyle = styled(BodyMHighLight)`
  margin-bottom: 25px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: 15px;
  }
  letter-spacing: 0.14px;
`;
