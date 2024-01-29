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
import { disableFeedStreaming } from '../../store/feed/actions';
import { TRANSCRIPT } from '../Feed';
import {
  PromptFormContainerStyle,
  PromptFormInputStyle,
  PromptFormButtonsContainerStyle,
  PromptFormSubmitStyle,
  PromptFormButtonArrowStyle,
  PromptFormWarningText,
} from './style';
import { StreamLLM } from './Stream';

export const PromptForm: FC = () => {
  const { state, dispatch } = useAssemblyContext();
  const { isStreaming } = state.feed;
  const [question, setQuestion] = useState<string>('');

  const { setStartStream } = StreamLLM(question, TRANSCRIPT);

  const handleSubmit: FormEventHandler<HTMLButtonElement | HTMLFormElement> = (
    e: SyntheticEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setStartStream(true);
    const form = e.target as HTMLFormElement;
    form.reset();
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
          {isStreaming && (
            <PromptFormSubmitStyle type="button">
              <PromptFormButtonArrowStyle
                src={stopButton}
                alt={i18n.t('prompt.cancel')}
                onClick={() => {
                  dispatch(disableFeedStreaming());
                }}
              />
            </PromptFormSubmitStyle>
          )}
          <PromptFormSubmitStyle type="submit" disabled={isStreaming}>
            <PromptFormButtonArrowStyle
              src={
                isStreaming || question.length === 0
                  ? disabledButton
                  : submitButton
              }
              alt={
                isStreaming
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
