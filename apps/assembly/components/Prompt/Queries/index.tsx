import React, { FC, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { env } from '@make.org/assets/env';
import {
  QueriesButtonsStyle,
  QueriesTextStyle,
  QueriesTitleStyle,
} from './style';
import { useAssemblyContext } from '../../../store/context';
import { addFeedItem } from '../../../store/feed/actions';
import { THEMES } from '../../Feed';
import { MobileQueries } from './Mobile';
import { DesktopQueries } from './Desktop';

type ButtonsProps = {
  title: string;
  subtitle: string;
  handleClick: () => void;
  theme?: boolean;
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

export const Buttons: FC<ButtonsProps> = ({
  title,
  subtitle,
  handleClick,
  theme,
}) => (
  <QueriesButtonsStyle onClick={handleClick} className={theme ? 'theme' : ''}>
    <QueriesTitleStyle style={{ backgroundColor: getRandomColor() }}>
      {subtitle}
    </QueriesTitleStyle>
    <QueriesTextStyle>{title}</QueriesTextStyle>
  </QueriesButtonsStyle>
);

export const PromptQueries: FC = () => {
  const { dispatch } = useAssemblyContext();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (env.isClientSide() && Math.min(window.innerWidth) < 768) {
      setIsMobile(true);
    }
  }, []);

  const dispatchThemes = () => {
    dispatch(
      addFeedItem({
        id: uuidv4(),
        mode: THEMES,
        question: 'Quelles sont les thématiques de la convention ?',
        text: '',
      })
    );
  };

  const dispatchGeneratedContent = (subject: string, text: string) => {
    dispatch(
      addFeedItem({
        id: uuidv4(),
        question: `que s'est-il dit sur : "${subject}"`,
        text,
      })
    );
  };

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
