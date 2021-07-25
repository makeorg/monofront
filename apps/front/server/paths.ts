import path from 'path';

export const BUILD_DIR = path.resolve(__dirname, '..', 'dist');
export const SERVER_DIR = path.resolve(__dirname, '.');
export const IMAGES_DIR = path.resolve(__dirname, '.', 'images');
export const REPORTS_DIR = path.resolve(__dirname, '.', 'reports');
export const DOC_DIR = path.resolve(__dirname, '..', 'storybook-static');
export const MAP_DIR = path.join(BUILD_DIR, 'map');
export const CLIENT_DIR = path.join(BUILD_DIR, 'client');
export const ASSETS_DIR = path.join(CLIENT_DIR, 'assets');
export const FAVICON_DIR = path.join(CLIENT_DIR, 'favicon');
export const JS_DIR = path.join(CLIENT_DIR, 'js');
export const VERSION_PATH = path.join(CLIENT_DIR, 'version');
export const FAVICON_FILE = 'favicon/favicon-48x48.png';
