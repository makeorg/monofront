import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { SpaceBetweenRowStyle } from '@make.org/ui/elements/FlexElements';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { colors } from '@make.org/designsystem/tokens/colors';

export const SocialNetworksColors = {
  Facebook: 'rgb(24,118,242)',
  Twitter: 'rgb(26,145,218)',
  Instagram: 'rgb(252,175,69)',
  LinkedIn: 'rgb(0,119,181)',
};

export const SharingStyle = styled(SpaceBetweenRowStyle)`
  width: 100%;
  max-width: 150px;
`;

const SharingButtonStyle = styled(UnstyledButtonStyle)`
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

export const FacebookButtonStyle = styled(SharingButtonStyle)`
  background-color: ${SocialNetworksColors.Facebook};
`;

export const TwitterButtonStyle = styled(SharingButtonStyle)`
  background-color: ${SocialNetworksColors.Twitter};
`;

export const LinkedInButtonStyle = styled(SharingButtonStyle)`
  background-color: ${SocialNetworksColors.LinkedIn};
`;
