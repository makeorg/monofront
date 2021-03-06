import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { color, typography } from 'athena-design-tokens';
import { Elements } from '@make.org/assets/vars/Elements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { ProfileHasVotedStyle } from '@make.org/components/Proposal/ProfileVoteCard/style';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';

export const ThemeResultsWrapperStyle = styled(FlexElementStyle)`
  align-items: center;
`;

export const ThemeResultsButtonStyle = styled(ProfileHasVotedStyle)`
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    min-width: 38px;
    height: 38px;
    font-size: ${intToPx(typography.font.fontsize.X2S.value)};
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
  font-family: ${MakeFonts.CircularStandardBold};
  color: ${props => props.color};
`;

export const ThemeQualifiedStyle = styled.span`
  display: inline-flex;
  font-family: ${MakeFonts.CircularStandardBold};
  color: ${color.black};
  margin: 0 15px 0 5px;
`;

export const TopIdeaListItemStyle = styled.li`
  margin-bottom: 10px;
  &:first-child {
    margin-top: 50px;
  }
  padding: 25px 20px;
  background-color: ${color.white};
  border-radius: ${intToPx(Elements.BorderRadius)};
  border: solid 1px ${color.grey};
`;

export const TopIdeaItemTitleStyle = styled.p`
  margin-bottom: 25px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: 15px;
  }
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  letter-spacing: 0.14px;
`;
