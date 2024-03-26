/* eslint-disable react/jsx-no-useless-fragment */
import React, { FC, useEffect, useRef, useState } from 'react';
import { ILogger, QuestionType } from '@make.org/types';
import { FORM, FEATURE_FLIPPING } from '@make.org/types/enums';
import { MAX_PROPOSAL_LENGTH } from '@make.org/utils/constants/proposal';
import i18n from 'i18next';
import {
  getLocalizedBaitText,
  proposalHasValidLength,
} from '@make.org/utils/helpers/proposal';
import { getModerationPageLink } from '@make.org/utils/helpers/url';
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
import {
  disableProposalAnonymous,
  enableProposalAnonymous,
  initProposalPending,
} from '@make.org/store/actions/pendingProposal';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { ProposalService } from '@make.org/utils/services/Proposal';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { LoadingDots } from '@make.org/ui/components/Loading/Dots';
import { PANEL_CONTENT } from '@make.org/store/actions/panel/panelContentEnum';
import { checkIsFeatureActivated } from '@make.org/utils/helpers/featureFlipping';
import { SwitchButton } from '@make.org/designsystem/components/Buttons/Switch';
import { ProposalAuthentication } from './Authentication';
import {
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
  ProposalStepWrapperStyle,
  BlueManOnBench,
  ProposalFormStyle,
  AnonymousButtonContainer,
  AnonymousInfoTextStyle,
} from './style';

type Props = {
  logger: ILogger;
};

export const ProposalForm: FC<Props> = ({ logger }) => {
  const { state, dispatch } = useAppContext();
  const [pendingProposal, setProposalContent] = useState<string>(
    state.pendingProposal.pendingProposal || ''
  );
  const [waitingForAPIResponse, setWaitingForAPIResponse] =
    useState<boolean>(false);

  const inputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
  const question: QuestionType | null = selectCurrentQuestion(state);
  const { isLoggedIn } = selectAuthentication(state);
  const { device, country, language } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const proposalIsEmpty = pendingProposal.length === 0;
  const baitText = getLocalizedBaitText(
    question.returnedLanguage,
    question.questionId,
    logger
  );
  const charCounting = proposalIsEmpty
    ? baitText?.length
    : pendingProposal.length;

  const validProposalLength = proposalHasValidLength(pendingProposal.length);
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  const isAnonymousProposal: boolean = checkIsFeatureActivated(
    FEATURE_FLIPPING.ANONYMOUS_PROPOSALS,
    question.activeFeatures
  );

  const handleFieldFocus = () => {
    if (pendingProposal.length === 0) {
      setProposalContent(baitText);
    }
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (pendingProposal.length < baitText.length) {
      return setProposalContent(baitText);
    }
    return setProposalContent(event.currentTarget.value);
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
    setWaitingForAPIResponse(true);
    if (isLoggedIn) {
      await ProposalService.propose(
        pendingProposal,
        question.questionId,
        question.returnedLanguage,
        country,
        state.pendingProposal.isAnonymous,
        () => {
          dispatch(setPanelContent(PANEL_CONTENT.PROPOSAL_SUCCESS));
        }
      );
    }

    if (!isLoggedIn) {
      dispatch(setPanelContent(<ProposalAuthentication logger={logger} />));
    }

    dispatch(initProposalPending(pendingProposal));
    setWaitingForAPIResponse(false);
  };

  useEffect(() => {
    trackDisplayProposalField(state.pendingProposal.source);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProposalStepWrapperStyle isAuthentication={false} isWidget={isWidget}>
      <ProposalFormWrapperStyle
        isWidget={isWidget}
        data-cy-container={FORM.PROPOSAL_SUBMIT_FORMNAME}
      >
        <ProposalFormStyle
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
          {isAnonymousProposal && (
            <>
              <AnonymousButtonContainer>
                <SwitchButton
                  value={state.pendingProposal.isAnonymous}
                  onEnabling={() => dispatch(enableProposalAnonymous())}
                  onDisabling={() => dispatch(disableProposalAnonymous())}
                />
                {i18n.t('proposal_card.author.anonymous_mode')}
              </AnonymousButtonContainer>
              <AnonymousInfoTextStyle
                dangerouslySetInnerHTML={{
                  __html: i18n.t('proposal_card.author.disclaimer'),
                }}
              />
            </>
          )}
          <ProposalFieldWrapperStyle>
            <ScreenReaderItemStyle as="label" htmlFor="proposal">
              {i18n.t('proposal_submit.form.field')}
            </ScreenReaderItemStyle>
            <ProposalTextareaStyle
              ref={inputRef}
              name="proposal"
              id="proposal"
              data-cy-field="proposal"
              value={pendingProposal}
              onChange={secureFieldValue}
              onFocus={handleFieldFocus}
              autoCapitalize="none"
              autoComplete="off"
              placeholder={`${baitText} ...`}
              rows={6}
              spellCheck
              maxLength={MAX_PROPOSAL_LENGTH}
              lang={question ? question.returnedLanguage : ''}
            />
            <ProposalCharCountStyle aria-hidden data-cy-container="char-count">
              {`${charCounting} / ${MAX_PROPOSAL_LENGTH}`}
            </ProposalCharCountStyle>
            <ScreenReaderItemStyle aria-live="polite">
              {i18n.t('proposal_submit.form.counter', {
                current: pendingProposal.length,
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
                disabled={!validProposalLength || waitingForAPIResponse}
                data-cy-button="proposal-submit"
              >
                {waitingForAPIResponse ? (
                  <LoadingDots />
                ) : (
                  i18n.t('proposal_submit.form.button_propose')
                )}
              </RedButtonStyle>
            </ProposalButtonsWrapperStyle>
            <ProposalAuthInlineWrapperStyle>
              <>
                {i18n.t('proposal_submit.form.read_our')}{' '}
                <ProposalExternalLinkStyle
                  href={
                    isWidget
                      ? `https://make.org${getModerationPageLink(
                          country,
                          language
                        )}`
                      : getModerationPageLink(country, language)
                  }
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
              </>
            </ProposalAuthInlineWrapperStyle>
          </ProposalSubmitButtonsWidgetStyle>
        </ProposalFormStyle>
      </ProposalFormWrapperStyle>
      {!isWidget && !isMobile && (
        <BlueManOnBench aria-hidden focusable="false" />
      )}
    </ProposalStepWrapperStyle>
  );
};
