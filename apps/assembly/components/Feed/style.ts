import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';
import { VideoLogoSvg } from '../../assets/Video';
import { DocumentLogoSvg } from '../../assets/BookOpenText';

export const FeedContainerStyle = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: end;
  gap: 40px;
  width: 100%;
  margin: 0 auto;
  padding: ${spacings.m};
  max-width: ${intToPx(Breakpoints.LargeDesktop)};
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
  font-size: 12px;
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
  font-size: 14px;
`;

export const ContentStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.m};
  background-color: #f9f8ffcf;
  border-radius: 10px;
  padding: ${spacings.m};
  font-size: 12px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    flex-direction: row;
  }
`;

export const AnswerContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

export const ThemeTitleStyle = styled.div`
  font-size: 12px;
  font-weight: 600;
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

export const SourcesContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const SourcesContentStyle = styled.div`
  display: flex;
  gap: 10px;
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

export const SourcesMediaContentStyle = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 200px;
`;

export const SourcesMediaTextContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  font-size: ${typography.FontSize.Text.Bastille};
  gap: 5px;
  padding: 10px;
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
