import { typography, color } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { Elements } from '@make.org/assets/vars/Elements';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { Link } from 'react-router-dom';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';

export const ProposalsListStyle = styled(UnstyledListStyle)`
  width: 100%;
  display: flex;
  flex-flow: column;
  margin: 45px 0;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 30px;
  }
`;

export const ProposalListItemStyle = styled.li`
  margin-bottom: 40px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-bottom: 10px;
  }
`;

export const ProposalCardStyle = styled.article`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  background-color: ${color.white};
  border-radius: ${intToPx(Elements.BorderRadius)};
  padding: 45px 25px 15px;
`;

export const ProposalLinkStyle = styled(Link)`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  letter-spacing: 0.13px;
  text-align: center;
  margin-top: 10px;
  text-decoration: none;
  color: ${color.black};
`;

export const ProposalDateStyle = styled.time`
  font-size: ${intToPx(typography.font.fontsize.X2S.value)};
  color: ${color.greyDark};
  letter-spacing: 0.13px;
  text-align: center;
  margin-top: 25px;
`;
