import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import { ProposalCardStyle } from '@make.org/ui/elements/ProposalCardElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Elements } from '@make.org/assets/vars/Elements';

export const PopularProposalWrapperStyle = styled(ProposalCardStyle)`
  overflow: hidden;
  width: 100%;
  height: 100%;
  justify-content: flex-start;
  margin-bottom: 20px;
  border-radius: ${intToPx(Elements.BorderRadius)};
`;

export const PopularProposalHeader = styled.div`
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.black};
  background-color: ${color.greyLighter};
  margin-bottom: 20px;
  padding: 5px 10px;
  border-radius: ${intToPx(Elements.BorderRadius)};
`;

export const PopularProposalTagStyle = styled.div`
  padding-top: 15px;
  border-top: 1px solid ${color.greyLighter};
  font-family: ${MakeFonts.CircularStandardBold};
  &::first-letter {
    text-transform: uppercase;
  }
`;
