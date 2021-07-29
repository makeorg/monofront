import { TileWithTitle } from '@make.org/ui/elements/TileWithTitle';
import { DeprecatedCollapse } from '@make.org/ui/elements/Collapse/DeprecatedCollapse';
import React, { FC } from 'react';
import i18n from 'i18next';
import { QuestionType } from '@make.org/types';
import { isInProgress } from '@make.org/utils/helpers/date';
import { isGreatCause } from '@make.org/utils/helpers/question';
import { useAppContext } from '@make.org/store';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { Partners } from '../Partners';

type Props = {
  question: QuestionType;
};
export const PartnersTile: FC<Props> = ({ question }) => {
  const { state } = useAppContext();
  const { device } = state.appConfig;
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
