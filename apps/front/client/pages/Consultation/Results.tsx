import React, { useState, useEffect, FC } from 'react';
import loadable from '@loadable/component';
import { matchDesktopDevice } from '@make.org/utils/helpers/styled';
import { QuestionType, QuestionResultsType, ILogger } from '@make.org/types';
import i18n from 'i18next';
import { MiddlePageWrapperStyle } from '@make.org/ui/elements/MainElements';
import { trackDisplayResultsPage } from '@make.org/utils/services/Tracking';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { GliderStylesheet } from '@make.org/assets/css-in-js/GliderStyle';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { ThemeProvider } from 'styled-components';
import { ExpressService } from '@make.org/utils/services/Express';
import { SvgLightBulb, SvgLightning } from '@make.org/ui/Svg/elements';
import { ExternalLinkIconStyle } from '@make.org/ui/elements/ButtonsElements';
import { IDS } from '@make.org/types/enums';
import { useAppContext } from '@make.org/store';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  ParticipateContentStyle,
  ParticipateMainContentStyle,
  ParticipateInnerStyle,
  ParticipateSidebarContentStyle,
  ResultsTitleStyle,
  PageResultActionsContainerStyle,
  SvgActionsFDDStyle,
  PageResultActionTextStyle,
  PageResultActionTitleStyle,
  PageResultActionTextContainerStyle,
  PageResultActionContentStyle,
  PageResultActionButtonStyle,
  PageResultActionSvgContainer,
} from './style';
import { TopIdeas } from '../../app/Consultation/Results/TopIdeas';
import { ResultsSlider } from '../../app/Consultation/Results/Sliders';
import { ProposalsResults } from '../../app/Consultation/Results/Proposals';
import { ParticipateHeader } from '../../app/Consultation/Header';
import { ParticipateHighlights } from '../../app/Consultation/Highlights';
import { ResultsContext } from '../../app/Consultation/Results/Context';
import { Timeline } from '../../app/Consultation/Timeline';
import { CitizenRegister } from '../../app/Consultation/CitizenRegister';
import { ResultCard } from '../../app/Consultation/Results/ResultCard';
import { ResultsReport } from '../../app/Consultation/Results/Report';
import { ResultsSkipLinks } from '../../app/SkipLinks/Results';

const NotFoundPage = loadable(() => import('../NotFound'));

type Props = {
  logger: ILogger;
};

