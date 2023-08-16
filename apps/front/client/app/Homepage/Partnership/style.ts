import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
import { ColumnElementStyle } from '@make.org/ui/elements/FlexElements';
import { ContainerWithPadding } from '@make.org/ui/elements/MainElements';
import styled from 'styled-components';
import { intToPx } from '@make.org/utils/helpers/styled';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { LinkAsRedButton } from '@make.org/ui/elements/LinkElements';
import { TitleLStyle } from '@make.org/designsystem/components/Typography/Titles/style';
import { TextMStyle } from '@make.org/designsystem/components/Typography/Text/style';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const PartnershipSectionStyle = styled(ColumnElementStyle)`
  width: 100%;
  background-color: ${colors.Content.Make.Primary};
`;

export const PartnershipInnerStyle = styled.div`
  ${ContainerWithPadding}
  padding-top: 40px;
  padding-bottom: 40px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding-top: ${spacings.xl};
    padding-bottom: ${spacings.xl};
  }
`;

export const PartnershipSubtitleStyle = styled(TextMStyle).attrs({
  as: 'span',
})`
  text-transform: uppercase;
  color: ${colors.Content.Interface.Light};
  opacity: 0.65;
  margin-bottom: ${spacings.xs};
`;

export const PartnershipTitleStyle = styled(TitleLStyle)`
  letter-spacing: 0.5px;
  color: ${colors.Content.Interface.Light};
  margin-bottom: ${spacings.sm};
  text-transform: none;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Earth};
    margin-bottom: ${spacings.s};
  }
`;

export const PartnershipParagraphStyle = styled(TextMStyle)`
  letter-spacing: 0.12px;
  color: ${colors.Content.Interface.Light};
  margin-bottom: ${spacings.l};
`;

export const PartnershipRedButton = styled(LinkAsRedButton)`
  font-size: ${typography.FontSize.Arrondissement};
  fill: ${colors.Content.Interface.Light};
`;
