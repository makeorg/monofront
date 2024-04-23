import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { SourcesVideoSvg } from '../../../assets/SourcesVideo';
import { SourcesDocumentSvg } from '../../../assets/SourcesDocument';
import { ArrowLeft } from '../../../assets/arrow_left';
import { ArrowBottom } from '../../../assets/arrow_bottom';

export const SourcesContainerStyle = styled.div`
  justify-content: space-between;
  display: flex;
  gap: ${spacings.m};
  padding: ${spacings.sm};
  border: 1px solid #dfcde5;
  border-radius: 10px;
  max-width: 500px;
  flex-direction: column;
  background-color: inherit;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: ${spacings.m};
  }
`;

export const SourcesContainerButtonStyle = styled(SourcesContainerStyle).attrs({
  as: 'button',
})`
  align-items: center;
  flex-direction: row;
  cursor: pointer;
`;

export const SourcesTextIconBlockStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.sm};
  user-select: none;
  align-items: flex-start;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    gap: ${spacings.m};
  }
`;
export const SourcesTextButtonStyle = styled.button`
  display: flex;
  justify-content: space-between;
  user-select: none;
  border: none;
  background-color: inherit;
  padding: 0;
  cursor: pointer;
`;

export const SourcesIconsContainerStyle = styled.div`
  display: flex;
  gap: ${spacings.s};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    gap: ${spacings.sm};
  }
`;

export const SourcesContentContainerStyle = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: ${spacings.xs};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    gap: ${spacings.m};
  }
`;

export const SourcesContentDocumentStyle = styled.button`
  display: flex;
  align-items: center;
  padding: ${spacings.s};
  border: 1px solid #6cd29b;
  background-color: #f4fff9;
  border-radius: 10px;
  gap: ${spacings.xs};
  text-decoration: none;
  user-select: none;
  cursor: pointer;
  text-align: left;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    gap: ${spacings.s};
  }
`;

export const SourcesContentVideoStyle = styled(SourcesContentDocumentStyle)`
  border: 1px solid #89c5e7;
  background-color: #f9feff;
`;

export const SourcesDocumentLinkStyle = styled.a`
  display: flex;
  flex-direction: column;
  font-size: ${typography.FontSize.Text.Bastille};
  gap: ${spacings.xs};
  padding: ${spacings.s};
  text-decoration: none;
`;

export const SourcesTitleContainerStyle = styled.div`
  width: 100%;
  overflow: hidden;
`;

export const SourcesTitleStyle = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${typography.FontSize.Text.RueDeLappe};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Text.Bastille};
  }
`;

export const SourcesSubStyle = styled(SourcesTitleStyle)`
  font-size: 10px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Text.RueDeLappe};
  }
`;

export const SourcesAnswerContentDocumentStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.m};
  background-color: #f4fff9;
  border-radius: 10px;
  padding: ${spacings.m};
  font-size: ${typography.FontSize.Text.Bastille};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Text.Arrondissement};
  }
`;

export const SourcesAnswerContentVideoStyle = styled(
  SourcesAnswerContentDocumentStyle
)`
  background-color: #f9feff;
`;

export const SourcesAnswerTextIntroStyle = styled.div`
  font-size: ${typography.FontSize.Text.Bastille};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    font-size: ${typography.FontSize.Text.Arrondissement};
  }
`;

export const SourcesAnswerTextBoldStyle = styled.span`
  font-family: ${typography.FontFamily.Highlight};
`;

export const SourcesAnswerDocumentLink = styled.a`
  width: fit-content;
  line-height: 100%;
  text-decoration: none;
  user-select: none;
  border: 1px solid #72c083;
  background-color: #ffffff;
  color: #72c083;
  padding: 10px;
  border-radius: 4px;

  &:hover {
    color: #72c083;
  }
`;

export const ArrowLeftStyle = styled(ArrowLeft)``;

export const ArrowBottomStyle = styled(ArrowBottom)``;

export const SourcesDocumentStyle = styled(SourcesDocumentSvg)`
  width: 20px;
  height: 20px;
  min-width: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 32px;
    height: 32px;
  }
`;

export const SourcesVideoStyle = styled(SourcesVideoSvg)`
  width: 20px;
  height: 20px;
  min-width: 20px;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    width: 32px;
    height: 32px;
  }
`;
