import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { MiddleRowStyle } from './FlexElements';

export const SeparatorStyle = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.Background.Interface.DarkMain};
`;

export const ProposalSubmitAuthSeparator = styled(SeparatorStyle)`
  max-width: 120px;
`;

export const SmallSeparatorStyle = styled(SeparatorStyle)`
  max-width: 60px;
`;

export const SmallSeparatorWithMarginStyle = styled(SmallSeparatorStyle)`
  margin: ${spacings.xs} 0 ${spacings.sm};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: ${spacings.m} 0 ${spacings.l};
  }
`;

export const SeparatorWrapperStyle = styled(MiddleRowStyle)`
  width: 100%;
  &.margin-top {
    margin-top: ${spacings.l};
  }
  &.margin-bottom {
    margin-bottom: ${spacings.sm};
  }
`;

export const SeparatorProposalAuthLogin = styled(SeparatorWrapperStyle)`
  margin-bottom: ${spacings.sm};
`;

export const TextSeparatorStyle = styled(MiddleRowStyle)`
  width: 60px;
  line-height: 24px;
  font-size: ${typography.FontSize.Arrondissement};
`;

export const ContentSeparatorStyle = styled(SeparatorStyle)`
  margin: ${spacings.s} 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: ${spacings.sm} 0;
  }
`;

export const TileSeparatorStyle = styled(SeparatorStyle)`
  margin: 8px 0 16px;
`;

export const SidebarSeparatorStyle = styled(SeparatorStyle)`
  margin: ${spacings.s} 0;
`;

export const FilterSeparationLineStyle = styled(SeparatorStyle)`
  background-color: ${colors.Background.Interface.DarkMain};
  margin: ${spacings.sm} 0;
`;
