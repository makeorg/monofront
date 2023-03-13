import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { ShadowColors } from '@make.org/assets/vars/Colors';
import { DefaultPadding, Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { colors } from '@make.org/designsystem/tokens/colors';

export const ProfileVoteCardStyle = styled.aside`
  width: 100%;
  box-shadow: 0 1px 1px 0 ${ShadowColors.BlackZeroFiveOpacity};
  background-color: ${colors.Background.Interface.DarkSecondary};
  padding: ${intToPx(DefaultPadding.Mobile)};
`;

export const ProfileVoteWrapperStyle = styled.article`
  margin-bottom: 15px;
  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProfileVoteTitleStyle = styled.div`
  display: flex;
  align-items: center;
  background-color: ${colors.Background.Interface.Lighter};
  padding: ${intToPx(DefaultPadding.Mobile)};
  width: 100%;
  box-shadow: 0 1px 1px 0 ${colors.Background.Interface.DarkSecondary};
`;

export const ProfileHasVotedStyle = styled.div`
  display: inline-flex;
  position: relative;
  min-width: 38px;
  height: 38px;
  justify-content: center;
  align-items: center;
  padding: 5px;
  margin-right: 5px;
  font-size: ${typography.FontSize.Paris};
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  overflow: hidden;
  color: ${colors.Content.Interface.Light};
  box-shadow: 0 1px 1px 0 ${ShadowColors.BlackZeroFiveOpacity};
  &.agree {
    background-color: ${colors.Background.Alert.Positive};
    border-color: ${colors.Border.Alert.Positive};
  }
  &.disagree {
    background-color: ${colors.Background.Alert.Disagree};
    border-color: ${colors.Border.Alert.Disagree};
  }
  &.neutral {
    background-color: ${colors.Background.Alert.Neutral};
  }
  .tofill {
    fill: ${colors.Content.Interface.Light};
  }
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    min-width: 43px;
    height: 43px;
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    min-width: 48px;
    height: 48px;
  }
`;
