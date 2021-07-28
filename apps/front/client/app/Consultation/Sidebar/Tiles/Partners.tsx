// @flow
import { type StateRoot } from 'Shared/store/types';
import { TileWithTitle } from 'Client/ui/Elements/TileWithTitle';
import { DeprecatedCollapse } from 'Client/ui/Elements/Collapse/DeprecatedCollapse';
import React from 'react';
import { i18n } from 'Shared/i18n';
import { type QuestionType } from 'Shared/types/question';
import { isInProgress } from 'Shared/helpers/date';
import { isGreatCause } from 'Shared/helpers/question';
import { useSelector } from 'react-redux';
import { matchMobileDevice } from 'Shared/helpers/styled';
import { Partners } from '../Partners';

type Props = {
  question: QuestionType,
};
export const PartnersTile = ({ question }: Props) => {
  const { device } = useSelector((state: StateRoot) => state.appConfig);
  const isMobile = matchMobileDevice(device);
  const questionIsGreatCause = isGreatCause(question.operationKind);

  if (!questionIsGreatCause) {
    return null;
  }

  if (isMobile) {
    return (
      <DeprecatedCollapse
        title={
          isInProgress(question)
            ? i18n.t('consultation.partners.intro_title')
            : i18n.t('consultation.partners.commitment_title')
        }
        withTileStyle
      >
        <Partners question={question} />
      </DeprecatedCollapse>
    );
  }

  return (
    <TileWithTitle
      title={
        isInProgress(question)
          ? i18n.t('consultation.partners.intro_title')
          : i18n.t('consultation.partners.commitment_title')
      }
    >
      <Partners question={question} />
    </TileWithTitle>
  );
};
