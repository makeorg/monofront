import React, { useMemo } from 'react';
import { QualificationType } from '@make.org/types';
import { SpaceBetweenRowStyle } from '@make.org/ui/elements/FlexElements';
import i18n from 'i18next';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { QualificationLabelStyle, QualificationContentStyle } from './style';

type Props = {
  qualification: QualificationType;
  voteColor: string;
};

export const QualificationResults: React.FC<Props> = ({
  qualification,
  voteColor,
}) => {
  const qualificationTransMap = useMemo(
    () =>
      new Map([
        ['likeIt', i18n.t('qualification.likeIt')],
        ['doable', i18n.t('qualification.doable')],
        ['platitudeAgree', i18n.t('qualification.platitudeAgree')],
        ['noWay', i18n.t('qualification.noWay')],
        ['impossible', i18n.t('qualification.impossible')],
        ['platitudeDisagree', i18n.t('qualification.platitudeDisagree')],
        ['platitudeDisagree', i18n.t('qualification.platitudeDisagree')],
        ['noOpinion', i18n.t('qualification.noOpinion')],
        ['doNotUnderstand', i18n.t('qualification.doNotUnderstand')],
        ['doNotCare', i18n.t('qualification.doNotCare')],
      ]),
    [i18n.language]
  );

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
