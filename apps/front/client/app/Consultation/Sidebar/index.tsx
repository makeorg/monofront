import React, { FC } from 'react';
import { QuestionType } from '@make.org/types';
import i18n from 'i18next';
import { isGreatCause } from '@make.org/utils/helpers/question';
import { FollowUs } from '@make.org/components/Flipping/FollowUs';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';
import { useAppContext } from '@make.org/store';
import { ConsultationPageSidebarStyle } from '../../../pages/Consultation/style';
import { PresentationTile } from './Tiles/Presentation';
import { PartnersTile } from './Tiles/Partners';
import { MethodologyTile } from './Tiles/Methodology';

type Props = {
  question: QuestionType;
};
export const ConsultationSidebar: FC<Props> = ({ question }) => {
  const { state } = useAppContext();
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  return (
    <ConsultationPageSidebarStyle
      id="sidebar_content"
      aria-label={i18n.t('common.sidebar_area')}
      bottomAffix={isGreatCause(question.operationKind)}
    >
      <PresentationTile question={question} />
      <PartnersTile question={question} />
      <MethodologyTile question={question} />
      {!isMobile && <FollowUs question={question} />}
    </ConsultationPageSidebarStyle>
  );
};
