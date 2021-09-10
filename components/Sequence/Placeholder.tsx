import React from 'react';
import i18n from 'i18next';
import { SpaceBetweenRowStyle } from '@make.org/ui/elements/FlexElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { ProposalSkeleton } from '@make.org/ui/components/Skeletons/Proposal';
import { useAppContext } from '@make.org/store';
import { SequenceContainerStyle, SequenceContentStyle } from './style';
import { SequencePlaceholderLineStyle } from './Cards/style';

export const SequencePlaceholder: React.FC = () => {
  const { state } = useAppContext();
  const { source } = state.appConfig;
  const isWidget = source === 'widget';

  return (
    <SequenceContainerStyle className={isWidget ? 'widget' : ''}>
      <ScreenReaderItemStyle>{i18n.t('common.loading')}</ScreenReaderItemStyle>
      <SequenceContentStyle>
        <SequencePlaceholderLineStyle className="title" />
        <ProposalSkeleton isWidget={isWidget} />
        <SpaceBetweenRowStyle className="fullwidth">
          <SequencePlaceholderLineStyle className="button" />
          <SequencePlaceholderLineStyle />
        </SpaceBetweenRowStyle>
      </SequenceContentStyle>
    </SequenceContainerStyle>
  );
};
