// @flow
import React from 'react';
import {
  RESULTS_TOP_IDEAS,
  RESULTS_CONTROVERSIALS,
} from 'Shared/constants/ids';
import { getCurrentContainer } from 'Shared/helpers/consultation';
import {
  ResultCardStyle,
  ResultTitleWrapperStyle,
  ResultCardTitleStyle,
  ResultCardDescriptionStyle,
  ResultCardIconStyle,
} from './style';

type Props = {
  /** Optional icon to render */
  icon?: any,
  /** Title to render */
  title: string,
  /** Optional description to render */
  description?: string,
  /** Optional id to render */
  id?: string,
  /** Children to render */
  children: Node,
};

export const ResultCard = ({
  icon,
  title,
  description,
  id,
  children,
}: Props) => {
  const currentContainer = getCurrentContainer(id);
  const isTopIdeas = id && id === RESULTS_TOP_IDEAS;
  const isControversials = id && id === RESULTS_CONTROVERSIALS;
  return (
    <ResultCardStyle>
      <ResultTitleWrapperStyle isTopIdeas={isTopIdeas}>
        {icon && (
          <ResultCardIconStyle aria-hidden focusable="false">
            {icon}
          </ResultCardIconStyle>
        )}
        <ResultCardTitleStyle id={id} data-cy-container={currentContainer}>
          {title}
        </ResultCardTitleStyle>
        {description && (
          <ResultCardDescriptionStyle isControversials={isControversials}>
            {description}
          </ResultCardDescriptionStyle>
        )}
      </ResultTitleWrapperStyle>
      {children}
    </ResultCardStyle>
  );
};
