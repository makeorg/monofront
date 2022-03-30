import React, { FC } from 'react';
import { DefaultStylesheet } from '@make.org/assets/css-in-js/DefaultStyle';
import { FontFacesStylesheet } from '@make.org/assets/css-in-js/FontFaces';
import { ModernNormalizeStylesheet } from '@make.org/assets/css-in-js/ModernNormalize';
import { UIThemeStylesheet } from '@make.org/assets/css-in-js/UITheme';
import { Routes } from './Routes';

const App: FC = () => (
  <>
    <ModernNormalizeStylesheet />
    <FontFacesStylesheet />
    <DefaultStylesheet />
    <UIThemeStylesheet />
    <Routes />
  </>
);

export default App;
