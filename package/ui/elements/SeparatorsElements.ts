import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { color, typography } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { MiddleRowStyle } from './FlexElements';

export const SeparatorStyle = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${color.grey};
`;

export const ProposalSubmitAuthSeparator = styled(SeparatorStyle)`
  max-width: 120px;
`;

export const SmallSeparatorStyle = styled(SeparatorStyle)`
  max-width: 60px;
`;

export const SmallSeparatorWithMarginStyle = styled(SmallSeparatorStyle)`
  margin: 5px 0 15px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 20px 0 30px;
  }
`;

export const SeparatorWrapperStyle = styled(MiddleRowStyle)`
  width: 100%;
  &.margin-top {
    margin-top: 30px;
  }
  &.margin-bottom {
    margin-bottom: 15px;
  }
`;

export const SeparatorProposalAuthLogin = styled(SeparatorWrapperStyle)`
  margin-bottom: 15px;
`;

export const TextSeparatorStyle = styled(MiddleRowStyle)`
  width: 60px;
  line-height: 24px;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
`;

export const ContentSeparatorStyle = styled(SeparatorStyle)`
  margin: 10px 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 15px 0;
  }
`;

export const TileSeparatorStyle = styled(SeparatorStyle)`
  margin: 8px 0 16px;
`;

export const SidebarSeparatorStyle = styled(SeparatorStyle)`
  margin: 10px 0;
`;

export const FilterSeparationLineStyle = styled(SeparatorStyle)`
  background-color: ${color.grey};
  margin: 20px 0;
`;
