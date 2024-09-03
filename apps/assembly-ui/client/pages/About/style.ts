import { typography } from '@make.org/designsystem/tokens/typography';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { intToPx } from '@make.org/utils/helpers/styled';
import { SvgSit } from '../../../assets/rea_sit';
import { SvgWoman } from '../../../assets/rea_woman';
import { SvgDocVector } from '../../../assets/VectorDoc';
import { SvgWarningVector } from '../../../assets/Vector';
import { SvgSit2 } from '../../../assets/rea_write';
import { SvgPersoVector } from '../../../assets/VectorPerso';
import { SvgIAVector } from '../../../assets/VectorIa';
import { SvgStanding } from '../../../assets/rea_standing';
import { SvgExternalPurpleLink } from '../../../assets/ArrowExternalPurple';

export const SvgExternalPurpleStyle = styled(SvgExternalPurpleLink)`
  display: inline-flex;
  margin-left: 5px;
  width: 17px;
  height: 17px;
`;

export const SvgSitStyle = styled(SvgSit)`
  width: 170px;
  height: auto;
  align-self: flex-end;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 372px;
  }
`;

export const SvgSit2Style = styled(SvgSit2)`
  width: 200px;
  height: auto;
  align-self: center;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    width: 380px;
  }
`;

export const SvgWomanStyle = styled(SvgWoman)`
  max-width: 300px;
  height: auto;
  align-self: center;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    max-width: 400px;
  }
`;

export const SvgStandingStyle = styled(SvgStanding)`
  max-width: 160px;
  height: auto;
  align-self: center;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    max-width: 235px;
  }
`;

export const SvgDocStyle = styled(SvgDocVector)`
  max-width: 26px;
  height: auto;
  align-self: center;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    max-width: 38px;
  }
`;

export const SvgIaStyle = styled(SvgIAVector)`
  max-width: 26px;
  height: auto;
  align-self: center;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    max-width: 38px;
  }
`;
export const SvgPersoStyle = styled(SvgPersoVector)`
  max-width: 26px;
  height: auto;
  align-self: center;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    max-width: 38px;
  }
`;
export const SvgWarningStyle = styled(SvgWarningVector)`
  max-width: 29px;
  height: auto;
  align-self: flex-start;
`;

export const ReassuranceTitleStyle = styled.h2`
  font-size: ${typography.FontSize.Title.IleDeFrance};

  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Title.Europe};
  }
`;

export const ReassuranceSubitleStyle = styled.h3`
  font-size: ${typography.FontSize.Title.Arrondissement};

  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Title.IleDeFrance};
  }
`;

export const ReassuranceTextBigStyle = styled.p`
  font-size: ${typography.FontSize.Text.Arrondissement};

  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Text.PetiteCouronne};
  }
`;

export const ReassuranceBlueTextBigStyle = styled(
  ReassuranceTextBigStyle
).attrs({
  as: 'h4',
})`
  color: #6760a5;
  font-weight: 700;
`;

export const ReassuranceTextStyle = styled.p`
  font-size: ${typography.FontSize.Text.Bastille};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Text.Arrondissement};
  }
`;

export const ReassuranceTextMarkdownStyle = styled(ReactMarkdown)`
  font-size: ${typography.FontSize.Text.Bastille};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Text.Arrondissement};
  }
`;

export const ReassuranceContainerBlockStyle = styled.ul<{
  grey?: boolean;
}>`
  display: flex;
  flex-direction: column;
  list-style: none;
  max-width: 1140px;
  padding: 0 ${spacings.m};
  margin: ${props => (props.grey ? 'auto' : `${spacings.xl} auto 0`)};
  gap: ${spacings.sm};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    gap: ${spacings.l};
  }

  li {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }
`;

export const ReassuranceList = styled.ul`
  list-style: disc;
  li {
    display: list-item;
  }
`;

export const ReassuranceTextBoldStyle = styled(ReassuranceTextStyle)`
  font-weight: 600;
`;

export const ReassuranceBlueTextStyle = styled(ReassuranceTextStyle)`
  color: #4c41ab;
  font-weight: 700;
`;

export const ReassuranceContainerMainTitleStyle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: ${spacings.l};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex-direction: row;
    margin-bottom: 100px;
  }
`;

export const ReassuranceInnerBlockTextGapStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.m};

  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    gap: ${spacings.l};
  }
`;

export const ReassuranceInnerBlockTextSmallGapStyle = styled(
  ReassuranceInnerBlockTextGapStyle
)`
  gap: ${spacings.s};
`;

export const ReassuranceDoubleBlockStyle = styled(
  ReassuranceInnerBlockTextGapStyle
)`
  gap: ${spacings.l};

  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex-direction: row;
  }
`;

export const ReassuranceWhyWhoContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.sm};
  flex: 1;
`;

export const ReassuranceTitleNumberIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    gap: ${spacings.l};
  }
`;

export const ReassuranceFakePromptContainerStyle = styled.form`
  position: relative;
  width: 100%;
  max-width: 340px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const ReassuranceSeekBlockStyle = styled.div`
  display: flex;
  gap: ${spacings.l};
  flex-direction: column;

  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    flex-direction: row;
  }
`;

export const ReassuranceBlockImageStyle = styled(ReassuranceSeekBlockStyle)`
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    flex-direction: row;
  }
`;

export const ReassuranceSeekBlockComponentStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: ${spacings.m};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    gap: ${spacings.l};
  }
`;

export const ReassuranceSeekFakePrompt = styled.button`
  background-color: white;
  border: 1px solid #bfbfbf;
  border-radius: 12px;
  max-width: 340px;
  padding: ${spacings.s};
  color: rgba(87, 87, 87, 1);
  text-align: left;
`;

export const ReassuranceSugTextTitleContainerStyle = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: ${spacings.sm};
`;

export const ReassuranceThemesContainer = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacings.sm};
  max-width: 340px;
  padding: 0;

  span {
    display: flex;
  }
`;

export const ReassuranceRagContainerStyle = styled.h3`
  white-space: break-spaces;

  span,
  abbr {
    font-size: ${typography.FontSize.Title.Arrondissement};
    font-weight: 600;

    @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
      font-size: ${typography.FontSize.Title.IleDeFrance};
    }
  }
`;

export const ReassuranceButtonConfidentialityStyle = styled.a`
  width: fit-content;
  border-radius: ${spacings.s};
  padding: ${spacings.s} ${spacings.m};
  border: 1px solid #4c41ab;
  color: #4c41ab;
  text-decoration: none;

  :hover {
    color: #4c41ab;
  }

  svg {
    color: #4c41ab;
  }
`;

export const ReassuranceSmalGreyBackground = styled.div<{
  last?: boolean;
}>`
  width: 100%;
  background-color: #f8f8f8;
  border-radius: ${spacings.s};
  padding: ${spacings.l};
  margin-bottom: ${props => (props.last ? '100px' : '0')};
  display: flex;
  flex-direction: column;
  gap: ${spacings.m};
`;

export const ReassuranceGreyBackgroundStyle = styled.div<{
  last?: boolean;
}>`
  width: 100%;
  background-color: #f8f8f8;
  padding-top: ${spacings.xl};
  padding-bottom: ${props => (props.last ? `${spacings.xl}` : '0')};
`;
