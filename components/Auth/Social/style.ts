import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import { SocialNetworksColors } from '@make.org/assets/vars/Colors';
import { SvgMailPlain } from '@make.org/ui/Svg/elements';
import { CenterRowStyle } from '@make.org/ui/elements/FlexElements';
import { RedButtonStyle } from '@make.org/ui/elements/Buttons/style';

export const AuthenticationButtonWrapperStyle = styled(CenterRowStyle)`
  width: 100%;
  align-self: center;
  margin: 20px 0;
`;

export const SocialButtonStyle = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 38px;
  min-width: 38px;
  min-height: 38px;
  padding: 0;
  margin: 0 10px;
  border-radius: 50%;
`;

export const FacebookButtonStyle = styled(SocialButtonStyle)`
  background-color: ${SocialNetworksColors.Facebook};
  border: 1px solid ${SocialNetworksColors.Facebook};
  .tofill {
    fill: ${color.white};
  }
`;

export const GoogleButtonStyle = styled(SocialButtonStyle)`
  background-color: ${color.white};
  border: 1px solid ${color.grey};
`;

export const EmailButtonStyle = styled(RedButtonStyle)`
  margin: 0 10px;
`;

export const AuthenticationEmailIconStyle = styled(SvgMailPlain)`
  width: 14px;
  height: 14px;
  margin-right: 7px;
`;
