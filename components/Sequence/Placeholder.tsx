import React from 'react';
import i18n from 'i18next';
import { SpaceBetweenRowStyle } from '@make.org/ui/elements/FlexElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { ProposalSkeleton } from '@make.org/ui/components/Skeletons/Proposal';
import { SequenceContainerStyle, SequenceContentStyle } from './style';
import { SequencePlaceholderLineStyle } from './Cards/style';

export const SequencePlaceholder: React.FC = () => (
  <SequenceContainerStyle>
    <ScreenReaderItemStyle>{i18n.t('common.loading')}</ScreenReaderItemStyle>
    <SequenceContentStyle>
      <SequencePlaceholderLineStyle className="title" />
      <ProposalSkeleton />
      <SpaceBetweenRowStyle className="fullwidth">
        <SequencePlaceholderLineStyle className="button" />
        <SequencePlaceholderLineStyle />
      </SpaceBetweenRowStyle>
    </SequenceContentStyle>
  </SequenceContainerStyle>
);
