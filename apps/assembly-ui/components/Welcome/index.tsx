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
      <YoutubePlayer url={introMediaUrl} />
      <WelcomeTitleStyle>{introduction}</WelcomeTitleStyle>
      <WelcomeIAStyle>
        {i18n.t('global.ia')}
        <WelcomeIAStyle className="bold" as="span">
          {i18n.t('global.iaBold')}
        </WelcomeIAStyle>
      </WelcomeIAStyle>
      <WelcomeBlockContainerStyle>
        {summary && (
          <WelcomeContentBlockContainerStyle>
            <WelcomeContentBlockTitleStyle>
              {summary.title}
            </WelcomeContentBlockTitleStyle>
            <WelcomeContentTextStyle>{summary.content}</WelcomeContentTextStyle>
          </WelcomeContentBlockContainerStyle>
        )}

        <WelcomeContentBlockContainerStyle>
          <WelcomeContentBlockTitleStyle>
            {i18n.t('prompt.themeAnswer')}&nbsp;
          </WelcomeContentBlockTitleStyle>
          <Themes />
        </WelcomeContentBlockContainerStyle>
      </WelcomeBlockContainerStyle>
    </WelcomeContainerStyle>
  );
};
