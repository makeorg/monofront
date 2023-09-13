import React, { useMemo } from 'react';
import { QualificationType } from '@make.org/types';
import { SpaceBetweenRowStyle } from '@make.org/ui/elements/FlexElements';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { getQualificationsTransMap } from './qualificationsMap';
import { QualificationLabelStyle, QualificationContentStyle } from './style';

type Props = {
  qualification: QualificationType;
  voteColor: string;
};

export const QualificationResults: React.FC<Props> = ({
  qualification,
  voteColor,
}) => {
  const qualificationTransMap = useMemo(getQualificationsTransMap, []);

  return (
    <SpaceBetweenRowStyle as="li">
      <QualificationLabelStyle color={voteColor}>
        {qualificationTransMap.get(qualification.qualificationKey) || ''}
      </QualificationLabelStyle>
      <ScreenReaderItemStyle> : </ScreenReaderItemStyle>
      <QualificationContentStyle>
        {` ${qualification.count} `}
      </QualificationContentStyle>
      <ScreenReaderItemStyle>
        {i18n.t('qualification.times')}
      </ScreenReaderItemStyle>
    </SpaceBetweenRowStyle>
  );
};
