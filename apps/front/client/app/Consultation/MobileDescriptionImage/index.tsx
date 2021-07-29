import React, { FC } from 'react';
import { QuestionType } from '@make.org/types';
import { useScreenWidth } from '@make.org/utils/hooks/useMedia';
import { useAppContext } from '@make.org/store';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { MobileDescriptionImageStyle } from '../Styled/Presentation';

type Props = {
  question: QuestionType;
};

export const MobileDescriptionImage: FC<Props> = ({ question }) => {
  const { state } = useAppContext();
  const { device } = state.appConfig;
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
