import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Elements } from '@make.org/assets/vars/Elements';
import { DefaultPadding, Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { SvgAngleArrowRight } from '@make.org/ui/Svg/elements';
import { Link, LinkProps } from 'react-router-dom';
import {
  BodyMHighLight,
  BodyXSCondensed,
} from '@make.org/designsystem/components/Body';

export const SearchResultsConsultationListStyle = styled(UnstyledListStyle)`
  @media (max-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 0 20px;
  }
`;

export const BusinessConsultationsItemWrapperStyle = styled(BodyMHighLight)`
  display: flex;
  text-decoration: none;
  color: ${color.greyDark};
  width: 100%;
`;

export const BusinessConsultationStyle = styled.div`
  padding: 15px;
  flex: 1;
`;

export const BusinessConsultationsItemStatusStyle = styled(BodyXSCondensed)`
  color: ${color.greyDark};
  text-transform: uppercase;
  margin-bottom: 4px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

const BusinessConsultationsLinkStyle = `
  font-family: ${MakeFonts.CircularStandardBold};
  font-weight: bold;
  color: ${color.greyDark};
  &:hover,
  &:focus {
    color: ${color.greyDark};
  }
`;

export const BusinessConsultationsItemLinkStyle = styled(Link)<LinkProps>`
  ${BusinessConsultationsLinkStyle};
`;

export const BusinessConsultationsItemHTMLLinkStyle = styled.a`
  ${BusinessConsultationsLinkStyle};
`;

export const BusinessConsultationsItemBorderStyle = styled.div`
  width: 10px;
  background-color: ${props => props.color};
`;

export const BusinessConsultationsItemArrowStyle = styled(SvgAngleArrowRight)`
  justify-self: center;
  align-self: center;
  margin-right: 5px;
`;

export const BusinessConsultationsItemStyle = styled.li<{
  backgroundColor: string;
}>`
  display: flex;
  border-radius: ${intToPx(Elements.BorderRadius)};
  background-color: ${props => props.backgroundColor || 'rgb(242, 242, 242)'};
  overflow: hidden;
  margin: 0 0 ${intToPx(DefaultPadding.Mobile)};
`;
