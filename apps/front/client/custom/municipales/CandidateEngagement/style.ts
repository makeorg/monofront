import styled from 'styled-components';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { color } from 'athena-design-tokens';
import { SeparatorStyle } from '@make.org/ui/elements/SeparatorsElements';
import { FourthLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { RedLinkRouterStyle } from '@make.org/ui/elements/LinkElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';

export const CandidateWrapperStyle = styled.div`
  background-color: ${color.white};
  padding: 15px 0;
`;

export const CandidateHeadingStyle = styled.div`
  padding: 15px;
`;

export const CandidateSeparatorStyle = styled(SeparatorStyle)`
  margin-top: 7.5px;
`;

export const CandidateTitleStyle = styled(FourthLevelTitleStyle)`
  width: 175px;
`;

export const CandidateListItemStyle = styled.li<{
  paddingLeft?: number | string;
}>`
  display: flex;
  align-items: center;
  padding-left: ${props => (props.paddingLeft ? props.paddingLeft : '25px')};
  padding-right: 25px;
  box-sizing: content-box;
`;

export const CandidateInformationsStyle = styled(ColumnElementStyle)`
  align-items: center;
  justify-content: center;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    align-items: flex-start;
  }
`;

export const CandidateLinkStyle = styled(RedLinkRouterStyle)`
  white-space: nowrap;
`;

export const PoliticalPartyStyle = styled(ParagraphStyle)`
  white-space: nowrap;
`;
