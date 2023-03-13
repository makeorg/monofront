import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
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
  background-color: ${colors.Content.Make.Primary};
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
  color: ${colors.Content.Interface.Light};
  opacity: 0.65;
  margin-bottom: 5px;
`;

export const PartnershipTitleStyle = styled(TitleL)`
  letter-spacing: 0.5px;
  color: ${colors.Content.Interface.Light};
  margin-bottom: 15px;
  text-transform: none;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Earth};
    margin-bottom: 10px;
  }
`;

export const PartnershipParagraphStyle = styled(BodyMDefault)`
  letter-spacing: 0.12px;
  color: ${colors.Content.Interface.Light};
  margin-bottom: 30px;
`;

export const PartnershipRedButton = styled(LinkAsRedButton)`
  font-size: ${typography.FontSize.Arrondissement};
  fill: ${colors.Content.Interface.Light};
`;
