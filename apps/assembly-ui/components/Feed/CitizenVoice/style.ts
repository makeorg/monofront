import { typography } from '@make.org/designsystem/tokens/typography';
import styled from 'styled-components';

export const CitizenVoiceIntroStyle = styled.div`
  font-family: ${typography.FontFamily.Highlight};
`;

export const CitizenVoiceDescriptionStyle = styled.p`
  font-family: ${typography.FontFamily.Default};
  line-height: 1.5;
`;

export const ToldButtonStyle = styled.button`
  width: fit-content;
  font-family: ${typography.FontFamily.Default};
  line-height: 100%;
  text-decoration: none;
  user-select: none;
  border: 1px solid #4c41ab;
  background-color: #4c41ab;
  color: #fff;
  padding: 10px 20px;
  border-radius: 10px;
`;
