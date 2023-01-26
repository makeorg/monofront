import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import { SocialNetworksColors } from '@make.org/assets/vars/Colors';
import { SvgMailPlain } from '@make.org/ui/Svg/elements';
import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { BodySHighLight } from '@make.org/designsystem/components/Body';

export const AuthenticationButtonWrapperStyle = styled(CenterColumnStyle)`
  width: 100%;
  align-self: center;
  gap: 17px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    align-items: center;
    justify-content: center;
  }
`;

export const SvgLogoWrapperStyle = styled.span`
  height: 15px;
  width: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 10px;
`;

export const SvgLogoFacebookWrapperStyle = styled(SvgLogoWrapperStyle)`
  background-color: ${SocialNetworksColors.Facebook};
  fill: white;
  padding-top: 5px;
`;

const SocialButtonStyle = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 38px;
  min-width: 38px;
  min-height: 38px;
  padding: 0;
  border: black;
  border-radius: 17.5px;
  background-color: ${color.white};
  border: 1px solid ${color.black};
  max-width: 300px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
`;

export const SocialButtonLabelStyle = styled(BodySHighLight).attrs({
  as: 'span',
})`
  color: ${color.black};
`;

export const FacebookButtonStyle = styled(SocialButtonStyle)`
  background-color: transparent;
`;

export const GoogleButtonStyle = styled(SocialButtonStyle)`
  background-color: transparent;
`;

export const EmailButtonStyle = styled(SocialButtonStyle)`
  background-color: transparent;
`;

export const AuthenticationEmailIconStyle = styled(SvgMailPlain)`
  width: 14px;
  height: 14px;
  margin-right: 7px;
`;
