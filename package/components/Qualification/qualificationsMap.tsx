import i18n from 'i18next';

export const getQualificationsTransMap = (): Map<string, string> =>
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
  ]);
