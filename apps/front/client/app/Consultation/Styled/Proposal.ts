import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { DefaultPadding, Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { ShadowColors } from '@make.org/assets/vars/Colors';
import { FourthLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import { Elements } from '@make.org/assets/vars/Elements';
import { SvgLightBulb } from '@make.org/ui/Svg/elements';

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

export const ProposalTitleStyle = styled(FourthLevelTitleStyle)<{
  fontColor: string;
}>`
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
