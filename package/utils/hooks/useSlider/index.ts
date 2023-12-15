import { RefObject, useEffect } from 'react';
import { SliderParamsType } from '@make.org/types';
import Glider from 'glider-js';
import {
  setAriaHidden,
  handleVisibleSlides,
  setActiveSlide,
  setA11yRules,
  focusActiveSlide,
  resetActiveSlide,
  setCounter,
} from './a11y';

export const useSlider = (
  sliderRef: RefObject<HTMLDivElement>,
  sliderParams: SliderParamsType,
  canBeInitialize: boolean
): void => {
  let gliderElement: any;
  useEffect(() => {
    if (!canBeInitialize || !sliderRef.current) {
      return undefined;
    }

    // Get slider dom node
    const glider = sliderRef.current;
    // Check if slides has interactive elements as children
    const { interactiveChildren } = sliderParams;

    // Init slider with custom params
    // eslint-disable-next-line react-hooks/exhaustive-deps
    gliderElement = new Glider(sliderRef.current, {
      slidesToShow: sliderParams.slidesToShow || 'auto',
      slidesToScroll: sliderParams.slidesToScroll || 1,
      skipTrack: true,
      arrows: sliderParams.arrows || {},
      responsive: sliderParams.responsive || [],
      draggable: sliderParams.draggable || false,
    });

    /* Handling a11y rules for slider
     * Default rules after slider intit
     * */
    setAriaHidden(glider);
    handleVisibleSlides(glider);
    setActiveSlide(glider);
    setA11yRules(glider, interactiveChildren);

    // Handling a11y rules when a slide is shown
    glider.addEventListener(`glider-slide-visible`, (event: any) => {
      event.preventDefault();
      setActiveSlide(glider);
      focusActiveSlide(glider);
      handleVisibleSlides(glider);
      setA11yRules(glider, interactiveChildren);
      if (sliderParams.counterName) {
        setCounter(sliderParams.counterName, event.detail.slide);
      }
    });

    // Handling a11y rules  when a slide is hidden
    glider.addEventListener(`glider-slide-hidden`, (event: any) => {
      event.preventDefault();
      resetActiveSlide(glider);
      setAriaHidden(glider);
      setA11yRules(glider, interactiveChildren);
    });

    return () => gliderElement.destroy();
  }, [!canBeInitialize]);

  return gliderElement;
};
