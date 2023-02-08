import React from 'react';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
import { closePanel } from '@make.org/store/actions/panel';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import {
  ReportWrapperStyle,
  ReportTitleStyle,
  ReportTextStyle,
  ReportButtonWrapperStyle,
  SvgConfirmationStyle,
} from './style';

export const ReportTranslationConfirmation: React.FC = () => {
  const { dispatch } = useAppContext();
  return (
    <ReportWrapperStyle data-cy-container="report-confirmation">
      <ReportTitleStyle>
        {i18n.t('report_translations.confirmation.title')}
      </ReportTitleStyle>
      <SvgConfirmationStyle />
      <ReportTextStyle>
        {i18n.t('report_translations.confirmation.description')}
      </ReportTextStyle>
      <ReportButtonWrapperStyle>
        <RedButtonStyle
          type="button"
          onClick={() => dispatch(closePanel())}
          data-cy-button="report-confirmation-close"
        >
          {i18n.t('common.close')}
        </RedButtonStyle>
      </ReportButtonWrapperStyle>
    </ReportWrapperStyle>
  );
};
