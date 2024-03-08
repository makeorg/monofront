import React, { FC } from 'react';
import i18n from 'i18next';
import { Themes } from './Themes';
import {
  WelcomeContainerStyle,
  WelcomeTitleStyle,
  WelcomeIAStyle,
  WelcomeBlockContainerStyle,
  WelcomeContentBlockContainerStyle,
  WelcomeContentBlockTitleStyle,
  WelcomeBlockThemesContainerStyle,
  WelcomeBlockVideoContainerStyle,
  WelcomeContentTextStyle,
} from './style';
import { YoutubePlayer } from '../ReactPlayer/YoutubePlayer';
import { useAssemblyContext } from '../../store/context';

export const Welcome: FC = () => {
  const { state } = useAssemblyContext();
  const { introduction, introMediaUrl } = state.event;
  const { generatedContents } = state;
  const summary = generatedContents[0];

  return (
    <WelcomeContainerStyle>
      <WelcomeTitleStyle>{introduction}</WelcomeTitleStyle>

      <WelcomeBlockContainerStyle>
        {summary && (
          <WelcomeContentBlockContainerStyle>
            <WelcomeContentBlockTitleStyle>
              {summary.title}
            </WelcomeContentBlockTitleStyle>
            <WelcomeContentTextStyle>{summary.content}</WelcomeContentTextStyle>
          </WelcomeContentBlockContainerStyle>
        )}
        <WelcomeBlockVideoContainerStyle>
          <YoutubePlayer url={introMediaUrl} />
        </WelcomeBlockVideoContainerStyle>
      </WelcomeBlockContainerStyle>

      <WelcomeBlockThemesContainerStyle>
        <WelcomeContentBlockTitleStyle>
          {i18n.t('prompt.themeAnswer')}&nbsp;
        </WelcomeContentBlockTitleStyle>
        <WelcomeIAStyle>
          {i18n.t('global.ia')}
          <WelcomeIAStyle className="bold" as="span">
            {i18n.t('global.iaBold')}
          </WelcomeIAStyle>
        </WelcomeIAStyle>
        <Themes />
      </WelcomeBlockThemesContainerStyle>
    </WelcomeContainerStyle>
  );
};
