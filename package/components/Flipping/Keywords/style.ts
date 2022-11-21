import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { color, typography } from 'athena-design-tokens';
import { MakeFonts } from '@make.org/assets/vars/Fonts';

export const KeywordsListWrapperStyle = styled.ul`
  display: flex;
  flex-flow: column;
  justify-content: space-between;
  align-content: normal;
  list-style: none;
  padding: 0px;
  height: 80%;
`;

export const KeywordListItemStyle = styled.li`
  display: flex;
  flex-flow: column;
  text-decoration: none;
  justify-content: space-between;
  flex: 1 1 auto;
  border-top: solid 2px ${color.greyLighter};
`;

export const KeywordItemLinkStyle = styled(Link)`
  display: inline-flex;
  align-items: center;
  letter-spacing: 0.14px;
  line-height: 1.5;
  font-family: ${MakeFonts.CircularStandardBold};
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  text-decoration: none;
  max-width: 80%;
  margin: 25px 0px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: auto 0px;
  }
`;
