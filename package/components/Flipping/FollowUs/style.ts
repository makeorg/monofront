import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { SpaceBetweenRowStyle } from '@make.org/ui/elements/FlexElements';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { SocialNetworksColors } from '@make.org/assets/vars/Colors';
import { intToPx } from '@make.org/utils/helpers/styled';

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
  font-size: ${intToPx(typography.font.fontsize.S.value)};
  color: ${color.white};
  border-radius: 50%;
  align-items: center;
  &:hover,
  &:focus {
    color: ${color.white};
  }
  svg {
    fill: ${color.white};
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
