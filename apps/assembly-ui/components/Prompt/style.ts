import { Breakpoints } from '@make.org/assets/vars/Breakpoints';
import { spacings } from '@make.org/designsystem/tokens/spacings';
import { typography } from '@make.org/designsystem/tokens/typography';
import { intToPx } from '@make.org/utils/helpers/styled';
import styled from 'styled-components';

export const PromptContainerStyle = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column;
  gap: 12px;
  bottom: 0;
  background-color: white;
  z-index: 100;
  width: 100%;
  margin: auto auto 0 auto;
  padding: 0 ${spacings.m} ${spacings.m} ${spacings.m};
  max-width: ${intToPx(Breakpoints.LargeDesktop)};
`;

export const PromptFormContainerStyle = styled.form`
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const PromptFormInputStyle = styled.input`
  width: 100%;
  height: 50px;
  background-color: white;
  border-radius: 30px;
  border: 1px solid rgba(191, 191, 191, 1);
  padding: 0 100px 0 ${spacings.sm};
`;

export const PromptFormButtonsContainerStyle = styled.div`
  position: absolute;
  display: flex;
  gap: ${spacings.xs};
  margin-right: ${spacings.xs};
`;

export const PromptFormSubmitStyle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background-color: transparent;
`;

export const PromptFormButtonArrowStyle = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
`;

export const PromptFormWarningText = styled.p`
  font-size: 9px;
  margin-left: 5px;
  @media (min-width: ${intToPx(Breakpoints.LargeMobile)}) {
    font-size: ${typography.FontSize.Text.Bastille};
  }
`;

export const SuggestionsContainerStyle = styled.div`
  display: grid;
  gap: ${spacings.s};
  grid-template-columns: repeat(3, 1fr);
`;

export const SuggestionsButtonsListStyle = styled.li`
  min-width: 240px;
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin: 0 5px;

  border: 1px solid #0000002b;
  @media (min-width: ${intToPx(Breakpoints.Tablet)}) {
    margin: 0;
  }
`;

export const SuggestionsButtonsStyle = styled.button`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: ${spacings.xs};
  padding: ${spacings.s};
  border-style: none;
  width: 100%;
  background-color: white;
  border-radius: ${spacings.s};
  font-size: ${typography.FontSize.Text.Bastille};
  text-align: left;
  color: rgba(87, 87, 87, 1);
`;
