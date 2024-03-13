import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
import { UnstyledButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { Image } from '@make.org/ui/components/Image';
import { ProposalExternalLinkStyle } from '@make.org/components/Proposal/Submit/style';
import { SvgSmallLogo } from '@make.org/ui/Svg/elements';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { TextXSStyle } from '@make.org/designsystem/components/Typography/Text/style';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const PanelContainer = styled.div`
  background-color: #f2f2f2;
  padding: ${spacings.sm} ${spacings.sm} ${spacings.xs};
  width: 100%;
  min-height: 125px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-between;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: ${spacings.m};
  }
`;

export const InnerPanelWrapperStyle = styled.div`
  margin-top: ${spacings.m};
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
  }
`;

export const MainTitleStyle = styled.h1`
  line-height: 20px;
  margin-bottom: ${spacings.sm};
`;

export const LogoStyle = styled(SvgSmallLogo)`
  width: 41px;
  height: 20px;
`;

export const ProposeButtonStyle = styled(UnstyledButtonStyle)`
  align-self: center;
  font-family: ${typography.FontFamily.Condensed};
  font-size: ${typography.FontSize.PetiteCouronne};
  color: ${colors.Content.Make.Secondary};
  text-transform: uppercase;
  text-decoration: underline;
  &:hover,
  &:focus {
    color: ${colors.Content.Make.Secondary};
  }
  svg {
    fill: ${colors.Content.Make.Secondary};
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    align-self: auto;
  }
`;

export const KindLabelWrapperStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: ${colors.Background.Interface.DarkSecondary};
  margin: ${spacings.sm} 0;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    margin: 0;
  }
`;

export const KindLabelTextStyle = styled(TextXSStyle).attrs({
  as: 'span',
})`
  padding: 8px;
  letter-spacing: 0.12px;
`;

export const KindLabelControversyIconStyle = styled(Image)`
  width: 20px;
  height: 24px;
  margin-left: 8px;
`;

export const KindLabelPopularIconStyle = styled(Image)`
  width: 24px;
  height: 24px;
  margin-left: 8px;
`;

export const HeaderLogoPrivacyContainerStyle = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const PolicyLinkStyle = styled(ProposalExternalLinkStyle)`
  font-size: ${typography.FontSize.Text.RueDeLappe};
`;
