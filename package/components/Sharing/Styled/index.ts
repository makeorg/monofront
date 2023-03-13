import styled from 'styled-components';
import { typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { SpaceBetweenRowStyle } from '@make.org/ui/elements/FlexElements';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { SocialNetworksColors } from '@make.org/assets/vars/Colors';
import { colors } from '@make.org/designsystem/tokens/colors';

export const SharingStyle = styled(SpaceBetweenRowStyle)`
  width: 100%;
  max-width: 150px;
`;

const SharingButtonStyle = styled(UnstyledButtonStyle)`
  width: 40px;
  height: 40px;
  font-size: ${intToPx(typography.font.fontsize.S.value)};
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
