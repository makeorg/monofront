// @flow
import React from 'react';
import { type StateRoot } from 'Shared/store/types';
import { type QuestionType } from 'Shared/types/question';
import { TileWithTitle } from 'Client/ui/Elements/TileWithTitle';
import { DeprecatedCollapse } from 'Client/ui/Elements/Collapse/DeprecatedCollapse';
import { i18n } from 'Shared/i18n';
import { ParagraphStyle } from 'Client/ui/Elements/ParagraphElements';
import { useSelector } from 'react-redux';
import { matchMobileDevice } from 'Shared/helpers/styled';

type Props = {
  question: QuestionType,
};
export const MethodologyTile = ({ question }: Props) => {
  const { device } = useSelector((state: StateRoot) => state.appConfig);
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
