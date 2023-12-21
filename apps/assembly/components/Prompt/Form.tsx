import React, {
  ChangeEvent,
  FC,
  FormEventHandler,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';
import i18n from 'i18next';
import { throttle } from '@make.org/utils/helpers/throttle';
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
import { StreamTranscript } from './Stream';

export const PromptForm: FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [stopStreaming, setStopStreaming] = useState<boolean>(false);

  const handleSubmit: FormEventHandler<HTMLButtonElement | HTMLFormElement> = (
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setStopStreaming(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setQuestion(e.target.value);
  };

  const { isWaiting } = StreamTranscript(question, isSubmitted, stopStreaming);

  useEffect(() => {
    if (!isWaiting) {
      setIsSubmitted(false);
    }
  }, [isWaiting]);

  return (
    <>
      <PromptFormContainerStyle onSubmit={handleSubmit}>
        <PromptFormInputStyle
          type="text"
          required
          minLength={10}
          maxLength={300}
          placeholder={i18n.t('prompt.request_send')}
          onChange={throttle(handleChange)}
        />
        <PromptFormButtonsContainerStyle>
          {isSubmitted && (
            <PromptFormSubmitStyle type="button">
              <PromptFormButtonArrowStyle
                src={stopButton}
                alt={i18n.t('prompt.cancel')}
                onClick={() => {
                  setStopStreaming(true);
                  setIsSubmitted(true);
                }}
              />
            </PromptFormSubmitStyle>
          )}
          <PromptFormSubmitStyle type="submit" disabled={isSubmitted}>
            <PromptFormButtonArrowStyle
              src={isSubmitted ? disabledButton : submitButton}
              alt={
                isSubmitted
                  ? i18n.t('prompt.disabled')
                  : i18n.t('prompt.submit')
              }
            />
          </PromptFormSubmitStyle>
        </PromptFormButtonsContainerStyle>
      </PromptFormContainerStyle>
      <PromptFormWarningText>{i18n.t('prompt.warning')}</PromptFormWarningText>
    </>
  );
};
