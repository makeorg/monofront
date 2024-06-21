import React, { FC, useState } from 'react';
import i18n from 'i18next';
import { Themes } from './Themes';
import { useTracking } from '../Tracking/useTracking';
import {
  WelcomeContainerStyle,
  WelcomeTitleStyle,
  WelcomeIAStyle,
  WelcomeContentBlockContainerStyle,
  WelcomeContentBlockTitleStyle,
  WelcomeBlockThemesContainerStyle,
  WelcomeContentTextStyle,
  WelcomeExergueTextStyle,
  WelcomeToggleButtonStyle,
  WelcomeIconPngStyle,
  WelcomeTitleImageContainerStyle,
  WelcomeTitleExergueContainerStyle,
} from './style';
import welcomeImage from "../../assets/panoecrand'accueil.png";
import { useAssemblyContext } from '../../store/context';

const MAX_LENGTH_SUMMARY = 200;

export const Welcome: FC = () => {
  const { state } = useAssemblyContext();
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const { visitorId } = state;
  const { introduction, slug: eventSlug } = state.event;
  const { generatedContents } = state;
  const summary = generatedContents[0];
  const showToggleSummary = summary.content.length >= MAX_LENGTH_SUMMARY;
  const summarySliced = summary.content.slice(0, MAX_LENGTH_SUMMARY);
  const tracker = useTracking();

  const handleClick = (displaySummary: boolean) => {
    setShowSummary(displaySummary);
    tracker.track('ACTION-SEE-MORE', {
      visitor_id: visitorId,
      event_slug: eventSlug,
      expand: displaySummary ? 'true' : 'false',
    });
  };

  return (
    <>
      <WelcomeContainerStyle>
        <WelcomeTitleImageContainerStyle>
          <WelcomeTitleExergueContainerStyle>
            <span>
              <WelcomeTitleStyle>{i18n.t('welcome.title')}</WelcomeTitleStyle>
              <WelcomeTitleStyle className="purple">
                {introduction}
              </WelcomeTitleStyle>
            </span>
            <WelcomeExergueTextStyle>
              {i18n.t('welcome.exergue')}
            </WelcomeExergueTextStyle>
          </WelcomeTitleExergueContainerStyle>

          <WelcomeIconPngStyle src={welcomeImage} alt="" />
        </WelcomeTitleImageContainerStyle>

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
                onClick={() => handleClick(!showSummary)}
                aria-pressed={showSummary}
              >
                {showSummary ? i18n.t('welcome.less') : i18n.t('welcome.more')}
              </WelcomeToggleButtonStyle>
            )}
          </WelcomeContentBlockContainerStyle>
        )}
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
