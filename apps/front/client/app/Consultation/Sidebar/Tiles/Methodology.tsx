import React, { FC } from 'react';
import { QuestionType } from '@make.org/types';
import { TileWithTitle } from '@make.org/ui/elements/TileWithTitle';
import { DeprecatedCollapse } from '@make.org/ui/elements/Collapse/DeprecatedCollapse';
import i18n from 'i18next';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { useAppContext } from '@make.org/store';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';

type Props = {
  question: QuestionType;
};
export const MethodologyTile: FC<Props> = ({ question }) => {
  const { state } = useAppContext();
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  if (!question.displayResults) {
    return null;
  }

  if (isMobile) {
    return (
      <DeprecatedCollapse
        title={i18n.t('consultation.results.methodology.title')}
        withTileStyle
      >
        <ParagraphStyle>
          {i18n.t('consultation.results.methodology.description')}
        </ParagraphStyle>
      </DeprecatedCollapse>
    );
  }

  return (
    <TileWithTitle title={i18n.t('consultation.results.methodology.title')}>
      <ParagraphStyle>
        {i18n.t('consultation.results.methodology.description')}
      </ParagraphStyle>
    </TileWithTitle>
  );
};
