import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { SpaceBetweenRowStyle } from '@make.org/ui/elements/FlexElements';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { SocialNetworksColors } from '@make.org/assets/vars/Colors';

export const SharingStyle = styled(SpaceBetweenRowStyle)`
  width: 100%;
  max-width: 150px;
`;

export const SharingButtonStyle = styled(UnstyledButtonStyle)`
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

export const FacebookButtonStyle = styled(SharingButtonStyle)`
  background-color: ${SocialNetworksColors.Facebook};
`;

export const TwitterButtonStyle = styled(SharingButtonStyle)`
  background-color: ${SocialNetworksColors.Twitter};
`;

export const LinkedInButtonStyle = styled(SharingButtonStyle)`
  background-color: ${SocialNetworksColors.LinkedIn};
`;
