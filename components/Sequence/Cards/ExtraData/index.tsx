import {
  buildDemographicsByType,
  setTitleByType,
  DEMOGRAPHIC_TYPES,
} from '@make.org/utils/helpers/demographics';
import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { DemographicNameType, DemographicsType } from '@make.org/types';
import { AGE_RANGES } from '@make.org/utils/constants/demographics';
import { getRandomFromArray } from '@make.org/utils/helpers/randomFromArray';
import { SequenceIntroParagraphStyle, SequenceWrapperStyle } from '../style';
import { ExtraDataDescriptionStyle } from './style';
import { SubmittedDemographics } from './SubmittedStep';
import { ExtraDataForm } from './Form';

export const ExtraDataCard: React.FC = () => {
  const { state } = useAppContext();
  const { currentQuestion = '' } = state;
  const persistedDemographics = state.sequence.demographics;
  const [type, setType] = useState<DemographicNameType>('age');
  const [demographics, setDemographics] = useState<DemographicsType>({
    ui: 'radio',
    data: AGE_RANGES,
  });

  // set a random type
  useEffect(() => {
    const newType = getRandomFromArray(DEMOGRAPHIC_TYPES);
    setType(newType);
    setDemographics(buildDemographicsByType(newType));
  }, [type]);

  if (
    typeof persistedDemographics !== 'undefined' &&
    !!persistedDemographics.type &&
    !!persistedDemographics.value
  ) {
    return <SubmittedDemographics type={persistedDemographics.type} />;
  }

  if (type && demographics) {
    return (
      <SequenceWrapperStyle data-cy-demographic-type={type}>
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
      </SequenceWrapperStyle>
    );
  }

  return null;
};
