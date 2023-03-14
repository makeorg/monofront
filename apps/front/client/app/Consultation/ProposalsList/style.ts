import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { Link } from 'react-router-dom';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { MiddleColumnStyle } from '@make.org/ui/elements/FlexElements';
import { BorderRadius } from '@make.org/ui/elements/CardsElements';

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
  background-color: ${colors.Background.Interface.Lighter};
  border-radius: ${intToPx(BorderRadius)};
  padding: 45px 20px 20px;
  min-height: 300px;
`;

export const ProposalAndVoteWrapperStyle = styled(MiddleColumnStyle)`
  flex: 1;
  width: 100%;
`;

export const ProposalLinkStyle = styled(Link)`
  font-size: ${typography.FontSize.Arrondissement};
  letter-spacing: 0.13px;
  text-align: center;
  margin-bottom: 15px;
  text-decoration: none;
  color: ${colors.Content.Interface.Dark};
`;

export const ProposalDateStyle = styled.time`
  font-size: ${typography.FontSize.RueDeLappe};
  color: ${colors.Content.Interface.DarkSecondary};
  letter-spacing: 0.13px;
  text-align: center;
`;
