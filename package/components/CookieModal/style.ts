import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { typography } from '@make.org/designsystem/tokens/typography';
import { FlexElementStyle } from '@make.org/ui/elements/FlexElements';
import {
  RedButtonStyle,
  UnstyledButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { SvgCookie } from '@make.org/ui/Svg/elements';
import { TitleXXSStyle } from '@make.org/designsystem/components/Typography/Titles/style';
import { TextMStyle } from '@make.org/designsystem/components/Typography/Text/style';
import { colors } from '@make.org/designsystem/tokens/colors';
import { spacings } from '@make.org/designsystem/tokens/spacings';

export const CookieModalContentStyle = styled.div`
  display: flex;
  flex-flow: column;
  align-items: start;
  justify-content: space-between;
  width: 335px;
  max-height: 440px;
  padding: ${spacings.m} ${spacings.m} 76px;
  overflow-y: auto;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    width: 800px;
    max-height: 530px;
    padding: ${spacings.l} ${spacings.l} 81px;
  }
`;

export const CookieModalTitleWrapperStyle = styled(FlexElementStyle)`
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    flex-direction: row-reverse;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

export const CookieModalButtonWithLinkStyle = styled(UnstyledButtonStyle)`
  display: flex;
  flex-direction: row-reverse;
  font-family: ${typography.FontFamily.Default};
  font-size: ${typography.FontSize.Arrondissement};
  color: ${colors.Content.Interface.DarkSecondary};
  text-decoration: underline;
  &.with-margin-bottom {
    margin-bottom: ${spacings.l};
  }
`;

export const CookieModalTitleStyle = styled(TitleXXSStyle).attrs({
  as: 'h2',
})`
  text-transform: none;
  letter-spacing: 0.12px;
  margin-bottom: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    max-width: 60%;
    margin-bottom: ${spacings.l};
  }
`;

export const CookieModalParagraphStyle = styled(TextMStyle)`
  padding-bottom: ${spacings.l};
`;

export const CookieModalSectionWrapperStyle = styled.ul`
  display: flex;
  flex-flow: column;
  padding: 0px;
  margin-bottom: ${spacings.l};
`;

export const CookieModalSectionTitleStyle = styled(CookieModalTitleStyle)`
  text-transform: none;
  letter-spacing: normal;
  margin-bottom: ${spacings.sm};
`;

export const CookieModalBannerWrapperStyle = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  background-color: #f3f3f3;
  bottom: 0;
  width: 100%;
  border-radius: 0px;
  left: 0;
  z-index: 5;
  padding: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: ${spacings.m} ${spacings.l};
  }
`;

export const CookieModalElementStyle = styled(TextMStyle).attrs({
  as: 'li',
})`
  display: flex;
  flex-flow: row;
  margin-bottom: ${spacings.s};
  strong {
    font-family: ${typography.FontFamily.Highlight};
    font-weight: bold;
  }
  &.with-separator {
    border-bottom: 1px solid ${colors.Border.Interface.DarkMain};
    padding-bottom: ${spacings.m};
    margin-bottom: ${spacings.m};
  }
`;

export const CookieSVGStyle = {
  minWidth: '16px',
  marginTop: '6px',
  marginRight: '16px',
};

export const CookieModalRedButtonStyle = styled(RedButtonStyle)`
  margin-left: ${spacings.sm};
`;

export const SvgCookieStyle = styled(SvgCookie)`
  position: absolute;
  left: -17px;
  top: ${spacings.m};
  width: 67px;
  height: 65px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    width: 108px;
    height: 104px;
    top: ${spacings.sm};
    left: -21px;
  }
`;

export const CookieModalHeaderWrapperStyle = styled(FlexElementStyle)`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: flex-start;
`;

export const CookieModalCookieDetailParagraphStyle = styled(FlexElementStyle)`
  flex-direction: column;
  font-family: ${typography.FontFamily.Default};
  font-size: ${typography.FontSize.RueDeLappe};
  border-top: 1px solid ${colors.Border.Interface.DarkMain};
  margin-top: ${spacings.s};
  padding-top: ${spacings.s};
  &.cookie-page {
    font-size: ${typography.FontSize.Arrondissement};
    margin-top: ${spacings.m};
    padding-top: ${spacings.m};
  }
  &.block {
    display: block;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    align-items: center;
  }
`;

export const CookieModalElementSwitchWrapperStyle = styled.div`
  width: 100%;
`;

export const CookieSwitchWrapperStyle = styled(FlexElementStyle)`
  justify-content: flex-end;
  margin: ${spacings.xs} 0;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin: 0 0 0 20px;
  }
`;

export const CookieModalBackButtonStyle = styled(UnstyledButtonStyle)`
  background-color: ${colors.Background.Interface.DarkMain};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  svg {
    margin: ${spacings.xs} ${spacings.sm};
  }
`;

export const CookieSectionWrapperStyle = styled(FlexElementStyle)`
  flex-direction: column;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const CookieDescriptionStyle = styled.span`
  flex: 1;
`;

export const CookieLabelStyle = styled.span`
  font-size: ${typography.FontSize.Arrondissement};
  margin-top: ${spacings.s};
  align-self: flex-end;
  &.cookie-page {
    margin-top: ${spacings.m};
    white-space: nowrap;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin-top: 0;
    margin-left: ${spacings.m};
    align-self: flex-start;
    &.cookie-page {
      margin-top: 0;
      min-width: 150px;
      text-align: right;
    }
  }
`;
