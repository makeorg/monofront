import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { TextColors } from '@make.org/assets/vars/Colors';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { SvgCheckedSymbol } from '@make.org/ui/Svg/elements';

export const AuthorWrapperStyle = styled.div`
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 1px solid ${color.greyLighter};
`;

export const AuthorDescriptionStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AuthorInfosStyle = styled(ParagraphStyle)<{ isSequence: boolean }>`
  display: ${props => (props.isSequence ? 'flex' : 'inline-flex')};
  flex-direction: ${props => (props.isSequence ? 'column' : 'row')};
  height: ${props => (props.isSequence ? '30%' : '')};
  align-items: center;
  font-size: ${props => (props.isSequence ? '14px' : '12px')};
  line-height: normal;
  color: ${color.darkGrey};
  font-style: normal;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const InfosWrapperStyle = styled.span`
  display: 'inline-flex';
`;

export const ProposalStatusStyle = styled.span`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${color.white};
  padding: 5px 10px;
  &.status-accepted {
    background-color: ${color.success};
  }
  &.status-refused {
    background-color: ${color.error};
  }
  &.status-postponed,
  &.status-pending {
    background-color: ${color.greyLighter};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.XS.value)};
  }
`;

export const CertifiedIconStyle = styled(SvgCheckedSymbol)`
  margin-left: 5px;
  .tofill {
    fill: ${TextColors.Blue};
  }
`;
