import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import { intToPx } from 'Shared/helpers/styled';
import {
  DefaultPadding,
  Breakpoints,
} from 'Client/app/assets/vars/Breakpoints';
import { ShadowColors } from 'Client/app/assets/vars/Colors';
import { FourthLevelTitleStyle } from 'Client/ui/Elements/TitleElements';
import { MakeFonts } from 'Client/app/assets/vars/Fonts';
import { CenterColumnStyle } from 'Client/ui/Elements/FlexElements';
import { Elements } from 'Client/app/assets/vars/Elements';
import { SvgLightBulb } from 'Client/ui/Svg/elements';

export const ProposalWrapperStyle = styled.div`
  width: 100%;
  padding: ${intToPx(DefaultPadding.Mobile)};
  background-color: ${color.white};
  box-shadow: 0 1px 1px 0 ${ShadowColors.BlackZeroFiveOpacity};
  margin: 0 0 20px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    border-radius: ${intToPx(Elements.BorderRadius)};
    margin: 0 0 30px;
  }
`;

export const ProposalTitleStyle = styled(FourthLevelTitleStyle)`
  font-family: ${MakeFonts.CircularStandardBold};
  text-transform: none;
  color: ${props => props.fontColor};
  margin: 5px 0 10px;
`;

export const ProposalTitleIconStyle = styled(SvgLightBulb)`
  display: inline-flex;
  margin-right: 7.5px;
  .tofill {
    fill: ${color.black};
  }
`;

export const LoadMoreWrapperStyle = styled(CenterColumnStyle)`
  margin-top: 20px;
`;
