import React, { useEffect } from 'react';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { closePanel } from '@make.org/store/actions/panel';
import {
  trackClickKeepVoting,
  trackDisplayProposalSubmitValidation,
} from '@make.org/utils/services/Tracking';
import { getAgeFromDateOfBirth } from '@make.org/utils/helpers/date';
import {
  ProposalFormSuccessWrapperStyle,
  ProposalSuccessParagraphWrapperStyle,
} from '@make.org/components/Proposal/Submit/style';
import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import { clearProposalPending } from '@make.org/store/actions/pendingProposal';
import { selectAuthentication } from '@make.org/store/selectors/user.selector';
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_DE,
} from '@make.org/utils/constants/config';
import { AvatarImageStyle } from '@make.org/ui/components/Avatar/style';
import { SvgEmptyAvatar } from '@make.org/ui/Svg/elements';
import { ProposalTooltip } from '../../../ui/components/Tooltip/ProposalTooltip';
import {
  ProposalSuccessWrapperStyle,
  ProposalSuccessTitleGreenStyle,
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
} from './style';

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

  return <>{`, ${i18n.t('proposal_card.author.age', { age })}`}</>;
};

export const ProposalSuccess: React.FC<Props> = ({ isRegister }) => {
  const { state, dispatch } = useAppContext();
  const { user } = selectAuthentication(state);
  const proposalContent = state.pendingProposal.proposalContent || '';
  const { source, country } = state.appConfig;
  const isDE = country === 'DE';
  const EMAIL = isDE ? CONTACT_EMAIL_DE : CONTACT_EMAIL;
  const isWidget = source === 'widget';
  const avatarSize = 36;
  const handleCloseButton = () => {
    dispatch(closePanel());
    trackClickKeepVoting();
    dispatch(clearProposalPending());
  };

  useEffect(() => {
    trackDisplayProposalSubmitValidation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => dispatch(clearProposalPending());
  }, []);

  return (
    <ProposalFormSuccessWrapperStyle isWidget={isWidget}>
      <CenterColumnStyle>
        <ProposalSuccessWrapperStyle as="section">
          <ProposalSuccessTitleBlackStyle>
            {i18n.t('proposal_submit.success.grats', {
              name: user?.profile.firstName || '',
            })}
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
              <ProposalAuthorAge dateOfBirth={user?.profile.dateOfBirth} />
            </ProposalSuccessNameStyle>
            <ProposalSuccessProposalStyle>
              {proposalContent}
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
          <ProposalSuccessRedButtonStyle onClick={handleCloseButton}>
            {i18n.t('proposal_submit.success.button')}
          </ProposalSuccessRedButtonStyle>
        </ProposalSuccessWrapperStyle>
      </CenterColumnStyle>
    </ProposalFormSuccessWrapperStyle>
  );
};
