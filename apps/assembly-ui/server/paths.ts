import path from 'path';

export const ASSEMBLY_BUILD_DIR = path.resolve(__dirname, '..', 'dist');
export const ASSEMBLY_SERVER_DIR = path.resolve(__dirname, '.');
export const ASSEMBLY_IMAGES_DIR = path.resolve(__dirname, '.', 'images');
export const ASSEMBLY_MAP_DIR = path.join(ASSEMBLY_BUILD_DIR, 'map');
export const ASSEMBLY_CLIENT_DIR = path.join(ASSEMBLY_BUILD_DIR, 'client');
export const ASSEMBLY_ASSETS_DIR = path.join(ASSEMBLY_CLIENT_DIR, 'assets');
export const ASSEMBLY_FAVICON_DIR = path.join(ASSEMBLY_CLIENT_DIR, 'favicon');
export const ASSEMBLY_JS_DIR = path.join(ASSEMBLY_CLIENT_DIR, 'js');
export const ASSEMBLY_VERSION_PATH = path.join(ASSEMBLY_CLIENT_DIR, 'version');
export const ASSEMBLY_FAVICON_FILE = 'favicon-48x48.png';
