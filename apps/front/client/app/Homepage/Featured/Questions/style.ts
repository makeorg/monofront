import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { SvgAngleArrowRight } from '@make.org/ui/Svg/elements';

export const FeaturedListItemStyle = styled.li`
  display: inline-flex;
  margin: 0 15px 15px 0;
`;

export const FeaturedLinkStyle = styled.a`
  display: flex;
  align-items: center;
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${color.black};
  text-decoration: none;
  background-color: transparent;
  border: 1px solid ${color.black};
  padding: 8px 15px;
  border-radius: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const FeaturedLinkIconStyle = styled(SvgAngleArrowRight)`
  width: 12px;
  height: 12px;
  margin-left: 10px;
  .tofill {
    fill: ${color.brandSecondary};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 14px;
    height: 14px;
  }
`;
