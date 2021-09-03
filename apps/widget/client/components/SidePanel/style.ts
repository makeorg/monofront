import { BasicColors } from '@make.org/assets/vars/Colors';
import { SvgLogo } from '@make.org/ui/Svg/elements';
import styled from 'styled-components';

export const SidePanelContainer = styled.div`
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

export const LogoStyle = styled(SvgLogo)`
  width: 35px;
  height: 18px;
`;
