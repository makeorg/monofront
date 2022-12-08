import styled from 'styled-components';
import { color, typography } from 'athena-design-tokens';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { ShadowColors } from '@make.org/assets/vars/Colors';
import { MakeFonts } from '@make.org/assets/vars/Fonts';
import { Elements } from '@make.org/assets/vars/Elements';
import { ThirdLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { ColumnToRowElementStyle } from '@make.org/ui/elements/FlexElements';

export const ParticipateWrapperStyle = styled.div`
  background-color: ${props =>
    props.theme.secondaryColor ? props.theme.secondaryColor : color.white};
  text-decoration: none;
  padding: 20px 40px;
  box-shadow: 0 1px 1px 0 ${ShadowColors.BlackZeroFiveOpacity};
  margin-bottom: 20px;
  box-sizing: content-box;
  &:hover,
  &:focus {
    text-decoration: none;
  }
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    padding: 30px 60px;
  }
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    border-radius: ${intToPx(Elements.BorderRadius)};
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    padding: 30px 60px 30px 70px;
  }
`;

export const ParticipateInnerStyle = styled(ColumnToRowElementStyle)`
  align-items: center;
  justify-content: center;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    justify-content: flex-end;
  }
`;

export const ParticipateIntroductionStyle = styled(ThirdLevelTitleStyle)`
  display: inline-flex;
  font-family: ${MakeFonts.CircularStandardBold};
  font-weight: bold;
  color: ${props =>
    props.theme.secondaryFontColor
      ? props.theme.secondaryFontColor
      : color.black};
  text-transform: none;
  text-align: center;
  width: 100%;
  max-width: 350px;
  margin-bottom: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    text-align: right;
    margin-bottom: 0;
  }
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${intToPx(typography.font.fontsize.M.value)};
  }
`;

export const ParticipateDescriptionStyle = styled(ParagraphStyle)`
  font-family: ${MakeFonts.CircularStandardBook};
  @media (min-width: ${intToPx(Breakpoints.LargeDesktop)}) {
    font-size: ${intToPx(typography.font.fontsize.S.value)};
  }
`;

export const ParticipateSeparatorStyle = styled.div`
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    display: inline-flex;
    width: 1px;
    min-width: 1px;
    min-height: 75px;
    background-color: ${props =>
      props.theme.secondaryFontColor
        ? props.theme.secondaryFontColor
        : color.black};
    opacity: 0.3;
    margin: 0 20px;
  }
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin: 0 45px;
  }
`;
