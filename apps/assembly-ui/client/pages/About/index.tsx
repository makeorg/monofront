import React, { FC, useEffect } from 'react';
import i18n from 'i18next';
import { MetaTags } from '../../../components/Meta';
import {
  ReassuranceTitleStyle,
  ReassuranceSubitleStyle,
  ReassuranceTextBigStyle,
  ReassuranceTextStyle,
  ReassuranceGreyBackgroundStyle,
  ReassuranceInnerBlockTextGapStyle,
  ReassuranceContainerMainTitleStyle,
  ReassuranceContainerBlockStyle,
  ReassuranceInnerBlockTextSmallGapStyle,
  SvgSitStyle,
  SvgWomanStyle,
  ReassuranceDoubleBlockStyle,
  ReassuranceWhyWhoContentStyle,
  ReassuranceSmalGreyBackground,
  ReassuranceBlueTextBigStyle,
  ReassuranceBlueTextStyle,
  ReassuranceTitleNumberIconContainer,
  SvgDocStyle,
  SvgWarningStyle,
  ReassuranceFakePromptContainerStyle,
  SvgSit2Style,
  ReassuranceBlockImageStyle,
  ReassuranceSeekBlockStyle,
  ReassuranceSeekBlockComponentStyle,
  ReassuranceSeekFakePrompt,
  ReassuranceThemesContainer,
  ReassuranceSugTextTitleContainerStyle,
  SvgIaStyle,
  SvgPersoStyle,
  ReassuranceRagContainerStyle,
  SvgStandingStyle,
  ReassuranceButtonConfidentialityStyle,
  ReassuranceTextBoldStyle,
  SvgExternalPurpleStyle,
  ReassuranceList,
} from './style';
import { ROUTE_ASSEMBLY_PRIVACY_POLICY } from '../../../utils/routes';
import disabledButton from '../../../assets/sendButtonInactive.png';
import {
  PromptFormInputStyle,
  PromptFormSubmitStyle,
  PromptFormButtonArrowStyle,
  PromptFormButtonsContainerStyle,
} from '../../../components/Prompt/style';
import { WelcomeThemesButtonStyle } from '../../../components/Welcome/style';
import { useTracking } from '../../../components/Tracking/useTracking';
import { useAssemblyContext } from '../../../store/context';