const ResultPage: FC<Props> = ({ logger }) => {
  const { state } = useAppContext();
  const question: QuestionType = selectCurrentQuestion(state);

  const { device } = state.appConfig;
  const isDesktop = matchDesktopDevice(device);
  const CARTOGRAPHY_SLIDER = 'cartography';
  const PARTICIPATION_SLIDER = 'participation';
  const expressService = new ExpressService(logger);

  const metas = (
    <MetaTags
      title={i18n.t('meta.results.title', {
        question: question.wording.question,
      })}
      description={i18n.t('meta.results.description')}
      picture={question.wording.metas.picture}
    />
  );
  const [alternativeContent, setAlternativeContent] = useState(
    <>
      {metas}
      <MiddlePageWrapperStyle>
        <Spinner />
      </MiddlePageWrapperStyle>
    </>
  );
  const [questionResults, setResults] = useState<QuestionResultsType>();

  const initResults = async () => {
    const results = await expressService.getResults(question.questionId, () =>
      setAlternativeContent(<NotFoundPage />)
    );

    if (results) {
      setResults(results);
    }
  };

  const TopIdeaIcon = (
    <SvgLightBulb
      aria-hidden
      width={isDesktop ? 36 : 31}
      height={isDesktop ? 36 : 31}
      focusable="false"
    />
  );

  const ControversyIcon = (
    <SvgLightning
      fill="#f7b500"
      aria-hidden
      width={20}
      height={32}
      focusable="false"
    />
  );

  useEffect(() => {
    initResults();
    trackDisplayResultsPage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!questionResults) {
    return alternativeContent;
  }

  return (
    <>
      <GliderStylesheet />
      <ThemeProvider theme={question.theme}>
        {metas}
        <ResultsSkipLinks />
        <ParticipateHeader />
        {!isDesktop && (
          <ResultsContext
            context={questionResults.context}
            aboutUrl={question.aboutUrl}
          />
        )}
        <ParticipateHighlights />

        {question.actionsUrl && (
          <PageResultActionsContainerStyle>
            <PageResultActionContentStyle>
              <PageResultActionTextContainerStyle>
                <PageResultActionTitleStyle>
                  {i18n.t('consultation.results.actionFDD.title')}
                </PageResultActionTitleStyle>
                <PageResultActionTextStyle>
                  {i18n.t('consultation.results.actionFDD.text')}
                </PageResultActionTextStyle>
                <PageResultActionButtonStyle
                  as="a"
                  href={question.actionsUrl}
                  target="_blank"
                  rel="noopener"
                >
                  {i18n.t('consultation.results.actionFDD.discover')}
                  <ExternalLinkIconStyle aria-hidden focusable="false" />
                </PageResultActionButtonStyle>
              </PageResultActionTextContainerStyle>
              <PageResultActionSvgContainer>
                <SvgActionsFDDStyle />
              </PageResultActionSvgContainer>
            </PageResultActionContentStyle>
          </PageResultActionsContainerStyle>
        )}

        <ParticipateContentStyle>
          <ResultsTitleStyle>
            {i18n.t('consultation.results.title')}
          </ResultsTitleStyle>
          <ParticipateInnerStyle>
            <ParticipateMainContentStyle>
              <ResultCard
                icon={TopIdeaIcon}
                title={i18n.t('consultation.results.top_ideas.title', {
                  count: questionResults.top_ideas.length,
                })}
                description={i18n.t(
                  'consultation.results.top_ideas.introduction'
                )}
                id={IDS.RESULTS_TOP_IDEAS}
              >
                <TopIdeas
                  topIdeas={questionResults.top_ideas}
                  question={question}
                />
              </ResultCard>
              {questionResults.cartography && (
                <ResultCard
                  title={i18n.t('consultation.results.cartography.title')}
                  id={IDS.RESULTS_CARTOGRAPHY}
                >
                  <ResultsSlider
                    data={questionResults.cartography}
                    sliderName={CARTOGRAPHY_SLIDER}
                    styleClass="results-page"
                  />
                </ResultCard>
              )}
              <ResultCard
                title={i18n.t(
                  'consultation.results.proposals.controversials_title'
                )}
                description={i18n.t(
                  'consultation.results.proposals.controversials_description'
                )}
                icon={ControversyIcon}
                id={IDS.RESULTS_CONTROVERSIALS}
              >
                <ProposalsResults
                  proposals={questionResults.controversials}
                  question={question}
                />
              </ResultCard>
              <ResultCard
                title={i18n.t('consultation.results.participation.title')}
                id={IDS.RESULTS_PARTICIPATION}
              >
                <ResultsSlider
                  data={questionResults.participation}
                  sliderName={PARTICIPATION_SLIDER}
                />
              </ResultCard>
            </ParticipateMainContentStyle>
            <ParticipateSidebarContentStyle>
              {isDesktop && (
                <ResultsContext
                  context={questionResults.context}
                  aboutUrl={question.aboutUrl}
                />
              )}
              {question.reportUrl && <ResultsReport question={question} />}
            </ParticipateSidebarContentStyle>
          </ParticipateInnerStyle>
        </ParticipateContentStyle>
        <Timeline />
        <ParticipateContentStyle as="aside">
          <CitizenRegister />
        </ParticipateContentStyle>
      </ThemeProvider>
    </>
  );
};

// default export needed for loadable coomponent
// eslint-disable-next-line import/no-default-export
export default ResultPage;
