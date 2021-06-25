import {
  buildDemographicsByType,
  setTitleByType,
  DEMOGRAPHIC_TYPES,
} from '@make.org/utils/helpers/demographics';
import React, { useEffect, useState } from 'react';
import { i18n } from '@make.org/utils/i18n';
import { useAppContext } from '@make.org/store';
import { SequenceIntroParagraphStyle } from '../style';
import { ExtraDataDescriptionStyle } from './style';

// REST TO DO
import { SubmittedDemographics } from './SubmittedStep';
import { ExtraDataForm } from './Form';

export const ExtraDataCard: React.FC = () => {
  const { state } = useAppContext();
  const getRandomType = () => {
    const randomValue = Math.round(
      Math.random() * (DEMOGRAPHIC_TYPES.length - 1)
    );

    return DEMOGRAPHIC_TYPES[randomValue];
  };
  const { currentQuestion } = state;
  const persistedDemographics = state.sequence.demographics;
  const [type, setType] = useState(null);
  const [demographics, setDemographics] = useState(null);
  const persistedDemographicsWithValue =
    persistedDemographics?.type && persistedDemographics?.value;

  // set a random type
  useEffect(() => {
    const newType = getRandomType();
    setType(newType);
    setDemographics(buildDemographicsByType(newType));
  }, [type]);

  if (persistedDemographicsWithValue) {
    return <SubmittedDemographics type={persistedDemographics.type} />;
  }

  if (type) {
    return (
      <>
        <SequenceIntroParagraphStyle>
          {setTitleByType(type)}
        </SequenceIntroParagraphStyle>
        <ExtraDataDescriptionStyle>
          {i18n.t('demographics_card.disclaimer')}
        </ExtraDataDescriptionStyle>
        <ExtraDataForm
          type={type}
          demographics={demographics}
          currentQuestion={currentQuestion}
        />
      </>
    );
  }

  return null;
};