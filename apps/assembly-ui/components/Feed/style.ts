import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';
import { GreyStyle } from '@make.org/ui/elements/ButtonsElements';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { VideoLogoSvg } from '../../assets/Video';
import { SvgScrollButton } from '../../assets/scroll_button';
import { DocumentLogoSvg } from '../../assets/BookOpenText';

export const FeedContainerStyle = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 40px;
  width: 100%;
  margin: 0 auto;
  max-width: ${intToPx(Breakpoints.LargeDesktop)};
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    padding: ${spacings.m};
  }
`;

export const QuestionContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${spacings.s};
  padding: ${spacings.m};
`;

export const QuestionUserStyle = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.s};
  color: #5f5f5f;
  font-size: ${typography.FontSize.Text.Arrondissement};
`;

export const QuestionImgStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  background-color: #d9d9d9;
  border-radius: 50%;
  .img {
    width: 10px;
    height: 10px;
  }
`;

export const QuestionStyle = styled.p`
  font-size: ${typography.FontSize.Text.Arrondissement};
`;

export const ContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.m};
  background-color: #f9f8ffcf;
  border-radius: 10px;
  padding: ${spacings.m};
  font-size: ${typography.FontSize.Text.Arrondissement};
`;

export const AnswerContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: ${typography.FontSize.Text.Arrondissement};
`;

export const ContentIconStyle = styled.img`
  height: 20px;
  width: 20px;
`;

export const ThemeContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.s};
`;

export const ThemeListStyle = styled.ul`
  padding-left: ${spacings.m};
`;

export const ThemeButtonListStyle = styled.button`
  border: none;
  background: none;
  text-decoration: underline;
  color: #5d6fcd;
`;

export const SourcesContainerStyle = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SourcesContentStyle = styled.ul`
  display: flex;
  gap: 10px;
  padding: 0;
`;

export const VideoLogo = styled(VideoLogoSvg)`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

export const SourcesTitleStyle = styled.span`
  font-size: ${typography.FontSize.Text.Arrondissement};
  font-weight: 600;
  color: rgba(95, 95, 95, 1);
`;

export const SourcesMediaContentStyle = styled.li`
  background-color: white;
  border-radius: 10px;
  width: 200px;
  max-width: 200px;
  list-style: none;
  margin: 0 5px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    margin: 0;
  }
`;

export const SourcesMediaTextContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${typography.FontSize.Text.Bastille};
  gap: 5px;
  padding: 10px;
`;

export const SourcesMediaDocumentLinkStyle = styled.a`
  display: flex;
  flex-direction: column;
  font-size: ${typography.FontSize.Text.Bastille};
  gap: 5px;
  padding: 10px;
  text-decoration: none;
`;

export const SourcesMediaTitleStyle = styled.span`
  display: flex;
  align-items: center;
  gap: ${spacings.xs};
`;

export const SourcesMediaTextStyle = styled.p`
  color: rgba(87, 87, 87, 1);
`;

export const DocumentLogo = styled(DocumentLogoSvg)`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
`;

export const SourcesTruncatedTextStyle = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-weight: 600;
  color: rgba(52, 51, 48, 1);
`;

export const ActionsButtonStyle = styled.button<{
  standardStyle?: boolean;
}>`
  font-size: ${typography.FontSize.Text.RueDeLappe};
  color: rgba(76, 65, 171, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacings.xs} ${spacings.s};
  height: fit-content;
  width: fit-content;
  border: 1px solid rgba(76, 65, 171, 1);
  border-radius: 4px;
  background-color: white;
  text-align: left;

  &:disabled {
    ${props => (props.standardStyle ? '' : GreyStyle)};
  }
`;

export const HistoryMaxContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const HistoryMaxTitleStyle = styled.span`
  font-size: ${typography.FontSize.Text.Bastille};
  font-weight: 600;
`;

export const HistoryMaxTextStyle = styled.p`
  font-size: ${typography.FontSize.Text.RueDeLappe};
`;

export const TempTemoignageDiscoverStyle = styled(ContentStyle)`
  margin-top: 20px;

  &.yellow {
    background-color: #fffdf4;
  }
`;

export const TemoignageButtonStyle = styled.a`
  width: fit-content;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  background-color: #4c41ab;
  color: white !important;
  text-decoration: none;
`;

export const TemoignageTextStyle = styled.p`
  font-size: ${typography.FontSize.Text.Arrondissement};
`;

export const TemoignageBoldTextStyle = styled(TemoignageTextStyle)`
  width: 50%;
  font-weight: 600;
  &.big {
    font-size: ${typography.FontSize.Text.Arrondissement};
  }
`;

export const TemoignageContainerStyle = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const TemoignageArrowsStyle = styled.div`
  width: 100%;
  order: 3;
  text-align: end;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  @media (min-width: ${intToPx(Breakpoints.Desktop)}) {
    order: initial;
    width: 50%;
  }
`;

export const TemoignageBlockStyle = styled.li`
  display: flex;
  align-items: center;
  width: 100%;
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  font-size: ${typography.FontSize.Text.Bastille};
`;

export const TemoignageRightScrollButtonStyle = styled(SvgScrollButton)`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

export const TemoignageLeftScrollButtonStyle = styled(
  TemoignageRightScrollButtonStyle
)`
  transform: rotate(180deg);
`;
