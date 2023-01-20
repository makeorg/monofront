import { color } from 'athena-design-tokens';
import i18n from 'i18next';
import { OpinionVoteParamsType } from '@make.org/types';

const OPINION_AGREE_KEY = 'agree';
const OPINION_DISAGREE_KEY = 'disagree';
const OPINION_OTHER_KEY = 'other';
const OPINION_PRIORITY_KEY = 'priority';
const OPINION_DOABLE_KEY = 'doable';
const OPINION_NOWAY_KEY = 'noWay';
const OPINION_NONPRIORITY_KEY = 'nonPriority';
const OPINION_EXISTS_KEY = 'exists';
const OPINION_TOBEPRECISED_KEY = 'toBePrecised';

export const opinionsVoteStaticParams: OpinionVoteParamsType = {
  [OPINION_AGREE_KEY]: {
    label: i18n.t('personality.opinions.vote.agree'),
    color: color.agree,
    transform: 'none',
    qualifications: [OPINION_PRIORITY_KEY, OPINION_DOABLE_KEY],
  },
  [OPINION_DISAGREE_KEY]: {
    label: i18n.t('personality.opinions.vote.disagree'),
    color: color.disagree,
    transform: 'rotate(180deg) scaleX(-1)',
    qualifications: [OPINION_NOWAY_KEY, OPINION_NONPRIORITY_KEY],
  },
  [OPINION_OTHER_KEY]: {
    label: i18n.t('personality.opinions.vote.other'),
    color: color.neutral,
    transform: 'rotate(-90deg)',
    qualifications: [OPINION_EXISTS_KEY, OPINION_TOBEPRECISED_KEY],
  },
};
