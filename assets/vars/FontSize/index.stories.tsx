import React from 'react';
import { FontSize } from './index';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'FontSize',
  component: FontSize,
};

const Default = () => <FontSize />;

export const FontSizeComponent = Default.bind();
FontSizeComponent.parameters = {
  jest: ['FontSize.spec.js'],
};
