import React, { FC, useState, useRef, useEffect } from 'react';
import { useSlider } from '@make.org/utils/hooks/useSlider';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { ChunkType } from '../../types';
import { Sources } from './Sources';
import { SourcesContainerStyle } from './style';

export const SourcesMobile: FC<{
  chunks: ChunkType[];
}> = ({ chunks }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [initSlider, setInitSlider] = useState(false);

  useEffect(() => {
    if (!sliderRef.current) {
      return;
    }

    setInitSlider(true);
  }, [!sliderRef.current]);

  useSlider(
    sliderRef,
    {
      slidesToScroll: 1,
      slidesToShow: 1.5,
      draggable: true,
    },
    initSlider
  );

  return (
    <SourcesContainerStyle>
      <div className="glider-contain">
        <div ref={sliderRef} className="glider">
          <UnstyledListStyle className="glider-track">
            <Sources chunks={chunks} />
          </UnstyledListStyle>
        </div>
      </div>
    </SourcesContainerStyle>
  );
};
