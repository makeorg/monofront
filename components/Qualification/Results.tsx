import React from 'react';
import { QualificationType } from '@make.org/types';
import { SpaceBetweenRowStyle } from '@make.org/ui/elements/FlexElements';
import { i18n } from '@make.org/utils/i18n';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { QualificationLabelStyle, QualificationContentStyle } from './style';

type Props = {
  qualification: QualificationType;
  voteColor: string;
};

export const QualificationResults: React.FC<Props> = ({
  qualification,
  voteColor,
}) => (
  <SpaceBetweenRowStyle as="li">
    <QualificationLabelStyle color={voteColor}>
      {i18n.t(`qualification.${qualification.qualificationKey}`)}
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
