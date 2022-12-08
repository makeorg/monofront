import styled from 'styled-components';
import { color } from 'athena-design-tokens';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { MakeFonts } from '@make.org/assets/vars/Fonts';

export const ProposalFooterStyle = styled.div`
  width: 100%;
  display: inline-block;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid ${color.greyLighter};
`;

export const ProposalFooterTagListStyle = styled(UnstyledListStyle)`
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid ${color.greyLighter};
`;

export const ProposalFooterTagListItemStyle = styled(ParagraphStyle)`
  display: inline-flex;
  margin-right: 20px;
  font-family: ${MakeFonts.CircularStandardBold};
  font-weight: bold;
  span::first-letter {
    text-transform: uppercase;
  }
`;

export const PostedInLabelStyle = styled(ParagraphStyle)`
  margin-right: 5px;
`;
