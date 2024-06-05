import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { SvgCheckedSymbol } from '@make.org/ui/Svg/elements';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const AuthorWrapperStyle = styled.div`
  width: 100%;
  padding-bottom: ${spacings.s};
  border-bottom: 1px solid ${colors.Border.Interface.DarkSecondary};
`;

export const AuthorContainerStyle = styled.div`
  display: flex;
  width: auto;
`;

export const AuthorDescriptionStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AuthorReportButton = styled.div`
  display: flex;
  width: 40px;
`;

export const AuthorInfosStyle = styled(ParagraphStyle)`
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  font-size: ${typography.FontSize.RueDeLappe};
  line-height: normal;
  color: ${colors.Content.Interface.DarkSecondary};
  font-style: normal;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const ProposalStatusStyle = styled.span`
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.Light};
  padding: ${spacings.xs} ${spacings.s};
  &.status-accepted {
    background-color: ${colors.Background.Alert.Positive};
  }
  &.status-refused {
    background-color: ${colors.Background.Alert.DarkError};
  }
  &.status-postponed,
  &.status-pending {
    background-color: ${colors.Background.Interface.DarkSecondary};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const CertifiedIconStyle = styled(SvgCheckedSymbol)`
  margin-left: ${spacings.xs};
  .tofill {
    fill: rgb(74, 144, 226);
  }
`;
