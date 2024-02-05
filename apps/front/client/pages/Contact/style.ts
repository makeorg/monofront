import styled from 'styled-components';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';
import { colors } from '@make.org/designsystem/tokens/colors';
import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { TitleSStyle } from '@make.org/designsystem/components/Typography/Titles/style';
import { intToPx } from '@make.org/utils/helpers/styled';

export const ContactPageWrapperStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  max-width: 1140px;
  flex: 1 1 auto;
  padding: ${spacings.m};
  margin: ${spacings.l} auto;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    gap: 60px;
    margin: ${spacings.xxl} auto;
  }
`;

export const ContactPageTitleContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    gap: 10px;
  }
`;

export const MainTitleStyle = styled(TitleSStyle)`
  font-size: ${typography.FontSize.France};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Earth};
  }
`;

export const SubTitleStyle = styled(TitleSStyle)`
  font-size: ${typography.FontSize.GrandeCouronne};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.IleDeFrance};
  }
`;

export const ContactPageFormContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: flex-start;
`;

export const ContactPageTextStyle = styled.p`
  font-family: ${typography.FontFamily.Default};
  line-height: ${typography.LineHeight.l150};
  font-size: ${typography.FontSize.Bastille};
  color: ${colors.Content.Interface.DarkSecondary};
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Arrondissement};
  }
`;

export const ContactPageLabelContainerStyle = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  font-size: ${typography.FontSize.Bastille};
  font-family: ${typography.FontFamily.Default};
  color: ${colors.Content.Interface.DarkSecondary};
  font-weight: normal;

  input,
  textarea,
  select {
    border: 1px solid ${colors.Border.Interface.LightSecondary};
    padding: 15px;
    background-color: ${colors.Background.Interface.Lighter};
    ::placeholder {
      font-size: ${typography.FontSize.RueDeLappe};
      @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
        font-size: ${typography.FontSize.Bastille};
      }
    }
  }

  input {
    max-width: 280px;
    border-radius: 40px;
  }

  textarea {
    max-width: 720px;
    height: 140px;
    border-radius: 8px;
  }

  select {
    max-width: 295px;
    border-radius: 40px;
    border-right: 12px solid transparent;
    white-space: nowrap;
    text-overflow: ellipsis;

    option {
      word-wrap: normal !important;
      white-space: normal;
      overflow-wrap: break-word;
    }
  }

  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    gap: 10px;
  }
`;

export const ContactPageCheckboxLabelStyle = styled(
  ContactPageLabelContainerStyle
)`
  flex-direction: row-reverse;
  align-items: flex-start;

  input {
    width: auto;
    margin-top: 5px;
  }
`;

export const ContactPageSubmittedStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    gap: 30px;

    a {
      width: fit-content;
    }
  }
`;

export const ContactPageErrorStyle = styled.p`
  color: ${colors.Content.Alert.Error};
`;
