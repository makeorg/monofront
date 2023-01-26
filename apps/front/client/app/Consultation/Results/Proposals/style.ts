import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { Elements } from '@make.org/assets/vars/Elements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { SvgLightning } from '@make.org/ui/Svg/elements';
import { AvatarStyle } from '@make.org/ui/components/Avatar/style';
import { BodyMDefault } from '@make.org/designsystem/components/Body';

export const ResultsProposalsListStyle = styled(UnstyledListStyle)`
  width: 100%;
  grid-gap: 20px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
  }
`;

export const ResultsProposalListItemStyle = styled.li`
  display: flex;
  flex-flow: column;
  flex: 1;
  justify-content: space-between;
  align-content: space-between;
  padding: 0px 15px 20px;
  margin-bottom: 20px;
  background-color: ${color.white};
  border-radius: ${intToPx(Elements.BorderRadius)};
  border: solid 1px ${color.grey};
  &:last-child {
    margin-bottom: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 0px 20px 20px;
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
  color: ${color.greyDark};
  letter-spacing: 0.12px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    letter-spacing: 0.14px;
  }
`;

export const ResultsProposalContentStyle = styled(BodyMDefault)`
  letter-spacing: 0.11px;
  text-align: center;
  color: ${color.black};
  padding: 10px 0px 15px;
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
  top: -10px;
  left: 20px;
`;

const ResultsItemStyle = styled.span`
  font-family: ${MakeFonts.CircularStandardBold};
  font-weight: bold;
`;

export const ResultsLikeItStyle = styled(ResultsItemStyle)`
  color: ${color.agree};
`;

export const ResultsNoWayStyle = styled(ResultsItemStyle)`
  color: ${color.disagree};
`;

export const ResultsLightningIconStyle = styled(SvgLightning)`
  width: 8px;
  height: 14px;
  margin: 0 5px 0;
  margin: 0px 10px;
  fill: #f7b500;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    width: 11px;
    height: 17px;
  }
`;
