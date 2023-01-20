import { SequenceTitleStyle } from '@make.org/components/Sequence/style';
import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';
import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { SequenceParagraphStyle } from '@make.org/components/Sequence/Cards/style';
import { SvgSmallLogo } from '@make.org/ui/Svg/elements/SmallLogo';

export const MaintenancePageStyle = styled.div`
  ${ContainerWithPadding}
  width: 100%;
  min-height: 295px;
  max-height: 295px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  h2 {
    align-self: center;
  }
`;

export const MaintenanceImageStyle = styled.img`
  width: 300px;
  margin: 130px auto 40px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin: 35px auto 20px;
  }
`;
export const MaintenanceTitleStyle = styled(SequenceTitleStyle)`
  margin-bottom: 20px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: 10px;
  }
`;

export const MakeSvgSmallLogo = styled(SvgSmallLogo)`
  margin: 20px;
`;

export const MaintenanceParagraphStyle = styled(SequenceParagraphStyle)`
  margin-bottom: 30px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: 20px;
  }
`;
