// @flow
import React from 'react';
import { i18n } from 'Shared/i18n';
import { trackClickLearnMore } from 'Shared/services/Tracking';
import { ResultCardSidebar } from 'Client/features/consultation/Results/ResultCardSidebar';
import { ScreenReaderItemStyle } from 'Client/ui/Elements/AccessibilityElements';
import { ResultContextNewWindowLinkStyle, NewWindowIconStyle } from './style';

type Props = {
  /** About link to render */
  aboutUrl: string,
  /** context description to render */
  context: string,
};

export const ResultsContext = ({ aboutUrl, context }: Props) => (
  <>
    <ResultCardSidebar
      title={i18n.t('consultation.results.context')}
      description={context}
      isContext
    >
      <ResultContextNewWindowLinkStyle
        href={aboutUrl}
        target="_blank"
        rel="noopener"
        onClick={() => trackClickLearnMore()}
      >
        {i18n.t('consultation.cards.about.link')}
        <NewWindowIconStyle />
        <ScreenReaderItemStyle>
          {i18n.t('common.open_new_window')}
        </ScreenReaderItemStyle>
      </ResultContextNewWindowLinkStyle>
    </ResultCardSidebar>
  </>
);
