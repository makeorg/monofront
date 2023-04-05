import styled from 'styled-components';
import { colors } from '@make.org/designsystem/tokens/colors';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { typography } from '@make.org/designsystem/tokens/typography';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { BorderRadius } from '@make.org/ui/elements/CardsElements';
import { SvgLightning } from '@make.org/ui/Svg/elements';
import { AvatarStyle } from '@make.org/ui/components/Avatar/style';
import { BodyMDefault } from '@make.org/designsystem/components/Body';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const ResultsProposalsListStyle = styled(UnstyledListStyle)`
  width: 100%;
  grid-gap: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: ${spacings.l};
  }
`;

export const ResultsProposalListItemStyle = styled.li`
  display: flex;
  flex-flow: column;
  flex: 1;
  justify-content: space-between;
  align-content: space-between;
  padding: 0px ${spacings.sm} ${spacings.m};
  margin-bottom: ${spacings.m};
  background-color: ${colors.Background.Interface.Lighter};
  border-radius: ${intToPx(BorderRadius)};
  border: solid 1px ${colors.Border.Interface.DarkMain};
  &:last-child {
    margin-bottom: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 0px ${spacings.m} ${spacings.m};
    margin-bottom: 0px;
  }
`;

export const ResultsProposalAuthorWrapperStyle = styled(BodyMDefault).attrs({
  as: 'div',
})`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  text-align: center;
  align-items: center;
  color: ${colors.Content.Interface.DarkSecondary};
  letter-spacing: 0.12px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    letter-spacing: 0.14px;
  }
`;

export const ResultsProposalContentStyle = styled(BodyMDefault)`
  letter-spacing: 0.11px;
  text-align: center;
  color: ${colors.Content.Interface.Dark};
  padding: ${spacings.s} 0px ${spacings.sm};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    letter-spacing: 0.13px;
  }
`;

export const ResultsStyle = styled(ResultsProposalContentStyle)`
  letter-spacing: 0.11px;
  text-align: center;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    letter-spacing: 0.14px;
  }
`;

export const ResultsAvatarStyle = styled(AvatarStyle)`
  position: relative;
  top: -${spacings.s};
  left: ${spacings.m};
`;

const ResultsItemStyle = styled.span`
  font-family: ${typography.FontFamily.Hightlight};
  font-weight: bold;
`;

export const ResultsLikeItStyle = styled(ResultsItemStyle)`
  color: ${colors.Content.Alert.Positive};
`;

export const ResultsNoWayStyle = styled(ResultsItemStyle)`
  color: ${colors.Content.Alert.Disagree};
`;

export const ResultsLightningIconStyle = styled(SvgLightning)`
  width: 8px;
  height: 14px;
  margin: 0 ${spacings.xs} 0;
  margin: 0px ${spacings.s};
  fill: #f7b500;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    width: 11px;
    height: 17px;
  }
`;
