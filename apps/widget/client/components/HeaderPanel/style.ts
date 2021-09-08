import { BasicColors } from '@make.org/assets/vars/Colors';
import { SvgSmallLogo } from '@make.org/ui/Svg/elements';
import styled from 'styled-components';

export const PanelContainer = styled.div`
  background-color: ${BasicColors.PureWhite};
  padding: 20px;
  width: 100%;
  * {
    align-items: flex-start;
    text-align: left;
  }
  p {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`;

export const LogoStyle = styled(SvgSmallLogo)`
  width: 41px;
  height: 20px;
`;
