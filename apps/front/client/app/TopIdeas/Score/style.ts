import styled from 'styled-components';
import { typography } from 'athena-design-tokens';
import { colors } from '@make.org/designsystem/tokens/colors';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Elements } from '@make.org/assets/vars/Elements';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { TitleXXS } from '@make.org/designsystem/components/Titles';

export const ScoringContentStyle = styled.div`
  background-color: ${colors.Background.Interface.DarkSecondary};
  padding: 20px;
  margin: 0 0 20px 0;
  width: 100%;
  border-radius: ${intToPx(Elements.BorderRadius)};
  &:nth-child(1) {
    margin-left: 0;
  }

  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 0 0 0 20px;
  }
`;

export const ScoringTextContainerStyle = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const ScoringTextStyle = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 10px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex-direction: column;
    align-items: initial;
  }
`;

export const ScoringPercentageStyle = styled(TitleXXS).attrs({ as: 'span' })`
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-bottom: 5px;
  }
`;

export const ScoringPercentageTextStyle = styled.span`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  margin-left: 5px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin-left: 0;
  }
`;
