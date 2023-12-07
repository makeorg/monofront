import React, { FC } from 'react';
import i18n from 'i18next';
import {
  PromptResponseContentStyle,
  PromptResponseContentIconStyle,
  PromptThemeTitleStyle,
  PromptResponseThemeContainerStyle,
  PromptReponseThemeListStyle,
  PromptReponseThemeItemListStyle,
  PromptResponseThemeButtonListStyle,
} from './style';
import pano from '../../assets/IconPano.png';

type Props = {
  response: Array<string>;
};

export const PromptThemeResponse: FC<Props> = ({ response }) => (
  <PromptResponseContentStyle>
    <PromptResponseContentIconStyle src={pano} alt="Logo" />
    <PromptResponseThemeContainerStyle>
      <PromptThemeTitleStyle>
        {i18n.t('prompt.themeAnswer')}
      </PromptThemeTitleStyle>
      <PromptReponseThemeListStyle>
        {response.map((theme: string) => (
          <PromptReponseThemeItemListStyle key={theme}>
            <PromptResponseThemeButtonListStyle type="button">
              {theme}
            </PromptResponseThemeButtonListStyle>
          </PromptReponseThemeItemListStyle>
        ))}
      </PromptReponseThemeListStyle>
    </PromptResponseThemeContainerStyle>
  </PromptResponseContentStyle>
);
