import path from 'path';

export const WIDGET_BUILD_DIR = path.resolve(__dirname, '..', 'dist');
export const WIDGET_SERVER_DIR = path.resolve(__dirname, '.');
export const WIDGET_IMAGES_DIR = path.resolve(__dirname, '.', 'images');
export const WIDGET_REPORTS_DIR = path.resolve(__dirname, '.', 'reports');
export const WIDGET_DOC_DIR = path.resolve(__dirname, '..', 'storybook-static');
export const WIDGET_MAP_DIR = path.join(WIDGET_BUILD_DIR, 'map');
export const WIDGET_CLIENT_DIR = path.join(WIDGET_BUILD_DIR, 'client');
export const WIDGET_ASSETS_DIR = path.join(WIDGET_CLIENT_DIR, 'assets');
export const WIDGET_FAVICON_DIR = path.join(WIDGET_CLIENT_DIR, 'favicon');
export const WIDGET_JS_DIR = path.join(WIDGET_CLIENT_DIR, 'js');
export const WIDGET_VERSION_PATH = path.join(WIDGET_CLIENT_DIR, 'version');
export const WIDGET_FAVICON_FILE = 'favicon/favicon-48x48.png';
