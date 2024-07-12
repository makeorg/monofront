import React from 'react';
import { Title, Meta } from 'react-head';

type Props = {
  /** String used for title tag in header */
  title: string;
  /** String used for description tag in header */
  description: string;
};

export const MetaTags: React.FC<Props> = ({ title, description }) => (
  <>
    <Title>{title}</Title>
    <Meta name="description" content={description} />
    <Meta property="og:title" content={title} />
    <Meta property="og:description" content={description} />
    <Meta property="og:headline" content={description} />
    <Meta
      property="og:image"
      content="https://assets.make.org/assets/images/panoramic/default_meta.png"
    />
  </>
);
