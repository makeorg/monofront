import React, { FC } from 'react';
import i18n from 'i18next';
import {
  PromptResponseContentStyle,
  PromptResponseContentIconStyle,
  PromptThemeTitleStyle,
  PromptResponseThemeContainerStyle,
  PromptReponseThemeListStyle,
} from './style';
import pano from '../../assets/IconPano.png';
import { useAssemblyContext } from '../../store/context';

export const PromptThemeResponse: FC = () => {
  const { state } = useAssemblyContext();
  const { termQueries } = state;

  return (
    <PromptResponseContentStyle>
      <PromptResponseContentIconStyle src={pano} alt="Logo" />
      <PromptResponseThemeContainerStyle>
        <PromptThemeTitleStyle>
          {i18n.t('prompt.themeAnswer')}
        </PromptThemeTitleStyle>
        <PromptReponseThemeListStyle>
          {termQueries.map(termQuery => (
            <li key={termQuery.value}>{termQuery.title}</li>
          ))}
        </PromptReponseThemeListStyle>
      </PromptResponseThemeContainerStyle>
    </PromptResponseContentStyle>
  );
};
