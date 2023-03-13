import { typography } from '@make.org/designsystem/tokens/typography';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '@make.org/designsystem/tokens/colors';

export const MobileAboutStyle = styled.section`
  display: flex;
  flex-flow: column;
  padding: 40px 20px 10px;
  background-color: ${colors.Background.Interface.Lighter};
`;

export const FeaturedProposalItemStyle = styled.li`
  display: flex;
  flex-flow: column;
  padding-top: 25px;
  padding-bottom: 5px;
  justify-content: space-between;
  width: 100%;
`;

export const ProposalContentStyle = styled(Link)`
  width: 100%;
  border-radius: 8px;
  border: solid 1px ${colors.Border.Interface.DarkMain};
  color: ${colors.Content.Interface.DarkSecondary};
  padding: 15px;
  margin-top: 20px;
  letter-spacing: 0.14px;
  line-height: 1.5;
  font-size: ${typography.FontSize.Arrondissement};
  text-decoration: none;
`;

export const ExploreLinkStyle = styled(Link)`
  margin-top: 20px;
`;
