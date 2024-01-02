import React, {
  ChangeEvent,
  FC,
  FormEventHandler,
  SyntheticEvent,
  useState,
} from 'react';
import i18n from 'i18next';
import { throttle } from '@make.org/utils/helpers/throttle';
import { useAssemblyContext } from '../../store/context';
import submitButton from '../../assets/sendButton.png';
import disabledButton from '../../assets/sendButtonInactive.png';
import stopButton from '../../assets/sendButtonStop.png';
import { setStopStreaming } from '../../store/stream/actions';
import { TRANSCRIPT } from '../Feed';
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
  const { state, dispatch } = useAssemblyContext();
  const { isSubmitted } = state.stream;
  const [question, setQuestion] = useState<string>('');

  const { setStartStream } = StreamTranscript(question, TRANSCRIPT);

  const handleSubmit: FormEventHandler<HTMLButtonElement | HTMLFormElement> = (
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setStartStream(true);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setQuestion(e.target.value);
  };

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
                  dispatch(setStopStreaming(true));
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
