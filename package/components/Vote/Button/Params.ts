import i18n from 'i18next';
import { colors } from '@make.org/designsystem/tokens/colors';

export const VOTE_AGREE_KEY = 'agree';
export const VOTE_DISAGREE_KEY = 'disagree';
export const VOTE_NEUTRAL_KEY = 'neutral';

export const voteButtonParams: {
  [n: string]: {
    label: string;
    color: string;
    transform: string;
  };
} = {
  [VOTE_AGREE_KEY]: {
    label: i18n.t('vote.agree'),
    color: colors.Content.Alert.Positive,
    transform: 'none',
  },
  [VOTE_DISAGREE_KEY]: {
    label: i18n.t('vote.disagree'),
    color: colors.Content.Alert.Disagree,
    transform: 'rotate(180deg) scaleX(-1)',
  },
  [VOTE_NEUTRAL_KEY]: {
    label: i18n.t('vote.neutral'),
    color: colors.Content.Alert.Neutral,
    transform: 'rotate(-90deg)',
  },
};

export const voteButtonParamsKeys: Array<string> =
  Object.keys(voteButtonParams);
