// @flow
import React from 'react';
import { type StateRoot } from 'Shared/store/types';
import { type QuestionType } from 'Shared/types/question';
import { useScreenWidth } from 'Client/hooks/useMedia';
import { useSelector } from 'react-redux';
import { matchMobileDevice } from 'Shared/helpers/styled';
import { MobileDescriptionImageStyle } from '../Styled/Presentation';

type Props = {
  question: QuestionType,
};

export const MobileDescriptionImage = ({ question }: Props) => {
  const { device } = useSelector((state: StateRoot) => state.appConfig);
  const isMobile = matchMobileDevice(device);
  const screenWidth = useScreenWidth();

  return (
    <>
      {isMobile && question.descriptionImage && (
        <MobileDescriptionImageStyle
          src={question.descriptionImage}
          alt={question.descriptionImageAlt || ''}
          width={screenWidth}
        />
      )}
    </>
  );
};
