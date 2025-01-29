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
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { IDS } from '@make.org/types/enums';

export const PartnershipBannerStyle = styled(ColumnElementStyle)`
  width: 100%;
  background-color: #121212;
  border-radius: 24px 24px 0 0;
`;

export const PartnershipBannerInnerStyle = styled.div`
  ${ContainerWithPadding}
  padding-top: 40px;
  padding-bottom: 40px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding-top: ${spacings.xl};
    padding-bottom: ${spacings.xl};
  }
`;

export const PartnershipBannerSubtitleStyle = styled(TextMStyle).attrs({
  as: 'span',
})`
  text-transform: uppercase;
  color: ${colors.Content.Interface.Light};
  opacity: 0.65;
  margin-bottom: ${spacings.xs};
`;

export const PartnershipBannerTitleStyle = styled(TitleLStyle)`
  font-family: ${typography.FontFamily.Marketing};
  letter-spacing: 0.5px;
  color: ${colors.Content.Interface.Light};
  margin-bottom: ${spacings.sm};
  text-transform: none;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Earth};
    margin-bottom: ${spacings.s};
  }
`;

export const PartnershipBannerParagraphStyle = styled(TextMStyle)`
  letter-spacing: 0.12px;
  color: ${colors.Content.Interface.Light};
  margin-bottom: ${spacings.l};
`;

export const PartnershipBannerRedButton = styled(LinkAsRedButton)`
  font-size: ${typography.FontSize.Arrondissement};
  fill: ${colors.Content.Interface.Light};
`;

export const PartnershipSectionStyle = styled.section`
  display: grid;
  grid-template-areas:
    'desc'
    'labels'
    'images';
  grid-template-columns: repeat(1, 1fr);
  ${ContainerWithPadding};
  padding: ${spacings.m};
  margin-bottom: ${spacings.xl};
  border-radius: 16px;
  scroll-margin-top: ${spacings.l};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    grid-template-areas:
      'desc images'
      'labels labels';
    grid-template-columns: 580px 1fr;
    grid-gap: 0 ${spacings.m};
    padding: ${spacings.xl};
    margin-bottom: ${spacings.xxl};
    scroll-margin-top: ${spacings.xl};
  }
  &#${IDS.PUBLIC} {
    background: #fafaff;
    .main-title {
      background: linear-gradient(93deg, #000 -11.06%, #7d7de1 77.38%);
      color: transparent;
      background-clip: text;
    }
    .label {
      background: #642ddc;
      color: ${colors.Content.Interface.Light};
    }
  }
  &#${IDS.BUSINESS} {
    background: #fbfafa;
    .main-title {
      background: linear-gradient(88deg, #dbf6e9 -4.44%, #000 74.01%);
      color: transparent;
      background-clip: text;
    }
    .label {
      background: #cff9e5;
    }
  }
  &#${IDS.RESEARCH} {
    background: #fcf9ff;
    .main-title {
      background: linear-gradient(300deg, #cfa8ff 24.34%, #000 90.13%);
      color: transparent;
      background-clip: text;
    }
    .label {
      background: #cfa8ff;
    }
  }
`;

export const PartnershipSectionTitleStyle = styled.h2`
  grid-area: desc;
  font-family: ${typography.FontFamily.Marketing};
  font-size: ${typography.FontSize.Earth};
  text-transform: none;
  letter-spacing: 0.5px;
  margin-bottom: ${spacings.l};
  .subtitle {
    display: flex;
    font-family: ${typography.FontFamily.Highlight};
    font-size: ${typography.FontSize.Bastille};
    text-transform: uppercase;
    margin-bottom: ${spacings.s};
  }
`;

export const PartnershipSectionParagraphStyle = styled(TextMStyle)`
  grid-area: desc;
  color: ${colors.Content.Interface.DarkSecondary};
  margin-bottom: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-bottom: ${spacings.l};
  }
`;

export const PartnershipSectionLabelWrapperStyle = styled.div`
  display: grid;
  grid-area: labels;
  justify-items: self-start;
`;

export const PartnershipSectionLabelStyle = styled.span`
  text-transform: uppercase;
  font-family: ${typography.FontFamily.Highlight};
  color: ${colors.Content.Interface.DarkSecondary};
  padding: ${spacings.xs} ${spacings.s};
  border-radius: 4px;
`;

export const PartnershipSectionListStyle = styled(UnstyledListStyle)`
  margin: ${spacings.s} 0 ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    display: inline-flex;
  }
`;

export const PartnershipSectionListItemStyle = styled.li`
  color: ${colors.Content.Interface.DarkSecondary};
  font-size: ${typography.FontSize.PetiteCouronne};
  margin-right: ${spacings.m};
  &:before {
    content: '✦';
    margin-right: ${spacings.xs};
  }
`;

export const PartnershipImagesListStyle = styled(UnstyledListStyle)`
  grid-area: images;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 1fr;
  grid-gap: ${spacings.m};
  align-items: center;
  justify-items: center;
  margin-top: ${spacings.xl};
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    border-radius: 9px;
    background: linear-gradient(180deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-top: 0;
  }
`;
