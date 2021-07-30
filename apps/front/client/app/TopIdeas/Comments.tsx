import React, { FC } from 'react';
import { TopIdeaCommentsType } from '@make.org/types';
import i18n from 'i18next';
import { OpinionComment } from '../Opinions/Comment';
import {
  TopIdeaDetailsPageTitleStyle,
  TopIdeaDetailsIconStyle,
} from '../../pages/Consultation/style';

type Props = {
  comments?: TopIdeaCommentsType[];
};

export const TopIdeaDetailsComments: FC<Props> = ({ comments }) => {
  const hasComments = comments && comments.length > 0;

  if (!hasComments) {
    return null;
  }

  return (
    <div id="comments_list">
      <TopIdeaDetailsPageTitleStyle>
        <TopIdeaDetailsIconStyle aria-hidden focusable="false" />
        {i18n.t('idea_details.comments')}
      </TopIdeaDetailsPageTitleStyle>
      <section>
        {comments &&
          comments.map(comment => (
            <OpinionComment key={comment.id} comment={comment} />
          ))}
      </section>
    </div>
  );
};
