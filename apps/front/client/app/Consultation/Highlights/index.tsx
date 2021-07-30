import React, { FC } from 'react';
import { QuestionType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { Image } from '@make.org/ui/components/Image';
import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { Figures } from './Figures';
import {
  HigthlightsColumnStyle,
  HigthlightsWrapperStyle,
  ImageWrapperStyle,
} from './style';
import { Progress } from './Progress';

export const ParticipateHighlights: FC = () => {
  const { state } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);
  const { device } = state.appConfig;
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
              src={question.descriptionImage || ''}
              alt={question.descriptionImageAlt || ''}
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
