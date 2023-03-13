import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Elements } from '@make.org/assets/vars/Elements';
import { colors } from '@make.org/designsystem/tokens/colors';

export const PopularProposalHeader = styled.div`
  font-family: ${typography.FontFamily.Default};
  color: ${colors.Content.Interface.Dark};
  background-color: ${colors.Background.Interface.DarkSecondary};
  margin-bottom: 20px;
  padding: 5px 10px;
  border-radius: ${intToPx(Elements.BorderRadius)};
`;
