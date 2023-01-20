import { color, typography } from 'athena-design-tokens';
import { Link } from 'react-router-dom';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';

export const MobileAboutStyle = styled.section`
  display: flex;
  flex-flow: column;
  padding: 40px 20px 10px;
  background-color: ${color.white};
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
  border: solid 1px ${color.grey};
  color: ${color.greyDark};
  padding: 15px;
  margin-top: 20px;
  letter-spacing: 0.14px;
  line-height: 1.5;
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  text-decoration: none;
`;

export const ExploreLinkStyle = styled(Link)`
  margin-top: 20px;
`;
