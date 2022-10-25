import React, { useEffect } from 'react';
import i18n from 'i18next';
import { useHistory, useLocation } from 'react-router';
import { useAppContext } from '@make.org/store';
import { closePanel, setPanelContent } from '@make.org/store/actions/panel';
import {
  getParticipateLink,
  getSequenceLink,
} from '@make.org/utils/helpers/url';
import {
  trackClickKeepVoting,
  trackDisplayProposalField,
  trackDisplayProposalSubmitValidation,
} from '@make.org/utils/services/Tracking';
import { getAgeFromDateOfBirth } from '@make.org/utils/helpers/date';
import { ProposalJourney } from '@make.org/components/Proposal/Submit/Journey';
import {
  ProposalFormSuccessWrapperStyle,
  ProposalSuccessParagraphWrapperStyle,
  ProposalSuccessWrapperStyle,
  ProposalSuccessTitleStyle,
  ProposalSuccessTitleBlackStyle,
  ProposalSuccessSpanStyle,
  ProposalSuccessParagraphLinkStyle,
  ProposalSuccessRedButtonStyle,
  ProposalSuccessContactStyle,
  ProposalSuccessContactLinkStyle,
  ProposalSuccessCardStyle,
  ProposalSuccessProposalStyle,
  ProposalSuccessAvatarStyle,
  ProposalSuccessNameStyle,
  ProposalSuccessTransparentButtonstyle,
  ProposalSuccessButtonWrapperStyle,
  ProposalSuccessLinkStyle,
} from '@make.org/components/Proposal/Submit/style';
import { CenterColumnHeightStyle } from '@make.org/ui/elements/FlexElements';
import {
  clearProposalPending,
  setProposalSource,
  setRegisterStep,
} from '@make.org/store/actions/pendingProposal';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_DE,
} from '@make.org/utils/constants/config';
import { isSequencePage as getIsSequencePage } from '@make.org/utils/routes';
import { AvatarImageStyle } from '@make.org/ui/components/Avatar/style';
import { SvgEmptyAvatar } from '@make.org/ui/Svg/elements';
import { ProposalTooltip } from '@make.org/ui/components/Tooltip/ProposalTooltip';
import { QuestionType } from '@make.org/types';

type Props = {
  // eslint-disable-next-line react/require-default-props
  isRegister?: boolean;
};

export const ProposalAuthorAge: React.FC<{ dateOfBirth: string | null }> = ({
  dateOfBirth,
}) => {
  if (!dateOfBirth) {
    return null;
  }
  const age = getAgeFromDateOfBirth(dateOfBirth);

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{`, ${i18n.t('proposal_card.author.age', { age })}`}</>;
};

export const ProposalSuccess: React.FC<Props> = ({ isRegister }) => {
  const { state, dispatch } = useAppContext();
  const { user } = selectAuthentication(state);
  const history = useHistory();
  const location = useLocation();
  const pendingProposal = state.pendingProposal.pendingProposal || '';
  const { source, country } = state.appConfig;
  const isSequencePage = getIsSequencePage(location.pathname);
  const question: QuestionType = selectCurrentQuestion(state);
  const isDE = country === 'DE';
  const EMAIL = isDE ? CONTACT_EMAIL_DE : CONTACT_EMAIL;
  const isWidget = source === 'widget';
  const avatarSize = 36;
  const handleCloseButton = () => {
    dispatch(closePanel());
    dispatch(setRegisterStep(1));
    trackClickKeepVoting();
    dispatch(clearProposalPending());
    if (!isSequencePage && !isWidget) {
      history.push(getSequenceLink(country, question.slug));
    }
  };

  const handleOtherIdeaButton = () => {
    dispatch(clearProposalPending());
    dispatch(setPanelContent(<ProposalJourney />));
    trackDisplayProposalField('new_idea');
  };

  useEffect(() => {
    trackDisplayProposalSubmitValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => {
      dispatch(clearProposalPending());
      dispatch(setProposalSource(''));
    };
  }, []);

  return (
    <ProposalFormSuccessWrapperStyle isWidget={isWidget}>
      <CenterColumnHeightStyle>
        <ProposalSuccessWrapperStyle as="section">
          <ProposalSuccessTitleBlackStyle data-cy-container="success-congrats">
            {i18n.t('proposal_submit.success.grats', {
              name: user?.profile.firstName || '',
            })}
          </ProposalSuccessTitleBlackStyle>
          <ProposalSuccessTitleStyle>
            {i18n.t('proposal_submit.success.proposal_sent')}
            <ProposalSuccessTitleBlackStyle>!</ProposalSuccessTitleBlackStyle>
          </ProposalSuccessTitleStyle>
          <ProposalSuccessCardStyle>
            <ProposalSuccessAvatarStyle>
              {user?.avatarUrl ? (
                <AvatarImageStyle
                  src={user.avatarUrl}
                  alt=""
                  width={avatarSize}
                  height={avatarSize}
                  avatarSize={avatarSize}
                  crop
                />
              ) : (
                <SvgEmptyAvatar
                  aria-hidden
                  width={avatarSize}
                  height={avatarSize}
                  focusable="false"
                />
              )}
            </ProposalSuccessAvatarStyle>
            <ProposalSuccessNameStyle>
              {user?.profile.firstName}
              <ProposalAuthorAge dateOfBirth={user?.profile.dateOfBirth} />
            </ProposalSuccessNameStyle>
            <ProposalSuccessProposalStyle>
              {pendingProposal}
            </ProposalSuccessProposalStyle>
            <ProposalTooltip />
            <ProposalSuccessContactStyle>
              {i18n.t('proposal_submit.success.question')}
              <ProposalSuccessContactLinkStyle href={`mailto:${EMAIL}`}>
                {EMAIL}
              </ProposalSuccessContactLinkStyle>
            </ProposalSuccessContactStyle>
          </ProposalSuccessCardStyle>
          {isRegister && (
            <ProposalSuccessParagraphWrapperStyle>
              <ProposalSuccessParagraphLinkStyle>
                <ProposalSuccessSpanStyle>
                  {i18n.t('proposal_submit.success.activate')}
                </ProposalSuccessSpanStyle>
                {i18n.t('proposal_submit.success.link', {
                  mail: user?.email || '',
                })}
              </ProposalSuccessParagraphLinkStyle>
            </ProposalSuccessParagraphWrapperStyle>
          )}
          <ProposalSuccessButtonWrapperStyle>
            {!isWidget && (
              <ProposalSuccessRedButtonStyle
                onClick={handleOtherIdeaButton}
                data-cy-button="keep-proposing"
              >
                {i18n.t('proposal_submit.success.other_idea')}
              </ProposalSuccessRedButtonStyle>
            )}
            <ProposalSuccessTransparentButtonstyle
              onClick={handleCloseButton}
              data-cy-button="keep-voting"
            >
              {i18n.t('proposal_submit.success.button')}
            </ProposalSuccessTransparentButtonstyle>
          </ProposalSuccessButtonWrapperStyle>
          {!isWidget && (
            <ProposalSuccessLinkStyle
              to={getParticipateLink(country, question.slug)}
              onClick={() => dispatch(closePanel())}
            >
              {i18n.t('proposal_submit.success.consultation_access')}
            </ProposalSuccessLinkStyle>
          )}
        </ProposalSuccessWrapperStyle>
      </CenterColumnHeightStyle>
    </ProposalFormSuccessWrapperStyle>
  );
};
