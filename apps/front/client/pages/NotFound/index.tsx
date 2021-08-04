import React, { FC } from 'react';
import i18n from 'i18next';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  NotFoundPageContentStyle,
  NotFoundPageInnerStyle,
  NotFoundIntroStyle,
  NotFoundTitleStyle,
} from './style';

export const NotFoundPage: FC = () => (
  <NotFoundPageContentStyle>
    <MetaTags
      title={i18n.t('meta.not_found.title')}
      description={i18n.t('meta.not_found.description')}
    />
    <NotFoundPageInnerStyle>
      <NotFoundIntroStyle>{i18n.t('not_found.intro')}</NotFoundIntroStyle>
      <NotFoundTitleStyle>{i18n.t('not_found.title')}</NotFoundTitleStyle>
      <ParagraphStyle>{i18n.t('not_found.description')}</ParagraphStyle>
    </NotFoundPageInnerStyle>
  </NotFoundPageContentStyle>
);
