import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
import ReactMarkdown from 'react-markdown';
import { BonhommeLogoSvg } from '../../assets/bonhomme';

export const WelcomeContainerStyle = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${intToPx(Breakpoints.LargeDesktop)};
  margin: 0 auto;
  padding: ${spacings.xl} ${spacings.m} ${spacings.m} ${spacings.m};
`;

export const WelcomeTitleImageContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    flex-direction: row;
    gap: 70px;
  }
`;

export const WelcomeTitleExergueContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${spacings.s};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    gap: 25px;
  }
`;

export const WelcomeIconPngStyle = styled.img`
  margin: auto;
  height: 170px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    height: 300px;
  }
`;

export const WelcomeTitleStyle = styled.h1`
  font-size: ${typography.FontSize.Title.France};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Title.Europe};
  }

  &.purple {
    color: ${colors.Content.Panoramic.Brand};
  }
`;

export const WelcomeIAStyle = styled.p`
  font-size: ${typography.FontSize.Text.Bastille};
  &.bold {
    font-weight: 600;
  }
`;

export const WelcomeContentBlockContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.sm};
`;

export const WelcomeBlockThemesContainerStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: rgba(248, 248, 248, 1);
  gap: ${spacings.m};
  padding: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    max-width: calc(${intToPx(Breakpoints.LargeDesktop)} - ${spacings.m} * 2);
    margin: 0 auto;
  }
  border-radius: 10px;
`;

export const WelcomeContentBlockTitleStyle = styled.h2`
  font-size: ${typography.FontSize.Title.Arrondissement};
  font-weight: 600;
`;

export const WelcomeContentTextStyle = styled(ReactMarkdown)`
  font-size: ${typography.FontSize.Text.Bastille};
`;

export const WelcomeExergueTextStyle = styled(ReactMarkdown)`
  font-size: ${typography.FontSize.Text.Arrondissement};
`;

export const WelcomeThemesBlockStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacings.m};
`;

export const WelcomeToggleButtonStyle = styled.button`
  color: ${colors.Content.Panoramic.Brand};
  font-size: ${typography.FontSize.Text.Bastille};
  border: none;
  background: none;
  width: fit-content;
  padding: 0;
  text-decoration: underline;
`;

export const BonhommeLogoSvgStyle = styled(BonhommeLogoSvg)`
  margin-left: ${spacings.s};
`;

export const WelcomeThemesButtonStyle = styled.button<{
  standardStyle?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${typography.FontSize.Text.Bastille};
  padding: ${spacings.s} ${spacings.m};
  border-radius: 20px;
  border: none;
  color: ${props => (props.standardStyle ? '#121212' : 'black')};
`;
