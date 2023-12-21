import React, { FC, useState } from 'react';
import i18n from 'i18next';
import submitButton from '../../assets/sendButton.png';
import disabledButton from '../../assets/sendButtonInactive.png';
import stopButton from '../../assets/sendButtonStop.png';
import {
  PromptFormContainerStyle,
  PromptFormInputStyle,
  PromptFormButtonsContainerStyle,
  PromptFormSubmitStyle,
  PromptFormButtonArrowStyle,
  PromptFormWarningText,
} from './style';

export const PromptForm: FC = () => {
  const [canSubmit, setCanSubmit] = useState(true);

  const handleSubmit: React.FormEventHandler<
    HTMLButtonElement | HTMLFormElement
  > = async event => {
    event.preventDefault();

    setCanSubmit(!canSubmit);
  };

  return (
    <>
      <PromptFormContainerStyle onSubmit={handleSubmit}>
        <PromptFormInputStyle placeholder={i18n.t('prompt.request_send')} />
        <PromptFormButtonsContainerStyle>
          {!canSubmit && (
            <PromptFormSubmitStyle type="button">
              <PromptFormButtonArrowStyle
                src={stopButton}
                alt={i18n.t('prompt.cancel')}
                onClick={() => setCanSubmit(true)}
              />
            </PromptFormSubmitStyle>
          )}

          <PromptFormSubmitStyle type="submit" disabled={!canSubmit}>
            <PromptFormButtonArrowStyle
              src={canSubmit ? submitButton : disabledButton}
              alt={
                canSubmit ? i18n.t('prompt.submit') : i18n.t('prompt.disabled')
              }
            />
          </PromptFormSubmitStyle>
        </PromptFormButtonsContainerStyle>
      </PromptFormContainerStyle>
      <PromptFormWarningText>{i18n.t('prompt.warning')}</PromptFormWarningText>
    </>
  );
};
