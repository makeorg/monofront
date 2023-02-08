import React from 'react';
import i18n from 'i18next';
import { setPanelContent } from '@make.org/store/actions/panel';
import { FirstStepReportOptions } from '@make.org/components/ReportOptions/Steps/FirstStep';
import { useAppContext } from '@make.org/store';
import { trackDisplaySolutionOptionsPanel } from '@make.org/utils/services/Tracking';
import { SvgOptions } from '@make.org/ui/Svg/elements';
import { ReportOptionsButtonStyle } from './style';

type Props = {
  switchProposalContent: () => void;
  showOriginal: boolean;
  proposalId: string;
  translationLanguage: string;
};

export const ReportOptionsButton: React.FC<Props> = ({
  switchProposalContent,
  showOriginal,
  proposalId,
  translationLanguage,
}) => {
  const { dispatch } = useAppContext();
  const handleClick = () => {
    dispatch(
      setPanelContent(
        <FirstStepReportOptions
          switchProposalContent={switchProposalContent}
          showOriginal={showOriginal}
          proposalId={proposalId}
          translationLanguage={translationLanguage}
        />
      )
    );
    trackDisplaySolutionOptionsPanel();
  };

  return (
    <ReportOptionsButtonStyle
      aria-label={i18n.t('report_translations.button') || undefined}
      onClick={handleClick}
      data-cy-button="translation-report"
    >
      <SvgOptions aria-hidden focusable="false" />
    </ReportOptionsButtonStyle>
  );
};
