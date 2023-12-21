import React, { FC, useRef, useEffect, useState } from 'react';
import i18n from 'i18next';
import { useSlider } from '@make.org/utils/hooks/useSlider';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { useAssemblyContext } from '../../../store/context';
import { GeneratedContentType } from '../../../types';
import { Buttons, DispatchProps } from '.';
import { QueriesButtonsListStyle } from './style';

export const MobileQueries: FC<DispatchProps> = ({
  dispatchThemes,
  dispatchGeneratedContent,
}) => {
  const { state } = useAssemblyContext();
  const { generatedContents } = state;
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
    <div className="glider-contain">
      <div ref={sliderRef} className="glider">
        <UnstyledListStyle className="glider-track">
          {generatedContents.map((item: GeneratedContentType) => (
            <QueriesButtonsListStyle key={item.title}>
              <Buttons
                title={item.title}
                subtitle={item.subtitle}
                handleClick={() => {
                  dispatchGeneratedContent(item.title, item.content, item.mode);
                }}
              />
            </QueriesButtonsListStyle>
          ))}
          <QueriesButtonsListStyle>
            <Buttons
              title={i18n.t('prompt.themesDiscover')}
              subtitle={i18n.t('prompt.themes')}
              handleClick={dispatchThemes}
              theme
            />
          </QueriesButtonsListStyle>
        </UnstyledListStyle>
      </div>
    </div>
  );
};
