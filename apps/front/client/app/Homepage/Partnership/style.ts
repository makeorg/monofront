import { color, typography } from 'athena-design-tokens';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';
import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { LinkAsRedButton } from '@make.org/ui/elements/LinkElements';
import { TitleL } from '@make.org/designsystem/components/Titles';
import {
  BodyMCondensed,
  BodyMDefault,
} from '@make.org/designsystem/components/Body';

export const PartnershipSectionStyle = styled(ColumnElementStyle)`
  width: 100%;
  background-color: ${color.brandPrimary};
`;

export const PartnershipInnerStyle = styled.div`
  ${ContainerWithPadding}
  padding-top: 40px;
  padding-bottom: 40px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding-top: 50px;
    padding-bottom: 50px;
  }
`;

export const PartnershipSubtitleStyle = styled(BodyMCondensed).attrs({
  as: 'span',
})`
  text-transform: uppercase;
  color: ${color.white};
  opacity: 0.65;
  margin-bottom: 5px;
`;

export const PartnershipTitleStyle = styled(TitleL)`
  letter-spacing: 0.5px;
  color: ${color.white};
  margin-bottom: 15px;
  text-transform: none;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${intToPx(typography.font.fontsize.X4L.value)};
    margin-bottom: 10px;
  }
`;

export const PartnershipParagraphStyle = styled(BodyMDefault)`
  letter-spacing: 0.12px;
  color: ${color.white};
  margin-bottom: 30px;
`;

export const PartnershipRedButton = styled(LinkAsRedButton)`
  font-size: ${intToPx(typography.font.fontsize.XS.value)};
  fill: ${color.white};
`;
