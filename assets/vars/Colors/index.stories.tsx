import React from 'react';
import { Colors } from './index';

// eslint-disable-next-line import/no-default-export
export default {
  title: 'Colors',
  component: Colors,
};

const Default = () => <Colors />;

export const ColorsComponent = Default.bind();
ColorsComponent.parameters = {
  jest: ['Colors.spec.js'],
};
