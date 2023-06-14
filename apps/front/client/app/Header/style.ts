import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { intToPx } from '@make.org/utils/helpers/styled';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { Layouts, Breakpoints } from '@make.org/assets/vars/Breakpoints';
import {
  FlexElementStyle,
  SpaceBetweenRowStyle,
} from '@make.org/ui/elements/FlexElements';
import { SEARCH } from '@make.org/types/enums';
import { SvgLogo } from '@make.org/ui/Svg/elements';
import { Image } from '@make.org/ui/components/Image';

export const HeaderStyle = styled.header`
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: center;
  flex-shrink: 0;
  padding: ${spacings.s} ${spacings.m};
  background-color: ${colors.Background.Interface.Lighter};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 25px ${spacings.m};
  }
`;

export const HeaderInnerStyle = styled(SpaceBetweenRowStyle)`
  width: 100%;
  max-width: ${intToPx(Layouts.ContainerWidth)};
`;

export const HeaderFlexLeftStyle = styled(FlexElementStyle)`
  flex-shrink: 0;
  justify-items: flex-start;
  align-items: center;
`;

export const HeaderFlexRightStyle = styled(FlexElementStyle)`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
`;

export const HeaderLogoLinkStyle = styled(Link)`
  display: flex;
`;

export const HeaderLogoStyle = styled(SvgLogo)`
  width: 66px;
  height: 33px;
`;

export const HeaderSeparatorStyle = styled.div`
  width: 1px;
  height: 100%;
  margin: 0 ${spacings.l};
  background-color: ${colors.Background.Interface.DarkMain};
`;

export const HeaderCobrandingIcon = styled.div`
  position: relative;
  padding-left: 30px;
  margin-left: 30px;
  height: 32px;

  &:before {
    content: '';
    position: absolute;
    border-left: 1px solid ${colors.Border.Interface.DarkMain};
    left: 0;
    height: 100%;
    width: 100%;
    background-color: inherit;
    -webkit-transform: skewX(-15deg);
    -moz-transform: skewX(-15deg);
    -ms-transform: skewX(-15deg);
    transform: skewX(-15deg);
  }
`;

export const HeaderCobrandingSearchAnimation = styled.div`
  &.${SEARCH.SEARCH_DESKTOP_EXPANDED}[aria-hidden='true'] {
    display: none;
    visibility: hidden;
  }
`;

export const HeaderCobrandingImage = styled(Image)`
  flex: 1;
  max-width: 150px;
`;
