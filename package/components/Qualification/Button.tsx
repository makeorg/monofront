import React, { useState, useEffect, useMemo, useContext } from 'react';
import { QualificationService } from '@make.org/utils/services/Qualification';
import {
  trackQualify,
  trackUnqualify,
} from '@make.org/utils/services/Tracking';
import { QualificationType } from '@make.org/types';
import { LoadingDots } from '@make.org/ui/components/Loading/Dots';
import i18n from 'i18next';
import { ProposalLanguageContext } from '@make.org/store/proposalLanguageContext';
import { useAppContext } from '@make.org/store';
import { TopComponentContext } from '@make.org/store/topComponentContext';
import { QualifyButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { qualify as actionQualify } from '@make.org/store/actions/sequence';
import { getQualificationsTransMap } from './qualificationsMap';
import { voteButtonParams } from '../Vote/Button/Params';

type Props = {
  /** qualification object */
  qualification: QualificationType;
  /** Voted key property */
  votedKey: string;
  /** Proposal's Id */
  proposalId: string;
  /** String containing the hash generate api side for security purpose */
  proposalKey: string;
  /** Index of the card */
  index?: number;
  /** Optional boolean to disable click event on the qualification button */
  disableClick?: boolean;
};

/**
 * Renders Qualification button element
 */
export const QualificationButton: React.FC<Props> = ({
  qualification,
  votedKey,
  proposalId,
  proposalKey,
  index,
  disableClick = false,
}) => {
  const qualificationTransMap = useMemo(getQualificationsTransMap, []);

  const { dispatch, state } = useAppContext();
  const { source } = state.appConfig;
  const isWidget = source === 'widget';
  const [userQualification, setUserQualification] = useState(qualification);
  const proposalLanguage = useContext(ProposalLanguageContext);
  const { hasQualified, qualificationKey } = userQualification;
  const buttonLabel = qualificationTransMap.get(qualificationKey) || '';
  const [isQualified, setIsQualified] = useState<boolean>(hasQualified);
  const [pendingQualification, setPendingQualification] =
    useState<boolean>(false);
  useEffect(() => {
    setUserQualification(qualification);
    setIsQualified(qualification.hasQualified);
  }, [qualification]);

  const handleQualify = async (context: string) => {
    const qualificationResult: QualificationType | null =
      await QualificationService.qualify(
        proposalId,
        proposalKey,
        votedKey,
        qualificationKey,
        proposalLanguage
      );

    if (qualificationResult) {
      setIsQualified(true);
      dispatch(
        actionQualify(
          votedKey,
          qualificationResult,
          context,
          dispatch,
          state.sequence
        )
      );
      trackQualify(proposalId, qualificationKey, votedKey, index, context);
    }
  };

  const handleUnqualify = async (context: string) => {
    const qualificationResult: QualificationType | null =
      await QualificationService.unqualify(
        proposalId,
        proposalKey,
        votedKey,
        qualificationKey,
        proposalLanguage
      );

    if (qualificationResult) {
      setIsQualified(false);
      dispatch(
        actionQualify(
          votedKey,
          qualificationResult,
          context,
          dispatch,
          state.sequence
        )
      );
      trackUnqualify(proposalId, qualificationKey, votedKey, index, context);
    }
  };

  const handleQualification = async (context: string) => {
    if (pendingQualification) {
      return;
    }
    setPendingQualification(true);
    if (isQualified) {
      await handleUnqualify(context);
    } else {
      await handleQualify(context);
    }
    setPendingQualification(false);
  };

  return (
    <TopComponentContext.Consumer>
      {context => (
        <QualifyButtonStyle
          className={isQualified ? 'qualified' : ''}
          color={voteButtonParams[votedKey].color}
          onClick={() => handleQualification(context)}
          aria-label={
            pendingQualification
              ? i18n.t('common.loading') || undefined
              : buttonLabel
          }
          aria-busy={pendingQualification}
          data-cy-button="qualification"
          data-cy-qualification-key={qualificationKey}
          disabled={disableClick}
        >
          {pendingQualification ? (
            <LoadingDots isWidget={isWidget} />
          ) : (
            <span aria-hidden>{buttonLabel}</span>
          )}
        </QualifyButtonStyle>
      )}
    </TopComponentContext.Consumer>
  );
};
