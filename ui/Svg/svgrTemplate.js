/* eslint-disable @typescript-eslint/ban-ts-comment */
function customTemplate(variables, { tpl }) {
  return tpl`
  ${`/* eslint-disable react/jsx-props-no-spreading */ \n`}
    import React, { FC } from 'react';
    import { SvgPropsType } from '@make.org/types';
    ${'\n'}
    export const ${`${variables.componentName} : FC<SvgPropsType>`}  = (props: SvgPropsType) => (
      ${variables.jsx}
    );
`;
}

module.exports = customTemplate;
