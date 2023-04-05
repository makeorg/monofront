import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { intToPx } from '@make.org/utils/helpers/styled';
import { BorderRadius } from '@make.org/ui/elements/CardsElements';
import { DefaultPadding, Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { SvgAngleArrowRight } from '@make.org/ui/Svg/elements';
import { Link, LinkProps } from 'react-router-dom';
import {
  BodyMHighLight,
  BodyXSCondensed,
} from '@make.org/designsystem/components/Body';

export const SearchResultsConsultationListStyle = styled(UnstyledListStyle)`
  @media (max-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 0 ${spacings.m};
  }
`;

export const BusinessConsultationsItemWrapperStyle = styled(BodyMHighLight)`
  display: flex;
  text-decoration: none;
  color: ${colors.Content.Interface.DarkSecondary};
  width: 100%;
`;

export const BusinessConsultationStyle = styled.div`
  padding: ${spacings.sm};
  flex: 1;
`;

export const BusinessConsultationsItemStatusStyle = styled(BodyXSCondensed)`
  color: ${colors.Content.Interface.DarkSecondary};
  text-transform: uppercase;
  margin-bottom: ${spacings.xs};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

const BusinessConsultationsLinkStyle = `
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
  color: ${colors.Content.Interface.DarkSecondary};
  &:hover,
  &:focus {
    color: ${colors.Content.Interface.DarkSecondary};
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
  margin-right: ${spacings.s};
`;

export const BusinessConsultationsItemStyle = styled.li<{
  backgroundColor: string;
}>`
  display: flex;
  border-radius: ${intToPx(BorderRadius)};
  background-color: ${props => props.backgroundColor || 'rgb(242, 242, 242)'};
  overflow: hidden;
  margin: 0 0 ${intToPx(DefaultPadding.Mobile)};
`;
