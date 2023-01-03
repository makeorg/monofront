import React from 'react';
import { SvgTranslation, SvgWarning } from '@make.org/ui/Svg/elements';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { setPanelContent } from '@make.org/store/actions/panel';
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
};

export const FirstStepReportOptions: React.FC<Props> = ({
  switchProposalContent,
}) => {
  const { dispatch } = useAppContext();

  return (
    <ReportFirstStepWrapperStyle>
      <header>
        <ReportTitleStyle>
          {i18n.t('report_translations.first_step.title')}
        </ReportTitleStyle>
        <ReportTextStyle>
          {i18n.t('report_translations.first_step.text')}
        </ReportTextStyle>
      </header>
      <ReportOptionsWrapperStyle>
        <ReportOptionsButtonStyle onClick={switchProposalContent}>
          <SvgTranslation />
          <ReportOptionsButtonTextStyle>
            {i18n.t('report_translations.see_original_button')}
          </ReportOptionsButtonTextStyle>
        </ReportOptionsButtonStyle>
        <ReportOptionsSeparatorStyle />
        <ReportOptionsButtonStyle>
          <SvgWarning />
          <ReportOptionsButtonTextStyle
            onClick={() =>
              dispatch(
                setPanelContent(
                  <SecondStepForm
                    switchProposalContent={switchProposalContent}
                  />
                )
              )
            }
          >
            {i18n.t('report_translations.form.report')}
          </ReportOptionsButtonTextStyle>
        </ReportOptionsButtonStyle>
      </ReportOptionsWrapperStyle>
    </ReportFirstStepWrapperStyle>
  );
};
