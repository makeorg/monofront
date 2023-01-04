import React from 'react';
import i18n from 'i18next';
import { setPanelContent } from '@make.org/store/actions/panel';
import { FirstStepReportOptions } from '@make.org/components/ReportOptions/Steps/FirstStep';
import { useAppContext } from '@make.org/store';
import { SvgOptions } from '@make.org/ui/Svg/elements';
import { ReportOptionsButtonStyle } from './style';

type Props = {
  switchProposalContent: () => void;
  showOriginal: boolean;
};

export const ReportOptionsButton: React.FC<Props> = ({
  switchProposalContent,
  showOriginal,
}) => {
  const { dispatch } = useAppContext();
  return (
    <ReportOptionsButtonStyle
      aria-label={i18n.t('report_translations.button') || undefined}
      onClick={() =>
        dispatch(
          setPanelContent(
            <FirstStepReportOptions
              switchProposalContent={switchProposalContent}
              showOriginal={showOriginal}
            />
          )
        )
      }
    >
      <SvgOptions aria-hidden focusable="false" />
    </ReportOptionsButtonStyle>
  );
};
