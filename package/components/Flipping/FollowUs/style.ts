import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { SpaceBetweenRowStyle } from '@make.org/ui/elements/FlexElements';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { colors } from '@make.org/designsystem/tokens/colors';
import { SocialNetworksColors } from '../../Sharing/Styled';

export const FollowUsStyle = styled(SpaceBetweenRowStyle)`
  width: 100%;
  max-width: 200px;
  margin: 15px 0;
`;

export const FollowUsListItemStyle = styled.li`
  margin: 0 5px;
  &:first-child {
    margin-left: 0;
  }
  &:last-child {
    margin-right: 0;
  }
`;

const FollowUsButtonStyle = styled(UnstyledButtonStyle)`
  width: 40px;
  height: 40px;
  font-size: ${typography.FontSize.Paris};
  color: ${colors.Content.Interface.Light};
  border-radius: 50%;
  align-items: center;
  &:hover,
  &:focus {
    color: ${colors.Content.Interface.Light};
  }
  svg {
    fill: ${colors.Content.Interface.Light};
  }
`;

export const FollowUsIconsStyle = {
  width: '20px',
  height: '22px',
  marginRight: '13px',
};

export const FacebookButtonStyle = styled(FollowUsButtonStyle)`
  background-color: ${SocialNetworksColors.Facebook};
`;

export const TwitterButtonStyle = styled(FollowUsButtonStyle)`
  background-color: ${SocialNetworksColors.Twitter};
`;

export const InstagramButtonStyle = styled(FollowUsButtonStyle)`
  background-color: ${SocialNetworksColors.Instagram};
`;

export const LinkedInButtonStyle = styled(FollowUsButtonStyle)`
  background-color: ${SocialNetworksColors.LinkedIn};
`;
