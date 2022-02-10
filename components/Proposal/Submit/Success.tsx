import React, { useEffect } from 'react';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { closePanel } from '@make.org/store/actions/panel';
import {
  trackClickKeepVoting,
  trackDisplayProposalSubmitValidation,
} from '@make.org/utils/services/Tracking';
import { ProposalFormWrapperStyle } from '@make.org/components/Proposal/Submit/style';
import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import { clearProposalPending } from '@make.org/store/actions/pendingProposal';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import { CONTACT_EMAIL } from '@make.org/utils/constants/config';
import { AvatarImageStyle } from '@make.org/ui/components/Avatar/style';
import { SvgEmptyAvatar } from '@make.org/ui/Svg/elements';
import {
  ProposalSuccessWrapperStyle,
  ProposalSuccessTitleGreenStyle,
  ProposalSuccessTitleBlackStyle,
  ProposalSuccessParagraphActivateStyle,
  ProposalSuccessParagraphLinkStyle,
  ProposalSuccessRedButtonStyle,
  ProposalSuccessParagraphStyle,
  ProposalSuccessContactStyle,
  ProposalSuccessContactLinkStyle,
  ProposalSuccessCardStyle,
  ProposalSuccessProposalStyle,
  ProposalSuccessAvatarStyle,
  ProposalSuccessNameStyle,
} from './style';

type Props = {
  // eslint-disable-next-line react/require-default-props
  isRegister?: boolean;
};

export const ProposalSuccess: React.FC<Props> = ({ isRegister }) => {
  const { state, dispatch } = useAppContext();
  const { user } = selectAuthentication(state);
  const proposalContent = state.pendingProposal.proposalContent || '';
  const { source } = state.appConfig;
  const isWidget = source === 'widget';
  const avatarSize = 36;

  const handleCloseButton = () => {
    dispatch(closePanel());
    trackClickKeepVoting();
  };

  useEffect(() => {
    trackDisplayProposalSubmitValidation();
    dispatch(clearProposalPending());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ProposalFormWrapperStyle isWidget={isWidget}>
      <CenterColumnStyle>
        <ProposalSuccessWrapperStyle as="section">
          <ProposalSuccessTitleBlackStyle>
            {i18n.t('proposal_submit.success.grats', {
              name: user?.profile.firstName || '',
            })}
            recommandations
          </ProposalSuccessTitleBlackStyle>
          <ProposalSuccessTitleGreenStyle>
            {i18n.t('proposal_submit.success.proposal_sent')}
            <ProposalSuccessTitleBlackStyle>!</ProposalSuccessTitleBlackStyle>
          </ProposalSuccessTitleGreenStyle>
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
            </ProposalSuccessNameStyle>
            <ProposalSuccessProposalStyle>
              {proposalContent}
            </ProposalSuccessProposalStyle>

            <ProposalSuccessContactStyle>
              {i18n.t('proposal_submit.success.question')}
              <ProposalSuccessContactLinkStyle href={`mailto:${CONTACT_EMAIL}`}>
                {CONTACT_EMAIL}
              </ProposalSuccessContactLinkStyle>
            </ProposalSuccessContactStyle>
          </ProposalSuccessCardStyle>

          <ProposalSuccessParagraphStyle>
            <ProposalSuccessParagraphActivateStyle>
              {i18n.t('proposal_submit.success.activate')}
            </ProposalSuccessParagraphActivateStyle>
            <ProposalSuccessParagraphLinkStyle>
              {i18n.t('proposal_submit.success.link', {
                mail: user?.email || '',
              })}
            </ProposalSuccessParagraphLinkStyle>
          </ProposalSuccessParagraphStyle>
          <ProposalSuccessRedButtonStyle onClick={handleCloseButton}>
            {i18n.t('proposal_submit.success.button')}
          </ProposalSuccessRedButtonStyle>
        </ProposalSuccessWrapperStyle>
      </CenterColumnStyle>
    </ProposalFormWrapperStyle>
  );
};
