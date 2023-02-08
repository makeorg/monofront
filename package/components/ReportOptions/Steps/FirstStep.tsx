import React from 'react';
import { SvgTranslation, SvgWarning } from '@make.org/ui/Svg/elements';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { setPanelContent } from '@make.org/store/actions/panel';
import {
  trackDisplayReportOptions,
  trackDisplayUntranslatedSolution,
} from '@make.org/utils/services/Tracking';
import { SecondStepForm } from './SecondStep';
import {
  ReportFirstStepWrapperStyle,
  ReportTitleStyle,
  ReportTextStyle,
  ReportOptionsWrapperStyle,
  ReportOptionsButtonStyle,
  ReportOptionsButtonTextStyle,
  ReportOptionsSeparatorStyle,
} from './style';

type Props = {
  switchProposalContent: () => void;
  showOriginal: boolean;
  proposalId: string;
  translationLanguage: string;
};

export const FirstStepReportOptions: React.FC<Props> = ({
  switchProposalContent,
  showOriginal,
  proposalId,
  translationLanguage,
}) => {
  const { dispatch } = useAppContext();
  const handleClickDisplayProposal = () => {
    switchProposalContent();
    if (!showOriginal) {
      trackDisplayUntranslatedSolution('option-panel');
    }
  };
  const handleClickDisplayReportPanel = () => {
    dispatch(
      setPanelContent(
        <SecondStepForm
          switchProposalContent={switchProposalContent}
          showOriginal={showOriginal}
          proposalId={proposalId}
          translationLanguage={translationLanguage}
        />
      )
    );
    trackDisplayReportOptions();
  };

  return (
    <ReportFirstStepWrapperStyle data-cy-container="report-first-step">
      <header>
        <ReportTitleStyle>
          {i18n.t('report_translations.first_step.title')}
        </ReportTitleStyle>
        <ReportTextStyle>
          {i18n.t('report_translations.first_step.text')}
        </ReportTextStyle>
      </header>
      <ReportOptionsWrapperStyle>
        <ReportOptionsButtonStyle onClick={handleClickDisplayProposal}>
          <SvgTranslation />
          <ReportOptionsButtonTextStyle>
            {!showOriginal
              ? i18n.t('proposal_card.original')
              : i18n.t('proposal_card.translation')}
          </ReportOptionsButtonTextStyle>
        </ReportOptionsButtonStyle>
        <ReportOptionsSeparatorStyle />
        <ReportOptionsButtonStyle
          data-cy-button="show-report-form"
          onClick={handleClickDisplayReportPanel}
        >
          <SvgWarning />
          <ReportOptionsButtonTextStyle>
            {i18n.t('report_translations.form.report')}
          </ReportOptionsButtonTextStyle>
        </ReportOptionsButtonStyle>
      </ReportOptionsWrapperStyle>
    </ReportFirstStepWrapperStyle>
  );
};
