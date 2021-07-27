import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { ShadowColors } from '@make.org/assets/vars/Colors';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Elements } from '@make.org/assets/vars/Elements';
import { Breakpoints, DefaultPadding } from '@make.org/assets/vars/Breakpoints';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import {
  ProfileAvatarStyle,
  ProfilePageSidebarStyle,
} from '@make.org/ui/elements/ProfileElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { SvgAngleArrowRight } from '@make.org/ui/Svg/elements';
import { Link } from 'react-router-dom';

export const SearchSidebarTileStyle = styled.div<{
  image: string;
}>`
  width: 100%;
  background-image: url(${props => props.image});
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
  background-color: ${color.white};
  border-radius: ${intToPx(Elements.BorderRadius)};
  box-shadow: 0 1px 1px 0 ${ShadowColors.BlackZeroFiveOpacity};
  padding: 20px;
`;

export const SearchResultsConsultationListStyle = styled(UnstyledListStyle)`
  @media (max-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 0 20px;
  }
`;

export const SearchOrganisationsListStyle = styled(UnstyledListStyle)`
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 15px 30px;
  }
  @media (max-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0 20px;
  }
`;

export const SearchOrganisationsListItemStyle = styled.li`
  padding-top: 40px;
  margin-bottom: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding-top: 20px;
    margin-bottom: 0;
  }
`;

export const SearchOrganisationItemStyle = styled(ProfilePageSidebarStyle)`
  text-decoration: none;
  &.mobile-radius {
    border-radius: ${intToPx(Elements.BorderRadius)};
  }
`;

export const SearchOrganisationAvatarStyle = styled(ProfileAvatarStyle)`
  margin-bottom: 10px;
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

export const BusinessConsultationsItemWrapperStyle = styled(ParagraphStyle)`
  display: flex;
  text-decoration: none;
  font-family: ${MakeFonts.CircularStandardBold};
  width: 100%;
`;

export const BusinessConsultationStyle = styled.div`
  padding: 15px;
  flex: 1;
`;

export const BusinessConsultationsItemStatusStyle = styled.p`
  font-family: ${MakeFonts.TradeGothicBoldCondensed};
  color: ${color.greyDark};
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  text-transform: uppercase;
  margin-bottom: 4px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const BusinessConsultationsItemLinkStyle = styled(Link)`
  font-family: ${MakeFonts.CircularStandardBold};
  color: ${color.greyDark};
  &:hover,
  &:focus {
    color: ${color.greyDark};
  }
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
