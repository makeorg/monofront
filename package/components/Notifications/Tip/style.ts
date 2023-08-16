import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { TextSStyle } from '@make.org/designsystem/components/Typography/Text/style';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const TipWrapperStyle = styled(TextSStyle).attrs({ as: 'div' })`
  position: relative;
  background-color: ${colors.Background.Alert.Infos};
  color: ${colors.Content.Interface.Light};
  padding: 6px ${spacings.s};
  border-radius: 2px;
  letter-spacing: 0.14px;
`;

export const TriangleDownStyle = styled.div`
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 9px 6px 0 6px;
  border-color: ${colors.Border.Alert.Infos} transparent transparent transparent;
  margin-bottom: ${spacings.xs};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: ${spacings.s};
  }
`;
