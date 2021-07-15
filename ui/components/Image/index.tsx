import React, { useState, useEffect, useMemo } from 'react';
import {
  ImageDataType,
  IMAGE_SOURCE_INTERNAL,
  IMAGE_SOURCE_EXTERNAL,
} from '@make.org/types';
import { useDevicePixelRatio } from '@make.org/utils/hooks/useMedia';

const imageflowQueryParams = (
  width?: number,
  height?: number,
  crop?: boolean
) => `?w=${width || ''}&h=${height || ''}&mode=${crop ? 'crop' : 'pad'}`;

type Props = {
  /** image source */
  src: string | ImageDataType;
  /** image className */
  className: string;
  /** image alternative */
  alt: string;
  /** image src set */
  srcSet: string;
  /** image width */
  width: number;
  /** Image height */
  height: number;
  /** image key */
  key: string | number;
  /** image loading */
  loading: 'eager' | 'lazy' | undefined;
  /** image loading */
  crop: boolean;
};

const isInternalSourceUrl = (url: string): boolean => {
  const formatedUrl = url.toLowerCase();
  return (
    formatedUrl.toLowerCase().includes('assets') &&
    formatedUrl.toLowerCase().includes('make')
  );
};

const isImageSupportedByImageFlow = (url: string): boolean => {
  const regex = /\.(jpg|jpeg|gif|png)($|\?)/;
  return regex.test(url.toLowerCase());
};

const getImageFlowSrcs = (
  url: string,
  width: number,
  height: number,
  crop: boolean
) => {
  if (!url) {
    return { src1x: '' };
  }
  if (!width && !height) {
    return { src1x: url };
  }
  if (!isImageSupportedByImageFlow(url)) {
    return { src1x: url };
  }
  const src = url.replace(/\?.*/g, "$'");
  const paramsSrc1x = imageflowQueryParams(width, height, crop);
  const paramsSrc2x = imageflowQueryParams(width * 2, height * 2, crop);
  const paramsSrc3x = imageflowQueryParams(width * 3, height * 3, crop);

  return {
    src1x: `${src}${paramsSrc1x}`,
    src2x: `${src}${paramsSrc2x}`,
    src3x: `${src}${paramsSrc3x}`,
    srcSetValue: `${src}${paramsSrc2x} 2x, ${src}${paramsSrc3x} 3x`,
  };
};

const toImageData = (src: string, alt: string) => ({
  url: src,
  alt,
  source: isInternalSourceUrl(src)
    ? IMAGE_SOURCE_INTERNAL
    : IMAGE_SOURCE_EXTERNAL,
});

const defaultPlaceHolderImage =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAQAAAAHUWYVAAABKklEQVR42u3RMQEAAAjDMObfLQbABAdHKqFJT+lRAQJEQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAREQIAICBABASIgQAQEiAlABASIgAARECACAkRABASIgAARECACAkRABASIgAARECACAkRABASIgAARECACAkRABASIgAARECACAkRABASIgAARECACAkRABASIgAARECACAkRABASIgAARECACAkRABASIgAARECACAkRAgAABIiBABASIgAARECACIiBABASIgAARECACIiBABASILluohIUgz8ZhMAAAAABJRU5ErkJggg==';

const selectImageToLoad = (
  ratio: number,
  src1x: string,
  src2x?: string,
  src3x?: string
) => {
  if (ratio === 2 && src2x) {
    return src2x;
  }
  if (ratio === 3 && src3x) {
    return src3x;
  }

  return src1x;
};

export const getSrcValues = (
  useImageFlow: boolean,
  url: string,
  width: number,
  height: number,
  crop: boolean
): {
  src1x: string;
  placeHolder: string;
  src2x?: string;
  src3x?: string;
  srcSetValue?: string;
} => {
  if (!useImageFlow) {
    return {
      src1x: url,
      placeHolder: defaultPlaceHolderImage,
    };
  }

  const srcs = getImageFlowSrcs(url, width, height, crop);
  const sep = srcs.src1x.includes('?') ? '&' : '?';

  return {
    ...srcs,
    placeHolder: `${srcs.src1x}${sep}zoom=0.1`,
  };
};

export const Image: React.FC<Props> = ({
  width,
  height,
  key,
  className,
  src,
  alt,
  srcSet = '',
  loading,
  crop,
}) => {
  // @toDo: src can be an imageData object or a string
  const imgData = useMemo(() => {
    if (typeof src === 'string') {
      return toImageData(src, alt);
    }
    return src;
  }, [src, alt]);
  const { url, source } = imgData;
  const altCurrent = alt || imgData.alt || '';
  const ratio = useDevicePixelRatio();

  const {
    src1x,
    src2x,
    src3x,
    srcSetValue = '',
    placeHolder,
  } = useMemo(
    () => {
      const result = getSrcValues(
        source === IMAGE_SOURCE_INTERNAL,
        url,
        width,
        height,
        crop
      );
      return result;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [url, width, height]
  );

  const [srcCurrent, setSrcCurrent] = useState(placeHolder);
  const [srcSetCurrent, setSrcSetCurrent] = useState<string>(srcSet);

  const imageToLoad = useMemo(
    () => selectImageToLoad(ratio, src1x, src2x, src3x),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ratio, src1x]
  );

  useEffect(() => {
    const img = new window.Image();
    if (imageToLoad) {
      img.src = imageToLoad;
      img.onload = () => {
        setSrcCurrent(src1x);
        setSrcSetCurrent(srcSet || srcSetValue);
      };
    }

    return () => {
      img.src = '';
    };
  }, [imageToLoad, src1x, srcSet, srcSetValue]);

  return (
    <>
      {srcCurrent && (
        <img
          src={srcCurrent}
          srcSet={srcSetCurrent}
          alt={altCurrent}
          key={key}
          className={className}
          loading={loading}
          width={width ? `${width}` : ''}
          height={height ? `${height}` : ''}
        />
      )}
      {imageToLoad && (
        <noscript>
          <img
            src={imageToLoad}
            alt={altCurrent}
            width={width ? `${width}` : ''}
            height={height ? `${height}` : ''}
          />
        </noscript>
      )}
    </>
  );
};
