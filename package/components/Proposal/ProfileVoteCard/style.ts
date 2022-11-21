import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { ShadowColors } from '@make.org/assets/vars/Colors';
import { DefaultPadding, Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';

export const ProfileVoteCardStyle = styled.aside`
  width: 100%;
  box-shadow: 0 1px 1px 0 ${ShadowColors.BlackZeroFiveOpacity};
  background-color: ${color.greyLighter};
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
  background-color: ${color.white};
  padding: ${intToPx(DefaultPadding.Mobile)};
  width: 100%;
  box-shadow: 0 1px 1px 0 ${color.greyLighter};
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
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  border-width: 2px;
  border-style: solid;
  border-radius: 50%;
  overflow: hidden;
  color: ${color.white};
  box-shadow: 0 1px 1px 0 ${ShadowColors.BlackZeroFiveOpacity};
  &.agree {
    background-color: ${color.agree};
    border-color: ${color.agree};
  }
  &.disagree {
    background-color: ${color.disagree};
    border-color: ${color.disagree};
  }
  &.neutral {
    background-color: ${color.neutral};
    border-color: ${color.neutral};
  }
  .tofill {
    fill: ${color.white};
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
