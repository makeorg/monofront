import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Elements } from '@make.org/assets/vars/Elements';

export const PopularProposalHeader = styled.div`
  font-family: ${MakeFonts.CircularStandardBook};
  color: ${color.black};
  background-color: ${color.greyLighter};
  margin-bottom: 20px;
  padding: 5px 10px;
  border-radius: ${intToPx(Elements.BorderRadius)};
`;