const colors = [
  '#F8B2BC',
  '#A6C7EA',
  '#DFCDE5',
  '#D0F8F8',
  '#FFF8DC',
  '#B5E9CD',
  '#F8C3B2',
  '#FADDEC',
  '#CEEEFF',
  '#E6E6C6',
];
const AboutPage: FC = () => {
  const tracker = useTracking();
  const { state } = useAssemblyContext();
  const { language, sessionId, visitorId } = state;

  useEffect(() => {
    tracker.track('DISPLAY-PAGE', {
      page: 'reinsurance-page',
      language,
      visitor_id: visitorId,
      session_id: sessionId,
    });
  }, []);

  return (
    <>
      <MetaTags
        title={i18n.t('meta.about.title')}
        description={i18n.t('meta.about.description')}
      />
      <ReassuranceContainerBlockStyle>
        <ReassuranceContainerMainTitleStyle>
          <ReassuranceInnerBlockTextGapStyle>
            <ReassuranceTitleStyle as="h1">
              {i18n.t('reassurance.main_title')}
            </ReassuranceTitleStyle>
            <ReassuranceTextBigStyle>
              {i18n.t('reassurance.main_text')}
            </ReassuranceTextBigStyle>
          </ReassuranceInnerBlockTextGapStyle>
          <SvgSitStyle aria-hidden />
        </ReassuranceContainerMainTitleStyle>
      </ReassuranceContainerBlockStyle>
      <ReassuranceGreyBackgroundStyle>
        <ReassuranceContainerBlockStyle grey>
          <ReassuranceInnerBlockTextSmallGapStyle>
            <ReassuranceTitleStyle>
              {i18n.t('reassurance.what_title')}
            </ReassuranceTitleStyle>
            <ReassuranceTextStyle>
              {i18n.t('reassurance.what_text')}
            </ReassuranceTextStyle>
          </ReassuranceInnerBlockTextSmallGapStyle>
          <ReassuranceDoubleBlockStyle>
            <ReassuranceWhyWhoContentStyle>
              <ReassuranceSubitleStyle>
                {i18n.t('reassurance.why')}
              </ReassuranceSubitleStyle>
              <ReassuranceTextStyle>
                {i18n.t('reassurance.why_text')}
              </ReassuranceTextStyle>
            </ReassuranceWhyWhoContentStyle>
            <ReassuranceWhyWhoContentStyle>
              <ReassuranceSubitleStyle>
                {i18n.t('reassurance.who')}
              </ReassuranceSubitleStyle>
              <ReassuranceTextStyle>
                {i18n.t('reassurance.who_text')}
              </ReassuranceTextStyle>
            </ReassuranceWhyWhoContentStyle>
          </ReassuranceDoubleBlockStyle>
          <SvgWomanStyle aria-hidden />
        </ReassuranceContainerBlockStyle>
      </ReassuranceGreyBackgroundStyle>
      <ReassuranceContainerBlockStyle>
        <li>
          <ReassuranceTitleStyle>
            {i18n.t('reassurance.how_help')}
          </ReassuranceTitleStyle>
          <ReassuranceSmalGreyBackground>
            <ReassuranceTitleNumberIconContainer>
              <ReassuranceSubitleStyle>
                {i18n.t('reassurance.sources_title')}
              </ReassuranceSubitleStyle>
            </ReassuranceTitleNumberIconContainer>
            <ReassuranceBlueTextStyle>
              {i18n.t('reassurance.sources_subtitle')}
            </ReassuranceBlueTextStyle>
            <ReassuranceTextStyle>
              {i18n.t('reassurance.sources_text')}
            </ReassuranceTextStyle>
          </ReassuranceSmalGreyBackground>

          <ReassuranceDoubleBlockStyle>
            <ReassuranceSmalGreyBackground>
              <ReassuranceTitleNumberIconContainer>
                <SvgDocStyle aria-hidden />
                <ReassuranceSubitleStyle>
                  {i18n.t('reassurance.sources_origin_title')}
                </ReassuranceSubitleStyle>
              </ReassuranceTitleNumberIconContainer>

              <ReassuranceTextStyle>
                {i18n.t('reassurance.sources_origin_text_header')}
                <ReassuranceList>
                  <li>{i18n.t('reassurance.sources_origin_text_bullet_1')}</li>
                  <li>{i18n.t('reassurance.sources_origin_text_bullet_2')}</li>
                </ReassuranceList>
              </ReassuranceTextStyle>
            </ReassuranceSmalGreyBackground>
          </ReassuranceDoubleBlockStyle>
        </li>
        <li>
          <ReassuranceBlockImageStyle>
            <ReassuranceSmalGreyBackground>
              <ReassuranceTitleNumberIconContainer>
                <ReassuranceSubitleStyle>
                  {i18n.t('reassurance.exchange_title')}
                </ReassuranceSubitleStyle>
              </ReassuranceTitleNumberIconContainer>
              <ReassuranceBlueTextStyle>
                {i18n.t('reassurance.exchange_subtitle')}
              </ReassuranceBlueTextStyle>
              <ReassuranceTextStyle>
                {i18n.t('reassurance.exchange_text')}
              </ReassuranceTextStyle>
              <ReassuranceTextStyle>
                {i18n.t('reassurance.exchange_text_2')}
              </ReassuranceTextStyle>
              <ReassuranceTextStyle>
                {i18n.t('reassurance.ex')}
              </ReassuranceTextStyle>
              <ReassuranceTextBoldStyle>
                {i18n.t('reassurance.ex_text')}
              </ReassuranceTextBoldStyle>
              <ReassuranceTextStyle>
                {i18n.t('reassurance.or')}
              </ReassuranceTextStyle>
              <ReassuranceTextBoldStyle>
                {i18n.t('reassurance.or_text')}
              </ReassuranceTextBoldStyle>
              <SvgWarningStyle aria-label={i18n.t('reassurance.warning')} />
              <ReassuranceTextStyle>
                {i18n.t('reassurance.warning_exchange')}
              </ReassuranceTextStyle>
            </ReassuranceSmalGreyBackground>
            <SvgSit2Style aria-hidden />
          </ReassuranceBlockImageStyle>
        </li>
        <li>
          <ReassuranceSmalGreyBackground last>
            <ReassuranceTitleNumberIconContainer>
              <ReassuranceSubitleStyle>
                {i18n.t('reassurance.seek_title')}
              </ReassuranceSubitleStyle>
            </ReassuranceTitleNumberIconContainer>
            <ReassuranceBlueTextStyle>
              {i18n.t('reassurance.seek_subtitle')}
            </ReassuranceBlueTextStyle>
            <ReassuranceTextStyle>
              {i18n.t('reassurance.seek_text')}
            </ReassuranceTextStyle>
            <ReassuranceSeekBlockStyle>
              <ReassuranceSeekBlockComponentStyle>
                <ReassuranceSugTextTitleContainerStyle>
                  <ReassuranceBlueTextBigStyle>
                    {i18n.t('reassurance.sug')}
                  </ReassuranceBlueTextBigStyle>
                  <ReassuranceTextStyle>
                    {i18n.t('reassurance.sug_text')}
                  </ReassuranceTextStyle>
                </ReassuranceSugTextTitleContainerStyle>
                <ReassuranceSeekFakePrompt type="button" disabled>
                  <ReassuranceTextStyle>
                    {i18n.t('reassurance.sug_ex')}
                  </ReassuranceTextStyle>
                </ReassuranceSeekFakePrompt>
              </ReassuranceSeekBlockComponentStyle>
              <ReassuranceSeekBlockComponentStyle>
                <ReassuranceSugTextTitleContainerStyle>
                  <ReassuranceBlueTextBigStyle>
                    {i18n.t('reassurance.themes')}
                  </ReassuranceBlueTextBigStyle>
                  <ReassuranceTextStyle>
                    {i18n.t('reassurance.themes_text')}
                  </ReassuranceTextStyle>
                </ReassuranceSugTextTitleContainerStyle>
                <ReassuranceThemesContainer>
                  <li>
                    <WelcomeThemesButtonStyle
                      type="button"
                      disabled
                      standardStyle
                      style={{ backgroundColor: `${colors[0]}` }}
                    >
                      {i18n.t('reassurance.theme_first')}
                    </WelcomeThemesButtonStyle>
                  </li>
                  <li>
                    <WelcomeThemesButtonStyle
                      type="button"
                      disabled
                      standardStyle
                      style={{ backgroundColor: `${colors[1]}` }}
                    >
                      {i18n.t('reassurance.theme_second')}
                    </WelcomeThemesButtonStyle>
                  </li>
                  <li>
                    <WelcomeThemesButtonStyle
                      type="button"
                      disabled
                      standardStyle
                      style={{ backgroundColor: `${colors[2]}` }}
                    >
                      {i18n.t('reassurance.theme_third')}
                    </WelcomeThemesButtonStyle>
                  </li>
                  <li>
                    <WelcomeThemesButtonStyle
                      type="button"
                      disabled
                      standardStyle
                      style={{ backgroundColor: `${colors[3]}` }}
                    >
                      {i18n.t('reassurance.theme_fourth')}
                    </WelcomeThemesButtonStyle>
                  </li>
                </ReassuranceThemesContainer>
              </ReassuranceSeekBlockComponentStyle>
              <ReassuranceSeekBlockComponentStyle>
                <ReassuranceSugTextTitleContainerStyle>
                  <ReassuranceBlueTextBigStyle>
                    {i18n.t('reassurance.auto')}
                  </ReassuranceBlueTextBigStyle>
                  <ReassuranceTextStyle>
                    {i18n.t('reassurance.auto_text')}
                  </ReassuranceTextStyle>
                </ReassuranceSugTextTitleContainerStyle>
                <ReassuranceFakePromptContainerStyle>
                  <PromptFormInputStyle
                    type="text"
                    disabled
                    placeholder={i18n.t('reassurance.ask')}
                  />
                  <PromptFormButtonsContainerStyle>
                    <PromptFormSubmitStyle type="button" disabled>
                      <PromptFormButtonArrowStyle
                        src={disabledButton}
                        alt={i18n.t('prompt.disabled')}
                      />
                    </PromptFormSubmitStyle>
                  </PromptFormButtonsContainerStyle>
                </ReassuranceFakePromptContainerStyle>
              </ReassuranceSeekBlockComponentStyle>
            </ReassuranceSeekBlockStyle>
          </ReassuranceSmalGreyBackground>
        </li>
      </ReassuranceContainerBlockStyle>
      <ReassuranceGreyBackgroundStyle last>
        <ReassuranceContainerBlockStyle grey>
          <ReassuranceTitleStyle>
            {i18n.t('reassurance.how_work_title')}
          </ReassuranceTitleStyle>
          <ReassuranceSeekBlockStyle>
            <ReassuranceSeekBlockComponentStyle>
              <ReassuranceTitleNumberIconContainer>
                <SvgIaStyle aria-hidden />
                <ReassuranceRagContainerStyle>
                  <span>{i18n.t('reassurance.rag_title')}</span>{' '}
                  <abbr title={i18n.t('reassurance.abbr')}>
                    {i18n.t('reassurance.rag')}
                  </abbr>{' '}
                  <span>{i18n.t('reassurance.rag_title_2')}</span>
                </ReassuranceRagContainerStyle>
              </ReassuranceTitleNumberIconContainer>
              <ReassuranceWhyWhoContentStyle>
                <ReassuranceTextStyle>
                  <span>{i18n.t('reassurance.rag_text')}</span>{' '}
                  <abbr title={i18n.t('reassurance.abbr')}>
                    {i18n.t('reassurance.rag')}
                  </abbr>
                  <span>{i18n.t('reassurance.rag_text_1')}</span>
                </ReassuranceTextStyle>
                <ReassuranceTextStyle>
                  {i18n.t('reassurance.rag_text_2')}
                </ReassuranceTextStyle>
                <ReassuranceTextStyle>
                  {i18n.t('reassurance.rag_text_3')}
                </ReassuranceTextStyle>
              </ReassuranceWhyWhoContentStyle>
            </ReassuranceSeekBlockComponentStyle>
            <SvgStandingStyle aria-hidden />
          </ReassuranceSeekBlockStyle>
          <ReassuranceInnerBlockTextGapStyle>
            <ReassuranceTitleNumberIconContainer>
              <SvgPersoStyle aria-hidden />
              <ReassuranceSubitleStyle>
                {i18n.t('reassurance.data_title')}
              </ReassuranceSubitleStyle>
            </ReassuranceTitleNumberIconContainer>
            <ReassuranceTextStyle>
              {i18n.t('reassurance.data_text')}
            </ReassuranceTextStyle>
            <ReassuranceButtonConfidentialityStyle
              href={ROUTE_ASSEMBLY_PRIVACY_POLICY}
              target="_blank"
              rel="noopener"
            >
              {i18n.t('reassurance.data_link')}
              <span>
                <SvgExternalPurpleStyle
                  aria-label={i18n.t('global.open_new_window')}
                />
              </span>
            </ReassuranceButtonConfidentialityStyle>
          </ReassuranceInnerBlockTextGapStyle>
        </ReassuranceContainerBlockStyle>
      </ReassuranceGreyBackgroundStyle>
    </>
  );
};

// default export needed for loadable component
export default AboutPage; // eslint-disable-line import/no-default-export
