import React, { FC, useState, useEffect } from 'react';
import i18n from 'i18next';
import {
  GeneratedButtonsStyle,
  GeneratedButtonTextStyle,
  GeneratedButtonsStyleTitle,
  GeneratedButtonsStyleContainerStyle,
} from './style';

const generatedContentArray = [
  {
    title: 'test1test1test1 test1test1 test1te',
    subtitle: 'global',
    name: 'test1',
    content: 'content',
    position: 0,
  },
  {
    title: 'test2',
    subtitle: 'résumé',
    name: 'test2',
    content: 'content',
    position: 1,
  },
  {
    title: 'test3',
    subtitle: 'éthique',
    name: 'test3',
    content: 'content',
    position: 2,
  },
  {
    title: 'test4',
    subtitle: 'aidant',
    name: 'test4',
    content: 'content',
    position: 3,
  },
  {
    title: 'test5',
    subtitle: 'global',
    name: 'test5',
    content: 'content',
    position: 4,
  },
  {
    title: 'test6',
    subtitle: 'éthique',
    name: 'test6',
    content: 'content',
    position: 5,
  },
  {
    title: 'test7',
    subtitle: 'résumé',
    name: 'test7',
    content: 'content',
    position: 6,
  },
  {
    title: 'test8',
    subtitle: 'global',
    name: 'test8',
    content: 'content',
    position: 7,
  },
  {
    title: 'test9',
    subtitle: 'résumé',
    name: 'test9',
    content: 'content',
    position: 8,
  },
];

const colors = ['#5F5F5F', '#72C083', '#4C41AB', '#7990F1'];

export const PromptQueries: FC = () => {
  const [generatedContent, setGeneratedContent] = useState(
    generatedContentArray
  );
  const [contentClicked, setContentClicked] = useState(false);

  useEffect(() => {
    if (generatedContent.length < 5) {
      setGeneratedContent(generatedContentArray);
    }
  }, [generatedContent]);

  const handleClick = (title: string) => {
    setGeneratedContent(
      generatedContent.filter(content => content.title !== title)
    );
    setContentClicked(true);
  };

  const renderButtons = contentClicked
    ? generatedContent.slice(0, 2)
    : generatedContent.slice(0, 5);

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    const item = colors[randomIndex];

    return item;
  };

  return (
    <GeneratedButtonsStyleContainerStyle id="main">
      {renderButtons.map(content => (
        <GeneratedButtonsStyle
          onClick={() => handleClick(content.title)}
          key={content.title}
        >
          <GeneratedButtonsStyleTitle
            style={{ backgroundColor: getRandomColor() }}
          >
            {content.subtitle}
          </GeneratedButtonsStyleTitle>
          <GeneratedButtonTextStyle>{content.title}</GeneratedButtonTextStyle>
        </GeneratedButtonsStyle>
      ))}
      <GeneratedButtonsStyle className="theme">
        <GeneratedButtonsStyleTitle
          style={{ backgroundColor: getRandomColor() }}
        >
          {i18n.t('prompt.themes')}
        </GeneratedButtonsStyleTitle>
        <GeneratedButtonTextStyle>
          {i18n.t('prompt.themesDiscover')}
        </GeneratedButtonTextStyle>
      </GeneratedButtonsStyle>
    </GeneratedButtonsStyleContainerStyle>
  );
};
