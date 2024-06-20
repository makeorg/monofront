import React, { FC, useState } from 'react';
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
  WelcomeExergueTextStyle,
  WelcomeToggleButtonStyle,
} from './style';
import { YoutubePlayer } from '../ReactPlayer/YoutubePlayer';
import { useAssemblyContext } from '../../store/context';

const MAX_LENGTH_SUMMARY = 200;

export const Welcome: FC = () => {
  const { state } = useAssemblyContext();
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const { introduction, introMediaUrl } = state.event;
  const { generatedContents } = state;
  const summary = generatedContents[0];
  const showToggleSummary = summary.content.length >= MAX_LENGTH_SUMMARY;
  const summarySliced = summary.content.slice(0, MAX_LENGTH_SUMMARY);

  return (
    <>
      <WelcomeContainerStyle>
        <span>
          <WelcomeTitleStyle>{i18n.t('welcome.title')}</WelcomeTitleStyle>
          <WelcomeTitleStyle className="purple">
            {introduction}
          </WelcomeTitleStyle>
        </span>
        <WelcomeExergueTextStyle>
          {i18n.t('welcome.exergue')}
        </WelcomeExergueTextStyle>
        <WelcomeBlockContainerStyle>
          {summary && (
            <WelcomeContentBlockContainerStyle>
              <WelcomeContentBlockTitleStyle>
                {summary.title}
              </WelcomeContentBlockTitleStyle>
              <WelcomeContentTextStyle aria-expanded={showSummary}>
                {!showToggleSummary || showSummary
                  ? summary.content
                  : `${summarySliced}...`}
              </WelcomeContentTextStyle>
              {showToggleSummary && (
                <WelcomeToggleButtonStyle
                  type="button"
                  onClick={() => setShowSummary(!showSummary)}
                  aria-pressed={showSummary}
                >
                  {showSummary
                    ? i18n.t('welcome.less')
                    : i18n.t('welcome.more')}
                </WelcomeToggleButtonStyle>
              )}
            </WelcomeContentBlockContainerStyle>
          )}
          <WelcomeBlockVideoContainerStyle>
            <YoutubePlayer url={introMediaUrl} />
          </WelcomeBlockVideoContainerStyle>
        </WelcomeBlockContainerStyle>
      </WelcomeContainerStyle>
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
    </>
  );
};
