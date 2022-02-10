import React, { FC, useEffect, useRef, useState } from 'react';
import { QuestionType } from '@make.org/types';
import { FORM } from '@make.org/types/enums';
import { MAX_PROPOSAL_LENGTH } from '@make.org/utils/constants/proposal';
import i18n from 'i18next';
import {
  getLocalizedBaitText,
  proposalHasValidLength,
} from '@make.org/utils/helpers/proposal';
import { getModerationLinkByLanguage } from '@make.org/utils/helpers/url';
import {
  trackDisplayProposalField,
  trackClickProposalSubmit,
  trackClickModerationLink,
} from '@make.org/utils/services/Tracking';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { throttle } from '@make.org/utils/helpers/throttle';
import { useAppContext } from '@make.org/store';
import { setPanelContent } from '@make.org/store/actions/panel';
import { UntypedInput } from '@make.org/components/Form/UntypedInput';
import { initProposalPending } from '@make.org/store/actions/pendingProposal';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { ProposalService } from '@make.org/utils/services/Proposal';
import { NameFiledIcon } from '@make.org/utils/constants/icons';
import BlueShape from '@make.org/assets/images/blueShape.png';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { ProposalSuccess } from '@make.org/components/Proposal/Submit/Success';
import {
  ProposalImagesWrapperStyle,
  ProposalFormWrapperStyle,
  ProposalStepTitleStyle,
  ProposalTextareaStyle,
  ProposalFieldWrapperStyle,
  ProposalCharCountStyle,
  ProposalExternalLinkStyle,
  ProposalExternalLinkIconStyle,
  ProposalButtonsWrapperStyle,
  ProposalAuthInlineWrapperStyle,
  ProposalSubmitButtonsWidgetStyle,
  ProposalStepMandatoryStyle,
  ProposalStepLabelStyle,
  ProposalStepWrapperStyle,
  BlueShapeImageStyle,
  BlueManOnBench,
} from './style';

export const ProposalForm: FC = () => {
  const { state, dispatch } = useAppContext();
  const [proposalContent, setProposalContent] = useState(
    state.pendingProposal.proposalContent || ''
  );
  const [firstname, setFirstname] = useState(
    state.pendingProposal.firstname || ''
  );
  const inputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const question: QuestionType | null = selectCurrentQuestion(state);
  const { isLoggedIn } = selectAuthentication(state);
  const { language, device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const proposalIsEmpty = proposalContent.length === 0;
  const baitText = getLocalizedBaitText(question.language, question.questionId);
  const charCounting = proposalIsEmpty
    ? baitText?.length
    : proposalContent.length;

  const disableSubmitButton = !proposalHasValidLength(proposalContent.length);

  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  const handleFieldFocus = () => {
    if (proposalContent.length === 0) {
      setProposalContent(baitText);
    }
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (proposalContent.length < baitText.length) {
      return setProposalContent(baitText);
    }
    return setProposalContent(event.currentTarget.value);
  };

  const handleFirstnameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirstname(event.target.value);
  };

  const secureFieldValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    handleValueChange(event);
    if (inputRef && typeof inputRef.current !== 'undefined') {
      const { selectionStart = 0 } = inputRef.current;
      if (!!selectionStart && selectionStart < baitText.length) {
        setProposalContent(baitText);
      }
    }
  };

  const handleSubmitForm = async () => {
    if (isLoggedIn) {
      await ProposalService.propose(proposalContent, question.questionId, () =>
        dispatch(setPanelContent(<ProposalSuccess />))
      );
    }

    dispatch(initProposalPending(proposalContent, firstname));
  };

  useEffect(() => {
    trackDisplayProposalField();
  }, []);

  return (
    <>
      <ProposalStepWrapperStyle isAuthentication={false} isWidget={isWidget}>
        <ProposalFormWrapperStyle
          isWidget={isWidget}
          data-cy-container={FORM.PROPOSAL_SUBMIT_FORMNAME}
        >
          <form
            id={FORM.PROPOSAL_SUBMIT_FORMNAME}
            name={FORM.PROPOSAL_SUBMIT_FORMNAME}
            onSubmit={throttle(handleSubmitForm)}
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
              {!isLoggedIn && (
                <>
                  <ProposalStepMandatoryStyle>
                    {i18n.t('proposal_submit.form.mandatory_field')}
                  </ProposalStepMandatoryStyle>
                  <UntypedInput
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstname}
                    icon={NameFiledIcon}
                    label={i18n.t('common.form.label.firstname')}
                    required
                    handleChange={handleFirstnameChange}
                  />
                </>
              )}
              <ProposalStepLabelStyle className="with-margin-bottom">
                {i18n.t('proposal_submit.form.proposal')}
              </ProposalStepLabelStyle>
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
              <ProposalCharCountStyle
                aria-hidden
                data-cy-container="char-count"
              >
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
              <ProposalButtonsWrapperStyle>
                <RedButtonStyle
                  type="submit"
                  form={FORM.PROPOSAL_SUBMIT_FORMNAME}
                  onClick={trackClickProposalSubmit}
                  disabled={disableSubmitButton}
                  data-cy-button="proposal-submit"
                >
                  {i18n.t('proposal_submit.form.button_propose')}
                </RedButtonStyle>
              </ProposalButtonsWrapperStyle>
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
                  <ProposalExternalLinkIconStyle
                    aria-hidden
                    focusable="false"
                  />
                  <ScreenReaderItemStyle>
                    {i18n.t('common.open_new_window')}
                  </ScreenReaderItemStyle>
                </ProposalExternalLinkStyle>
              </ProposalAuthInlineWrapperStyle>
            </ProposalSubmitButtonsWidgetStyle>
          </form>
        </ProposalFormWrapperStyle>
        {!isWidget && !isMobile && (
          <BlueManOnBench aria-hidden focusable="false" />
        )}
      </ProposalStepWrapperStyle>
      {!isWidget && isMobile && (
        <ProposalImagesWrapperStyle>
          <BlueManOnBench aria-hidden focusable="false" />
          <BlueShapeImageStyle src={BlueShape} alt="" />
        </ProposalImagesWrapperStyle>
      )}
      {!isWidget && !isMobile && <BlueShapeImageStyle src={BlueShape} alt="" />}
    </>
  );
};
