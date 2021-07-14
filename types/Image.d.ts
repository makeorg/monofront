export const IMAGE_SOURCE_INTERNAL = 'internal';
export const IMAGE_SOURCE_EXTERNAL = 'external';

export type ImageDataType = {
  url: string;
  alt?: string;
  source?: 'internal' | 'external';
};
