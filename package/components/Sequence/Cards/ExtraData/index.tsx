import React, { FC } from 'react';
import { DemographicDataType } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import { Logger } from '@make.org/utils/services/Logger';
import i18n from 'i18next';
import { setDemographicsAsSubmitted } from '@make.org/store/actions/sequence';
import { MiddleColumnStyle } from '@make.org/ui/elements/FlexElements';
import { ExtraDataForm } from './Form';
import { ExtraDataTitleStyle, ExtraDataDescriptionStyle } from './style';
import { SubmittedDemographics } from './SubmittedStep';

type Props = {
  configuration: DemographicDataType;
};

export const ExtraDataCard: FC<Props> = ({ configuration }) => {
  const { state, dispatch } = useAppContext();
  const isSubmitted = state.sequence.demographics.submitted;

  // set demographics
  if (!configuration) {
    Logger.logError({
      message: 'No demographic data found',
      name: 'sequence',
      configuration,
    });

    return null;
  }

  const { id, name, layout, title, parameters, token, sessionBindingMode } =
    configuration;

  const submitSuccess = () => {
    dispatch(setDemographicsAsSubmitted());
  };

  return isSubmitted ? (
    <SubmittedDemographics title={title} name={name} demographicId={id} />
  ) : (
    <MiddleColumnStyle data-cy-demographic-layout={configuration.layout}>
      <ExtraDataTitleStyle>{title}</ExtraDataTitleStyle>
      <ExtraDataDescriptionStyle>
        {i18n.t('demographics_card.disclaimer')}
      </ExtraDataDescriptionStyle>
      <ExtraDataForm
        demographicId={id}
        name={name}
        layout={layout}
        data={parameters}
        token={token}
        sessionBindingMode={sessionBindingMode}
        submitSuccess={submitSuccess}
      />
    </MiddleColumnStyle>
  );
};
