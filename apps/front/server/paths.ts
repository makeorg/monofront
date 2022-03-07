import path from 'path';

export const APP_BUILD_DIR = path.resolve(__dirname, '..', 'dist');
export const APP_SERVER_DIR = path.resolve(__dirname, '.');
export const APP_IMAGES_DIR = path.resolve(__dirname, '.', 'images');
export const APP_REPORTS_DIR = path.resolve(__dirname, '.', 'reports');
export const APP_CONVENTION_DIR = path.resolve(__dirname, '.', 'convention');
export const APP_DOC_DIR = path.resolve(__dirname, '..', 'storybook-static');
export const APP_MAP_DIR = path.join(APP_BUILD_DIR, 'map');
export const APP_CLIENT_DIR = path.join(APP_BUILD_DIR, 'client');
export const APP_ASSETS_DIR = path.join(APP_CLIENT_DIR, 'assets');
export const APP_FAVICON_DIR = path.join(APP_CLIENT_DIR, 'favicon');
export const APP_JS_DIR = path.join(APP_CLIENT_DIR, 'js');
export const APP_VERSION_PATH = path.join(APP_CLIENT_DIR, 'version');
export const APP_FAVICON_FILE = 'favicon/favicon-48x48.png';
