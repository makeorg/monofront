import React from 'react';
import { type StateRoot } from 'Shared/store/types';
import { type QuestionType } from 'Shared/types/question';
import { useSelector } from 'react-redux';
import { selectCurrentQuestion } from 'Shared/store/selectors/questions.selector';
import { Image } from 'Client/ui/Image';
import { matchDesktopDevice } from 'Shared/helpers/styled';
import { Figures } from './Figures';
import {
  HigthlightsColumnStyle,
  HigthlightsWrapperStyle,
  ImageWrapperStyle,
} from './style';
import { Progress } from './Progress';

export const ParticipateHighlights = () => {
  const question: QuestionType = useSelector((state: StateRoot) =>
    selectCurrentQuestion(state)
  );
  const { device } = useSelector((state: StateRoot) => state.appConfig);
  const isDesktop = matchDesktopDevice(device);

  return (
    <HigthlightsWrapperStyle>
      <HigthlightsColumnStyle className="half">
        <HigthlightsColumnStyle className="right-spacing left-spacing">
          <Figures />
        </HigthlightsColumnStyle>
        <HigthlightsColumnStyle className="right-spacing">
          <Progress />
        </HigthlightsColumnStyle>
      </HigthlightsColumnStyle>
      {isDesktop && (
        <HigthlightsColumnStyle className="half left-spacing">
          <ImageWrapperStyle>
            <Image
              src={question.descriptionImage}
              alt={question.descriptionImageAlt}
              width={555}
              height={331}
              crop
            />
          </ImageWrapperStyle>
        </HigthlightsColumnStyle>
      )}
    </HigthlightsWrapperStyle>
  );
};
