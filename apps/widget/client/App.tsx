import React, { FC } from 'react';
import { DefaultStylesheet } from '@make.org/assets/css-in-js/DefaultStyle';
import { FontFacesStylesheet } from '@make.org/assets/css-in-js/FontFaces';
import { ModernNormalizeStylesheet } from '@make.org/assets/css-in-js/ModernNormalize';
import { UIThemeStylesheet } from '@make.org/assets/css-in-js/UITheme';
import { Routes } from './Routes';
import { WidgetContainerStyle } from './style';

const App: FC = () => (
  <>
    <ModernNormalizeStylesheet />
    <FontFacesStylesheet />
    <DefaultStylesheet />
    <UIThemeStylesheet />
    <WidgetContainerStyle>
      <Routes />
    </WidgetContainerStyle>
  </>
);

export default App;
