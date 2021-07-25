import React, { FC } from 'react';
import i18n from 'i18next';
import { Title, Meta } from 'react-head';

type Props = {
  /** String used for title tag in header */
  title?: string;
  /** String used for description tag in header */
  description?: string;
  /** String used for image itemprop meta tag in header */
  picture?: string;
};

export const MetaTags: FC<Props> = ({ title, description, picture }) => (
  <>
    <Title>{title || i18n.t('meta.home.title')}</Title>
    <Meta
      name="description"
      content={description || i18n.t('meta.home.description')}
    />
    <Meta property="og:title" content={title || i18n.t('meta.home.title')} />
    <Meta
      property="og:description"
      content={description || i18n.t('meta.home.description')}
    />
    <Meta
      property="og:headline"
      content={description || i18n.t('meta.home.description')}
    />
    <Meta
      property="og:image"
      content={picture || i18n.t('meta.home.picture')}
    />
    <Meta name="twitter:card" content="summary" />
    <Meta
      property="twitter:title"
      content={title || i18n.t('meta.home.title')}
    />
    <Meta
      property="twitter:description"
      content={description || i18n.t('meta.home.description')}
    />
    <Meta
      property="twitter:image"
      content={picture || i18n.t('meta.home.picture')}
    />
  </>
);
