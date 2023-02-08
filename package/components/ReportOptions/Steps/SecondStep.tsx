import React, { FormEvent, useState } from 'react';
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
import { trackReportSolution } from '@make.org/utils/services/Tracking';
import { ProposalService } from '@make.org/utils/services/Proposal';
import { ReportReasonType } from '@make.org/types';
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
  name: ReportReasonType;
  icon: JSX.Element;
  label: string;
}> = [
  {
    name: 'Inintelligible',
    icon: <SvgQuestionMark />,
    label: 'report_translations.form.unclear',
  },
  {
    name: 'BadTranslation',
    icon: <SvgErrorTranslation />,
    label: 'report_translations.form.error',
  },
  {
    name: 'IncorrectInformation',
    icon: <SvgCrossFakeInfo />,
    label: 'report_translations.form.false_info',
  },
  {
    name: 'Offensive',
    icon: <SvgOffensif />,
    label: 'report_translations.form.offensive',
  },
];

type Props = {
  switchProposalContent: () => void;
  showOriginal: boolean;
  proposalId: string;
  translationLanguage: string;
};

export const SecondStepForm: React.FC<Props> = ({
  switchProposalContent,
  showOriginal,
  proposalId,
  translationLanguage,
}) => {
  const { dispatch } = useAppContext();
  const [currentReport, setCurrentReport] =
    useState<ReportReasonType>('Inintelligible');
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const checkCurrentReport = (
    itemName: string,
    currentReportSelected: string
  ): boolean => {
    if (itemName === currentReportSelected) {
      return true;
    }
    return false;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setCanSubmit(false);
    const success = () => {
      setCanSubmit(true);
      dispatch(setPanelContent(<ReportTranslationConfirmation />));
      trackReportSolution(currentReport);
    };
    const failure = (_: Error) => {
      setCanSubmit(true);
    };
    ProposalService.report(
      proposalId,
      currentReport,
      translationLanguage,
      success,
      failure
    );
  };

  const handleReportOptionsKeypress = (
    event: React.KeyboardEvent<HTMLLIElement>,
    name: ReportReasonType
  ): void => {
    if (event.key === 'Enter') {
      setCurrentReport(name);
    }
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
                proposalId={proposalId}
                translationLanguage={translationLanguage}
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
        data-cy-container="report-second-step"
      >
        <ReportTitleStyle>
          {i18n.t('report_translations.form.title')}
        </ReportTitleStyle>
        <ReportFormWrapperStyle>
          {ReportOptionsLabel.map(
            (item: {
              name: ReportReasonType;
              icon: JSX.Element;
              label: string;
            }) => (
              <ReportFormItemWrapperStyle
                tabIndex={0}
                key={item.name}
                className={item.name === currentReport ? 'selected' : ''}
                onKeyPress={event =>
                  handleReportOptionsKeypress(
                    event as React.KeyboardEvent<HTMLLIElement>,
                    item.name
                  )
                }
              >
                <ScreenReaderItemStyle>
                  <input
                    tabIndex={-1}
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
                  {i18n.t(item.label)}
                </ReportFormAsTransparentButtonLabelStyle>
              </ReportFormItemWrapperStyle>
            )
          )}
        </ReportFormWrapperStyle>
        <ReportButtonWrapperStyle>
          <RedButtonStyle
            type="submit"
            disabled={!canSubmit}
            data-cy-button="submit-report"
          >
            {i18n.t('report_translations.form.report')}
          </RedButtonStyle>
        </ReportButtonWrapperStyle>
      </ReportWrapperStyle>
    </>
  );
};
