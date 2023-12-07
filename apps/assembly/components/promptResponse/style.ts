import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';

export const PromptResponseContainerStyle = styled.section`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  margin: 0 auto;
  padding: ${spacings.m};
  max-width: ${intToPx(Breakpoints.LargeDesktop)};
`;

export const PromptResponseStyle = styled.div``;

export const PromptResponseQuestionContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${spacings.s};
  padding: ${spacings.m};
`;
export const PromptResponseQuestionUserStyle = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacings.s};
  color: #5f5f5f;
  font-size: 12px;
`;

export const PromptResponseQuestionImgStyle = styled.div`
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

export const PromptResponseQuestionStyle = styled.p`
  font-size: 14px;
`;

export const PromptResponseContentStyle = styled.div`
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

export const PromptResponseContentIconStyle = styled.img`
  height: 20px;
  width: 20px;
`;

export const PromptResponseThemeContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacings.s};
`;

export const PromptThemeTitleStyle = styled.div`
  font-size: 12px;
  font-weight: 600;
`;

export const PromptReponseThemeListStyle = styled.ul`
  padding-left: ${spacings.m};
`;

export const PromptReponseThemeItemListStyle = styled.li`
  color: #5d6fcd;
`;

export const PromptResponseThemeButtonListStyle = styled.button`
  border: none;
  background: none;
  text-decoration: underline;
  color: #5d6fcd;
`;
