import React, { FC } from 'react';
import {
  RESULTS_TOP_IDEAS,
  RESULTS_CONTROVERSIALS,
} from '@make.org/utils/constants/ids';
import { getCurrentContainer } from '../../../../helper/consultation';
import {
  ResultCardStyle,
  ResultTitleWrapperStyle,
  ResultCardTitleStyle,
  ResultCardDescriptionStyle,
  ResultCardIconStyle,
} from './style';

type Props = {
  /** Optional icon to render */
  icon?: JSX.Element;
  /** T;tle to render */
  title: string;
  /** O;tional description to render */
  description?: string;
  /** O;tional id to render */
  id: string;
  /** C;ildren to render */
  children: Node;
};

export const ResultCard: FC<Props> = ({
  icon,
  title,
  description,
  id,
  children,
}) => {
  const currentContainer = getCurrentContainer(id || '');
  const isTopIdeas = id === RESULTS_TOP_IDEAS || false;
  const isControversials = id === RESULTS_CONTROVERSIALS || false;
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
