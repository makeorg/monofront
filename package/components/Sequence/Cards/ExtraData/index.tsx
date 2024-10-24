import React, { FC } from 'react';
import { DemographicDataType, ILogger } from '@make.org/types';
import { useAppContext } from '@make.org/store';
import i18n from 'i18next';
import { setDemographicsAsSubmitted } from '@make.org/store/actions/sequence';
import { MiddleColumnStyle } from '@make.org/ui/elements/FlexElements';
import { setDemographicsCookie } from '@make.org/utils/helpers/clientCookies';
import { ExtraDataForm } from './Form';
import { ExtraDataTitleStyle, ExtraDataDescriptionStyle } from './style';
import { SubmittedDemographics } from './SubmittedStep';

type Props = {
  configuration: DemographicDataType;
  logger: ILogger;
};

export const ExtraDataCard: FC<Props> = ({ configuration, logger }) => {
  const { state, dispatch } = useAppContext();
  const { sequence } = state;
  const { source } = state.appConfig;
  const isSubmitted = state.sequence.demographics.submitted?.find(
    id => id === configuration.id
  );
  const isWidget = source === 'widget';

  // set demographics
  if (!configuration) {
    logger.logError({
      message: 'No demographic data found',
      name: 'sequence',
      configuration,
    });

    return null;
  }
  const { id, name, layout, title, parameters, token } = configuration;

  const submitSuccess = () => {
    dispatch(setDemographicsAsSubmitted(configuration.id));
    if (!isWidget) {
      setDemographicsCookie();
    }
  };

  return isSubmitted ? (
    <SubmittedDemographics
      title={title}
      name={name}
      demographicId={id}
      sessionBindingMode={sequence.sessionBindingMode}
    />
  ) : (
    <MiddleColumnStyle data-cy-demographic-layout={configuration.layout}>
      <ExtraDataTitleStyle>{title}</ExtraDataTitleStyle>
      <ExtraDataDescriptionStyle>
        {sequence.sessionBindingMode
          ? ''
          : i18n.t('demographics_card.disclaimer')}
      </ExtraDataDescriptionStyle>
      <ExtraDataForm
        demographicId={id}
        name={name}
        layout={layout}
        data={parameters}
        token={token}
        sessionBindingMode={sequence.sessionBindingMode}
        submitSuccess={submitSuccess}
        logger={logger}
      />
    </MiddleColumnStyle>
  );
};
