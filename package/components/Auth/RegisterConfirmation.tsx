import React, { useEffect } from 'react';
import { useAppContext } from '@make.org/store';
import { getAppLocationContext } from '@make.org/utils/helpers/getLocationContext';
import { LinkAsRedButtonBottomMobileStyle } from '@make.org/ui/elements/ButtonsElements';
import { SvgMailSuccess } from '@make.org/ui/Svg/elements';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { QuestionType } from '@make.org/types';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { trackDisplayPanelSignupValidation } from '@make.org/utils/services/Tracking';
import {
  getBrowseConsultationsLink,
  getParticipateLink,
} from '@make.org/utils/helpers/url';
import { closePanel, removePanelContent } from '@make.org/store/actions/panel';
import i18n from 'i18next';
import { setRegisterStep } from '@make.org/store/actions/pendingProposal';
import {
  RegisterPanelSuccessWrapperStyle,
  LoginTitleWrapperCenterStyle,
  RegisterPanelSubTitleWrapperStyle,
  RegisterPanelSuccessParagraphStyle,
  RegisterPanelSuccessParagraphContainerStyle,
} from './style';

type Props = {
  isSocial?: boolean;
};

const consultationLocations = new Set([
  'sequence',
  'page-participate',
  'page-explore',
  'page-results',
  'sequence-popular',
  'sequence-controversial',
  'sequence-keyword',
]);

export const RegisterConfirmation: React.FC<Props> = ({ isSocial }) => {
  const { dispatch, state } = useAppContext();
  const { country } = state.appConfig;
  const question: QuestionType = selectCurrentQuestion(state);
  const location = getAppLocationContext(window?.location?.pathname).trim();
  const isConsultation = consultationLocations.has(location);
  const { user } = selectAuthentication(state);

  const handleClick = () => {
    dispatch(closePanel());
    dispatch(removePanelContent());
    dispatch(setRegisterStep(1));
  };

  useEffect(() => {
    trackDisplayPanelSignupValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <RegisterPanelSuccessWrapperStyle>
      <LoginTitleWrapperCenterStyle data-cy-container="register-confirmation-panel-title">
        <>
          {i18n.t('common.register_panel.welcome', {
            name: user?.profile.firstName || '',
          })}
        </>
      </LoginTitleWrapperCenterStyle>
      <RegisterPanelSubTitleWrapperStyle>
        {i18n.t('common.register_panel.greeting')}
      </RegisterPanelSubTitleWrapperStyle>
      <SvgMailSuccess />
      <RegisterPanelSuccessParagraphContainerStyle>
        {!isSocial && (
          <RegisterPanelSuccessParagraphStyle data-cy-container="register-confirmation-panel-mail">
            <strong>
              {/* eslint-disable-next-line react/jsx-no-useless-fragment */}
              {i18n.t('common.register_panel.mail_confirmation_strong')}
            </strong>

            <>
              {i18n.t('common.register_panel.mail_confirmation', {
                mail: user?.email || '',
              })}
            </>
          </RegisterPanelSuccessParagraphStyle>
        )}
        <RegisterPanelSuccessParagraphStyle>
          {i18n.t('common.register_panel.onboarding')}
        </RegisterPanelSuccessParagraphStyle>
      </RegisterPanelSuccessParagraphContainerStyle>
      {isConsultation ? (
        <LinkAsRedButtonBottomMobileStyle
          to={getParticipateLink(country, question.slug)}
          onClick={handleClick}
        >
          {i18n.t('common.register_panel.cta_access')}
        </LinkAsRedButtonBottomMobileStyle>
      ) : (
        <LinkAsRedButtonBottomMobileStyle
          to={getBrowseConsultationsLink(country)}
          onClick={handleClick}
        >
          {i18n.t('common.register_panel.cta')}
        </LinkAsRedButtonBottomMobileStyle>
      )}
    </RegisterPanelSuccessWrapperStyle>
  );
};
