import React from 'react';
import { ModernNormalizeStylesheet } from '@make.org/assets/css-in-js/ModernNormalize';
import { FontFacesStylesheet } from '@make.org/assets/css-in-js/FontFaces';
import { DefaultStylesheet } from '@make.org/assets/css-in-js/DefaultStyle';
import { UIThemeStylesheet } from '@make.org/assets/css-in-js/UITheme';

const preview = {
  parameters: {
    decorators: [
      (Story) => (
        <>
          <ModernNormalizeStylesheet />
          <FontFacesStylesheet />
          <DefaultStylesheet />
          <UIThemeStylesheet />
          <Story />
        </>
      ),
    ]
  },
};

export default preview;
