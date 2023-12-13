import React, { FC } from 'react';
import i18n from 'i18next';
import {
  ContentStyle,
  ContentIconStyle,
  ThemeTitleStyle,
  ThemeContainerStyle,
  ThemeListStyle,
} from './style';
import pano from '../../assets/IconPano.png';
import { useAssemblyContext } from '../../store/context';

export const Themes: FC = () => {
  const { state } = useAssemblyContext();
  const { termQueries } = state;

  return (
    <ContentStyle>
      <ContentIconStyle src={pano} alt="Logo" />
      <ThemeContainerStyle>
        <ThemeTitleStyle>{i18n.t('prompt.themeAnswer')}</ThemeTitleStyle>
        <ThemeListStyle>
          {termQueries.map(termQuery => (
            <li key={termQuery.value}>{termQuery.title}</li>
          ))}
        </ThemeListStyle>
      </ThemeContainerStyle>
    </ContentStyle>
  );
};
