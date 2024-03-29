import styled from 'styled-components';
import { LinkAsRedButton } from '@make.org/ui/elements/LinkElements';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const ParticipateButtonStyle = styled(LinkAsRedButton)`
  margin: ${spacings.s} 0 ${spacings.sm};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: ${spacings.m} 0;
  }
`;

export const PartnersListStyle = styled(UnstyledListStyle)`
  margin: ${spacings.s} 0 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: ${spacings.s} ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const AvatarWrapperStyle = styled.li`
  position: relative;
  z-index: 1;
`;
