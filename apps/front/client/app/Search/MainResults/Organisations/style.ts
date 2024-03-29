import styled from 'styled-components';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import {
  ProfileAvatarStyle,
  ProfilePageSidebarStyle,
} from '@make.org/ui/elements/ProfileElements';
import { BorderRadius } from '@make.org/ui/elements/CardsElements';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const SearchOrganisationsListStyle = styled(UnstyledListStyle)`
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${spacings.sm} ${spacings.l};
  }
  @media (max-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: 0 ${spacings.m};
  }
`;

export const SearchOrganisationsListItemStyle = styled.li`
  padding-top: 40px;
  margin-bottom: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding-top: ${spacings.m};
    margin-bottom: 0;
  }
`;

export const SearchOrganisationItemStyle = styled(ProfilePageSidebarStyle)`
  text-decoration: none;
  &.mobile-radius {
    border-radius: ${intToPx(BorderRadius)};
  }
`;

export const SearchOrganisationAvatarStyle = styled(ProfileAvatarStyle)`
  margin-bottom: ${spacings.s};
`;
