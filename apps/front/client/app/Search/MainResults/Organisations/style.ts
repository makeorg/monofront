import styled from 'styled-components';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import {
  ProfileAvatarStyle,
  ProfilePageSidebarStyle,
} from '@make.org/ui/elements/ProfileElements';
import { Elements } from '@make.org/assets/vars/Elements';

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
