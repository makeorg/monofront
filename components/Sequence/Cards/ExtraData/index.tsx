import React, { FC } from 'react';
import { DemographicDataType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import { Logger } from '@make.org/utils/services/Logger';
import i18n from 'i18next';
import { setDemographicsAsSubmitted } from '@make.org/store/actions/sequence';
import { SequenceWrapperStyle, SequenceIntroParagraphStyle } from '../style';
import { ExtraDataForm } from './Form';
import { ExtraDataDescriptionStyle } from './style';
import { SubmittedDemographics } from './SubmittedStep';

type Props = {
  configuration: DemographicDataType;
};

export const ExtraDataCard: FC<Props> = ({ configuration }) => {
  const { state, dispatch } = useAppContext();
  const isSubmitted = state.sequence.demographics?.submitted;
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  // set demographics
  if (!configuration) {
    Logger.logError({
      message: 'No demographic data found',
      name: 'sequence',
      configuration,
    });

    return null;
  }

  const { id, name, layout, title, parameters, token } = configuration;

  const submitSuccess = () => {
    dispatch(setDemographicsAsSubmitted());
  };

  return isSubmitted ? (
    <SubmittedDemographics title={title} name={name} demographicId={id} />
  ) : (
    <SequenceWrapperStyle data-cy-demographic-layout={configuration.layout}>
      <div>
        <SequenceIntroParagraphStyle>{title}</SequenceIntroParagraphStyle>
        <ExtraDataDescriptionStyle className={isWidget ? 'widget' : ''}>
          {i18n.t('demographics_card.disclaimer')}
        </ExtraDataDescriptionStyle>
      </div>
      <ExtraDataForm
        demographicId={id}
        name={name}
        layout={layout}
        data={parameters}
        token={token}
        submitSuccess={submitSuccess}
      />
    </SequenceWrapperStyle>
  );
};
