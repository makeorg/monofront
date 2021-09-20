import React, { FC } from 'react';
import i18n from 'i18next';
import { trackClickLearnMore } from '@make.org/utils/services/Tracking';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { ResultCardSidebar } from '../ResultCardSidebar';
import { ResultContextNewWindowLinkStyle, NewWindowIconStyle } from './style';

type Props = {
  /** About link to render */
  aboutUrl: string;
  /** context description to render */
  context: string;
};

export const ResultsContext: FC<Props> = ({ aboutUrl, context }) => (
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
        <NewWindowIconStyle aria-hidden focusable="false" />
        <ScreenReaderItemStyle>
          {i18n.t('common.open_new_window')}
        </ScreenReaderItemStyle>
      </ResultContextNewWindowLinkStyle>
    </ResultCardSidebar>
  </>
);
