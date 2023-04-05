import { typography } from '@make.org/designsystem/tokens/typography';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const MobileAboutStyle = styled.section`
  display: flex;
  flex-flow: column;
  padding: 40px ${spacings.m} ${spacings.s};
  background-color: ${colors.Background.Interface.Lighter};
`;

export const FeaturedProposalItemStyle = styled.li`
  display: flex;
  flex-flow: column;
  padding-top: ${spacings.l};
  padding-bottom: ${spacings.xs};
  justify-content: space-between;
  width: 100%;
`;

export const ProposalContentStyle = styled(Link)`
  width: 100%;
  border-radius: 8px;
  border: solid 1px ${colors.Border.Interface.DarkMain};
  color: ${colors.Content.Interface.DarkSecondary};
  padding: ${spacings.m};
  margin-top: ${spacings.m};
  letter-spacing: 0.14px;
  line-height: 1.5;
  font-size: ${typography.FontSize.Arrondissement};
  text-decoration: none;
`;

export const ExploreLinkStyle = styled(Link)`
  margin-top: ${spacings.m};
`;
