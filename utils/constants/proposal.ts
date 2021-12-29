import i18n from 'i18next';

export const MIN_PROPOSAL_LENGTH = 12;
export const MAX_PROPOSAL_LENGTH = 140;
export const MIN_USER_FIRSTNAME_LENGTH = 2;
export const getBaitText = (): string => i18n.t('proposal_submit.form.bait');

export const PROPOSALS_LISTING_LIMIT = 10;
