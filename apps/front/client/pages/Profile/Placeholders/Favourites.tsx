import React, { FC } from 'react';
import { colors } from '@make.org/designsystem/tokens/colors';
import i18n from 'i18next';
import {
  CenterColumnStyle,
  SpaceBetweenColumnStyle,
} from '@make.org/ui/elements/FlexElements';
import { SvgLike, SvgThumbsUp } from '@make.org/ui/Svg/elements';
import {
  FavouritesCardStyle,
  FavouritesProposalStyle,
  PlaceholderParagraphStyle,
  SvgLikeStyle,
} from '@make.org/ui/elements/PlaceholdersElements';
import { VoteContainerStyle } from '@make.org/components/Vote/style';
import {
  VoteResultBarStyle,
  VoteResultContainerStyle,
  VoteResultGraphStyle,
  VoteResultItemStyle,
  VoteResultTotalLabelStyle,
} from '@make.org/components/Vote/Result/style';
import {
  QualifyButtonStyle,
  VoteButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { Tooltip } from '@make.org/ui/components/Tooltip';
import { CounterStyle } from '@make.org/components/Qualification/style';

const tooltipContent = (percent: number, label: string) => (
  <>
    <p>{label}</p>
    <p>{i18n.t('common.percent', { percent })}</p>
  </>
);

export const ProfileFavouritesPlaceholder: FC = () => (
  <CenterColumnStyle>
    <SvgLike style={SvgLikeStyle} focusable="false" />
    <PlaceholderParagraphStyle>
      {i18n.t('profile.favourites.description.introduction')}
    </PlaceholderParagraphStyle>
    <PlaceholderParagraphStyle>
      {i18n.t('profile.favourites.description.explanation')}
    </PlaceholderParagraphStyle>
    <FavouritesCardStyle aria-hidden>
      <FavouritesProposalStyle as="p">
        {i18n.t('profile.favourites.card_title')}
      </FavouritesProposalStyle>
      <VoteContainerStyle className="placeholder">
        <VoteResultContainerStyle>
          <VoteButtonStyle
            className="agree voted"
            color={colors.Content.Alert.Positive}
            disabled
          >
            <SvgThumbsUp aria-hidden focusable="false" />
          </VoteButtonStyle>
          <VoteResultGraphStyle>
            <VoteResultItemStyle>
              <Tooltip
                content={tooltipContent(100, i18n.t('vote.agree'))}
                direction="bottom"
              >
                <VoteResultBarStyle
                  color={colors.Content.Alert.Positive}
                  percent={100}
                  type="button"
                />
              </Tooltip>
            </VoteResultItemStyle>
            <VoteResultItemStyle>
              <Tooltip
                content={tooltipContent(0, i18n.t('vote.disagree'))}
                direction="bottom"
              >
                <VoteResultBarStyle
                  color={colors.Content.Alert.Disagree}
                  percent={0}
                  type="button"
                />
              </Tooltip>
            </VoteResultItemStyle>
            <VoteResultItemStyle>
              <Tooltip
                content={tooltipContent(0, i18n.t('vote.neutral'))}
                direction="bottom"
              >
                <VoteResultBarStyle
                  color={colors.Content.Alert.Neutral}
                  percent={0}
                  type="button"
                />
              </Tooltip>
            </VoteResultItemStyle>
          </VoteResultGraphStyle>
          <VoteResultTotalLabelStyle>
            {i18n.t('vote.label', { count: 4242 })}
          </VoteResultTotalLabelStyle>
        </VoteResultContainerStyle>
        <SpaceBetweenColumnStyle>
          <QualifyButtonStyle
            className="qualified"
            color={colors.Content.Alert.Positive}
            disabled
          >
            <span>{i18n.t('qualification.likeIt')}</span>
            <CounterStyle>+1</CounterStyle>
          </QualifyButtonStyle>
          <QualifyButtonStyle color={colors.Content.Alert.Positive} disabled>
            <span>{i18n.t('qualification.doable')}</span>
            <CounterStyle>+1</CounterStyle>
          </QualifyButtonStyle>
          <QualifyButtonStyle color={colors.Content.Alert.Positive} disabled>
            <span>{i18n.t('qualification.platitudeAgree')}</span>
            <CounterStyle>+1</CounterStyle>
          </QualifyButtonStyle>
        </SpaceBetweenColumnStyle>
      </VoteContainerStyle>
    </FavouritesCardStyle>
  </CenterColumnStyle>
);
