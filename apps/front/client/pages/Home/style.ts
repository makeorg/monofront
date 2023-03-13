import styled from 'styled-components';
import { typography } from '@make.org/designsystem/tokens/typography';
import { pxToRem, intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import {
  MiddleColumnStyle,
  ColumnElementStyle,
} from '@make.org/ui/elements/FlexElements';
import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';
import { TitleL } from '@make.org/designsystem/components/Titles';
import { colors } from '@make.org/designsystem/tokens/colors';

export const HomepageWrapperStyle = styled(MiddleColumnStyle)`
  width: 100%;
  height: 100%;
  min-height: 100%;
`;

export const HomepagePageInnerStyle = styled.div`
  ${ContainerWithPadding}
`;

export const HomepageSectionStyle = styled(ColumnElementStyle)`
  width: 100%;
  margin-bottom: 100px;
  &:first-child {
    margin-top: 50px;
    @media (min-width: ${pxToRem(Breakpoints.Desktop)}) {
      margin-top: 100px;
    }
  }
  &:last-child {
    margin-bottom: 50px;
  }
`;

export const HomepageSectionTitleStyle = styled(TitleL)`
  color: ${colors.Content.Interface.Dark};
  margin-bottom: 30px;
  text-transform: none;
  &.with-container {
    ${ContainerWithPadding};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Earth};
  }
`;
