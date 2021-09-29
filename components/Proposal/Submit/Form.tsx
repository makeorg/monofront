import React, { useEffect, useRef } from 'react';
import { QuestionType } from '@make.org/types';
import { FORM, URL } from '@make.org/types/enums';
import { MAX_PROPOSAL_LENGTH } from '@make.org/utils/constants/proposal';
import i18n from 'i18next';
import {
  getLocalizedBaitText,
  proposalHasValidLength,
} from '@make.org/utils/helpers/proposal';
import {
  trackDisplayProposalField,
  trackClickProposalSubmit,
  trackClickModerationLink,
} from '@make.org/utils/services/Tracking';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { throttle } from '@make.org/utils/helpers/throttle';
import { LoadingDots } from '@make.org/ui/components/Loading/Dots';
import { useAppContext } from '@make.org/store';
import {
  ProposalStepWrapperStyle,
  ProposalStepTitleStyle,
  ProposalTextareaStyle,
  ProposalFieldWrapperStyle,
  ProposalCharCountStyle,
  ProposalExternalLinkStyle,
  ProposalExternalLinkIconStyle,
  ProposalCancelButtonStyle,
  ProposalButtonsWrapperStyle,
  ProposalAuthInlineWrapperStyle,
  ProposalSubmitButtonsWidgetStyle,
} from './style';

type Props = {
  proposalContent: string;
  handleValueChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setProposalContent: (arg: string) => void;
  handleFieldFocus: () => void;
  handleCancel: () => void;
  handleSubmit: () => void;
  waitingApiCallback: boolean;
};

const getModerationLinkByLanguage = (language: string) => {
  switch (language) {
    case 'fr':
      return URL.MODERATION_CHARTER_FR_LINK;
    case 'de':
      return URL.MODERATION_CHARTER_DE_LINK;
    default:
      return URL.MODERATION_CHARTER_EN_LINK;
  }
};

export const ProposalForm: React.FC<Props> = ({
  proposalContent,
  setProposalContent,
  handleValueChange,
  handleFieldFocus,
  handleCancel,
  handleSubmit,
  waitingApiCallback,
}) => {
  const { state } = useAppContext();
  const { source } = state.appConfig;
  const isWidget = source === 'widget';
  const inputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const question: QuestionType | null = selectCurrentQuestion(state);
  const { language } = state.appConfig;
  const proposalIsEmpty = proposalContent.length === 0;
  const baitText = getLocalizedBaitText(
    question?.language || '',
    question?.questionId || ''
  );
  const charCounting = proposalIsEmpty
    ? baitText?.length
    : proposalContent.length;
  const disableSubmitButton =
    !proposalHasValidLength(proposalContent.length) || waitingApiCallback;

  const secureFieldValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleValueChange(event);
    if (inputRef && typeof inputRef.current !== 'undefined') {
      const { selectionStart = 0 } = inputRef.current;
      if (!!selectionStart && selectionStart < baitText.length) {
        setProposalContent(baitText);
      }
    }
  };

  useEffect(() => {
    trackDisplayProposalField();
  }, []);

  const link = (
    <ProposalAuthInlineWrapperStyle>
      {i18n.t('proposal_submit.form.read_our')}{' '}
      <ProposalExternalLinkStyle
        href={getModerationLinkByLanguage(language)}
        target="_blank"
        rel="noopener"
        onClick={trackClickModerationLink}
      >
        {i18n.t('proposal_submit.form.moderation_link')}
        <> </>
        <ProposalExternalLinkIconStyle aria-hidden focusable="false" />
        <ScreenReaderItemStyle>
          {i18n.t('common.open_new_window')}
        </ScreenReaderItemStyle>
      </ProposalExternalLinkStyle>
    </ProposalAuthInlineWrapperStyle>
  );

  const buttons = (
    <ProposalButtonsWrapperStyle>
      <ProposalCancelButtonStyle
        type="button"
        onClick={handleCancel}
        data-cy-button="proposal-form-cancel"
      >
        {i18n.t('proposal_submit.form.button_cancel')}
      </ProposalCancelButtonStyle>
      <RedButtonStyle
        type="submit"
        form={FORM.PROPOSAL_SUBMIT_FORMNAME}
        onClick={trackClickProposalSubmit}
        disabled={disableSubmitButton}
        data-cy-button="proposal-submit"
      >
        {waitingApiCallback ? (
          <LoadingDots isWidget={isWidget} />
        ) : (
          i18n.t('proposal_submit.form.button_submit')
        )}
      </RedButtonStyle>
    </ProposalButtonsWrapperStyle>
  );

  return (
    <ProposalStepWrapperStyle data-cy-container={FORM.PROPOSAL_SUBMIT_FORMNAME}>
      <form
        id={FORM.PROPOSAL_SUBMIT_FORMNAME}
        name={FORM.PROPOSAL_SUBMIT_FORMNAME}
        onSubmit={throttle(handleSubmit)}
      >
        <ProposalStepTitleStyle className="with-margin-bottom">
          {question && question.question}
        </ProposalStepTitleStyle>
        <ScreenReaderItemStyle>
          {i18n.t('proposal_submit.form.title')}
        </ScreenReaderItemStyle>
        <ProposalFieldWrapperStyle>
          <ScreenReaderItemStyle as="label" htmlFor="proposal">
            {i18n.t('proposal_submit.form.field')}
          </ScreenReaderItemStyle>
          <ProposalTextareaStyle
            ref={inputRef}
            name="proposal"
            id="proposal"
            data-cy-field="proposal"
            value={proposalContent}
            onChange={secureFieldValue}
            onFocus={handleFieldFocus}
            autoCapitalize="none"
            autoComplete="off"
            placeholder={`${baitText} ...`}
            rows={6}
            spellCheck
            maxLength={MAX_PROPOSAL_LENGTH}
            lang={question ? question.language : ''}
          />
          <ProposalCharCountStyle aria-hidden data-cy-container="char-count">
            {`${charCounting} / ${MAX_PROPOSAL_LENGTH}`}
          </ProposalCharCountStyle>
          <ScreenReaderItemStyle aria-live="polite">
            {i18n.t('proposal_submit.form.counter', {
              current: proposalContent.length,
              total: MAX_PROPOSAL_LENGTH,
            })}
          </ScreenReaderItemStyle>
        </ProposalFieldWrapperStyle>
        <ProposalSubmitButtonsWidgetStyle>
          {link}
          {buttons}
        </ProposalSubmitButtonsWidgetStyle>
      </form>
    </ProposalStepWrapperStyle>
  );
};
