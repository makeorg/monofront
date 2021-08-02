import React, { FC } from 'react';
import i18n from 'i18next';
import { Sharing } from '../../Sharing';
import {
  SharingWrapperStyle,
  SharingTitleStyle,
} from '../../Proposal/SingleProposalCard/style';

export const SingleProposalSharingComponent: FC = () => (
  <SharingWrapperStyle
    id="sharing_proposal"
    as="section"
    aria-labelledby="sharing_title"
  >
    <SharingTitleStyle id="sharing_title">
      {i18n.t('proposal_page.share_text')}
    </SharingTitleStyle>
    <Sharing />
  </SharingWrapperStyle>
);
