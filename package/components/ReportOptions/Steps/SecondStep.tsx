import React, { useState } from 'react';
import i18n from 'i18next';
import { setPanelContent } from '@make.org/store/actions/panel';
import { useAppContext } from '@make.org/store';
import { FORM } from '@make.org/types/enums';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  SvgQuestionMark,
  SvgErrorTranslation,
  SvgCrossFakeInfo,
  SvgOffensif,
} from '@make.org/ui/Svg/elements';
import { FirstStepReportOptions } from './FirstStep';
import { ReportTranslationConfirmation } from './Confirmation';
import {
  ReportTitleStyle,
  ReportWrapperStyle,
  ReportButtonWrapperStyle,
  ReportFormWrapperStyle,
  ReportFormItemWrapperStyle,
  ReportFormAsTransparentButtonLabelStyle,
  ReportFormSvgWrapperStyle,
  ReportFormBackIconStyle,
  ReportFormIconButtonWrapperStyle,
  ReportFormBackButtonWrapperStyle,
} from './style';

export const ReportOptionsLabel: Array<{
  name: string;
  icon: JSX.Element;
  label: string;
}> = [
  {
    name: 'unclear',
    icon: <SvgQuestionMark />,
    label: i18n.t('report_translations.form.unclear'),
  },
  {
    name: 'error',
    icon: <SvgErrorTranslation />,
    label: i18n.t('report_translations.form.error'),
  },
  {
    name: 'false information',
    icon: <SvgCrossFakeInfo />,
    label: i18n.t('report_translations.form.false_info'),
  },
  {
    name: 'offensive',
    icon: <SvgOffensif />,
    label: i18n.t('report_translations.form.offensive'),
  },
];

type Props = {
  switchProposalContent: () => void;
  showOriginal: boolean;
};

export const SecondStepForm: React.FC<Props> = ({
  switchProposalContent,
  showOriginal,
}) => {
  const { dispatch } = useAppContext();
  const [currentReport, setCurrentReport] = useState<string>('unclear');
  const checkCurrentReport = (
    itemName: string,
    currentReportSelected: string
  ): boolean => {
    if (itemName === currentReportSelected) {
      return true;
    }
    return false;
  };

  const handleSubmit = () => {
    dispatch(setPanelContent(<ReportTranslationConfirmation />));
  };

  return (
    <>
      <ReportFormBackButtonWrapperStyle
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
        <ReportFormIconButtonWrapperStyle>
          <ReportFormBackIconStyle />
        </ReportFormIconButtonWrapperStyle>
        {i18n.t('common.back')}
      </ReportFormBackButtonWrapperStyle>
      <ReportWrapperStyle
        as="form"
        id={FORM.REPORT_TRANSLATION}
        onSubmit={handleSubmit}
        aria-labelledby={i18n.t('report_translations.form.title') || undefined}
      >
        <ReportTitleStyle>
          {i18n.t('report_translations.form.title')}
        </ReportTitleStyle>
        <ReportFormWrapperStyle>
          {ReportOptionsLabel.map(
            (item: { name: string; icon: JSX.Element; label?: string }) => (
              <ReportFormItemWrapperStyle
                key={item.name}
                className={item.name === currentReport ? 'selected' : ''}
              >
                <ScreenReaderItemStyle>
                  <input
                    id={item.name}
                    type="radio"
                    value={item.name}
                    name="report"
                    onChange={() => {
                      setCurrentReport(item.name);
                    }}
                    checked={checkCurrentReport(item.name, currentReport)}
                  />
                </ScreenReaderItemStyle>
                <ReportFormAsTransparentButtonLabelStyle
                  htmlFor={item.name}
                  className={item.name === currentReport ? 'selected' : ''}
                >
                  <ReportFormSvgWrapperStyle>
                    {item.icon}
                  </ReportFormSvgWrapperStyle>
                  {item.label}
                </ReportFormAsTransparentButtonLabelStyle>
              </ReportFormItemWrapperStyle>
            )
          )}
        </ReportFormWrapperStyle>
        <ReportButtonWrapperStyle>
          <RedButtonStyle type="submit">
            {i18n.t('report_translations.form.report')}
          </RedButtonStyle>
        </ReportButtonWrapperStyle>
      </ReportWrapperStyle>
    </>
  );
};
