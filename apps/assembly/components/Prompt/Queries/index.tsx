import React, { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import {
  QueriesButtonsStyle,
  QueriesTextStyle,
  QueriesTitleStyle,
} from './style';
import { useAssemblyContext } from '../../../store/context';
import { addFeedItem } from '../../../store/feed/actions';
import { GENERATED_CONTENT, THEMES } from '../../Feed';
import { MobileQueries } from './Mobile';
import { DesktopQueries } from './Desktop';

type ButtonsProps = {
  title: string;
  subtitle: string;
  handleClick: () => void;
};

export type DispatchProps = {
  dispatchThemes: () => void;
  dispatchGeneratedContent: (subject: string, content: string) => void;
};

const colors = ['#5F5F5F', '#242825', '#4C41AB', '#7990F1'];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  const item = colors[randomIndex];

  return item;
};

export const Buttons: FC<ButtonsProps> = ({ title, subtitle, handleClick }) => (
  <QueriesButtonsStyle onClick={handleClick}>
    <QueriesTitleStyle style={{ backgroundColor: getRandomColor() }}>
      {subtitle}
    </QueriesTitleStyle>
    <QueriesTextStyle>{title}</QueriesTextStyle>
  </QueriesButtonsStyle>
);

export const PromptQueries: FC = () => {
  const { dispatch } = useAssemblyContext();

  const dispatchThemes = () => {
    dispatch(
      addFeedItem({
        id: uuidv4(),
        type: THEMES,
        question: 'Quelles sont les thématiques de la convention ?',
        content: '',
      })
    );
  };

  const dispatchGeneratedContent = (subject: string, content: string) => {
    dispatch(
      addFeedItem({
        id: uuidv4(),
        type: GENERATED_CONTENT,
        question: `que s'est-il dit sur : "${subject}"`,
        content,
      })
    );
  };

  const isMobile = Math.min(window.innerWidth, window.innerHeight) < 768;

  if (isMobile) {
    return (
      <MobileQueries
        dispatchThemes={dispatchThemes}
        dispatchGeneratedContent={dispatchGeneratedContent}
      />
    );
  }

  return (
    <DesktopQueries
      dispatchThemes={dispatchThemes}
      dispatchGeneratedContent={dispatchGeneratedContent}
    />
  );
};
