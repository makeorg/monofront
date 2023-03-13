import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { SvgAngleArrowRight } from '@make.org/ui/Svg/elements';
import { colors } from '@make.org/designsystem/tokens/colors';

export const FeaturedListItemStyle = styled.li`
  display: inline-flex;
  margin: 0 15px 15px 0;
`;

export const FeaturedLinkStyle = styled.a`
  display: flex;
  align-items: center;
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.Dark};
  text-decoration: none;
  background-color: transparent;
  border: 1px solid ${colors.Border.Interface.Darker};
  padding: 8px 15px;
  border-radius: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const FeaturedLinkIconStyle = styled(SvgAngleArrowRight)`
  width: 12px;
  height: 12px;
  margin-left: 10px;
  .tofill {
    fill: ${colors.Content.Make.Secondary};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 14px;
    height: 14px;
  }
`;
