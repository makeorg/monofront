import { join, dirname } from 'path';
import custom from '../webpack/webpack.config'; // 👈 Custom Webpack configuration being imported.

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

const config = {
  stories: [
    '../**/*.mdx',
    '../**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  staticDirs: [ '../assets' ],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  docs: {
    autodocs: true,
    defaultName: 'Documentation',
  },
  framework: {
    name: getAbsolutePath('@storybook/react-webpack5'),
    options: {},
  },
  webpackFinal: async (config) => {
    return {
      ...config,
      module: { ...config.module, rules: [...config.module?.rules || [], ...custom.module.rules || []] },
    };
  },
};

export default config;
