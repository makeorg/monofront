import React, { useEffect, useRef } from 'react';
import { QuestionType } from '@make.org/types';
import { PROPOSAL_SUBMIT_FORMNAME } from '@make.org/utils/constants/form';
import { MAX_PROPOSAL_LENGTH } from '@make.org/utils/constants/proposal';
import { i18n } from '@make.org/utils/i18n';
import {
  getLocalizedBaitText,
  proposalHasValidLength,
} from '@make.org/utils/helpers/proposal';
import {
  MODERATION_CHARTER_FR_LINK,
  MODERATION_CHARTER_EN_LINK,
} from '@make.org/utils/constants/url';
import {
  trackDisplayProposalField,
  trackClickProposalSubmit,
  trackClickModerationLink,
} from '@make.org/utils/services/Tracking';

import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { SpaceBetweenRowStyle } from '@make.org/ui/elements/FlexElements';
import {
  GreyNoBackgroundButtonStyle,
  RedButtonStyle,
} from '@make.org/ui/elements/Buttons/style';

import { throttle } from '@make.org/utils/helpers/throttle';

import { LoadingDots } from '@make.org/ui/elements/Loading/Dots';
import {
  ProposalStepWrapperStyle,
  ProposalStepTitleStyle,
  ProposalTextareaStyle,
  ProposalFieldWrapperStyle,
  ProposalCharCountStyle,
  ProposalExternalLinkStyle,
  ProposalExternalLinkIconStyle,
} from './style';
import { useAppContext } from '../../../store';

type Props = {
  proposalContent: string;
  handleValueChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  setProposalContent: (arg: string) => void;
  handleFieldFocus: () => void;
  handleCancel: () => void;
  handleSubmit: () => void;
  waitingApiCallback: boolean;
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
  const inputRef = useRef();
  const question: QuestionType = selectCurrentQuestion(state);
  const { country } = state.appConfig;
  const proposalIsEmpty = proposalContent.length === 0;
  const baitText = getLocalizedBaitText(
    question?.language,
    question?.questionId
  );
  const isFR = country === 'FR';
  const charCounting = proposalIsEmpty
    ? baitText?.length
    : proposalContent.length;
  const disableSubmitButton = !proposalHasValidLength(proposalContent.length) || waitingApiCallback;

  const secureFieldValue = (event) => {
    handleValueChange(event);
    if (inputRef.current && inputRef.current.selectionStart < baitText.length) {
      setProposalContent(baitText);
    }
  };

  useEffect(() => {
    trackDisplayProposalField();
  }, []);

  return (
    <ProposalStepWrapperStyle data-cy-container={PROPOSAL_SUBMIT_FORMNAME}>
      <form
        id={PROPOSAL_SUBMIT_FORMNAME}
        name={PROPOSAL_SUBMIT_FORMNAME}
        onSubmit={throttle(handleSubmit)}
      >
        <ProposalStepTitleStyle className="with-margin-bottom">
          {question.question}
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
            lang={question.language}
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
        <SpaceBetweenRowStyle>
          <GreyNoBackgroundButtonStyle
            type="button"
            onClick={handleCancel}
            data-cy-button="proposal-form-cancel"
          >
            {i18n.t('proposal_submit.form.button_cancel')}
          </GreyNoBackgroundButtonStyle>
          <RedButtonStyle
            type="submit"
            form={PROPOSAL_SUBMIT_FORMNAME}
            onClick={trackClickProposalSubmit}
            disabled={disableSubmitButton}
            data-cy-button="proposal-submit"
          >
            {waitingApiCallback ? (
              <LoadingDots />
            ) : (
              i18n.t('proposal_submit.form.button_submit')
            )}
          </RedButtonStyle>
        </SpaceBetweenRowStyle>
      </form>
      <ProposalExternalLinkStyle
        href={isFR ? MODERATION_CHARTER_FR_LINK : MODERATION_CHARTER_EN_LINK}
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
    </ProposalStepWrapperStyle>
  );
};
