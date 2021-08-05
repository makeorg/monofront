import React, { FC } from 'react';
import { color } from 'athena-design-tokens';
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

const tooltipContent = (percent: number, voteKey: string) => (
  <>
    <p>{i18n.t(`vote.${voteKey}`)}</p>
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
          <VoteButtonStyle className="agree voted" color={color.agree} disabled>
            <SvgThumbsUp aria-hidden focusable="false" />
          </VoteButtonStyle>
          <VoteResultGraphStyle>
            <VoteResultItemStyle>
              <Tooltip
                content={tooltipContent(100, 'agree')}
                direction="bottom"
              >
                <VoteResultBarStyle
                  color={color.agree}
                  percent={100}
                  type="button"
                />
              </Tooltip>
            </VoteResultItemStyle>
            <VoteResultItemStyle>
              <Tooltip
                content={tooltipContent(0, 'disagree')}
                direction="bottom"
              >
                <VoteResultBarStyle
                  color={color.disagree}
                  percent={0}
                  type="button"
                />
              </Tooltip>
            </VoteResultItemStyle>
            <VoteResultItemStyle>
              <Tooltip
                content={tooltipContent(0, 'neutral')}
                direction="bottom"
              >
                <VoteResultBarStyle
                  color={color.neutral}
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
            color={color.agree}
            disabled
          >
            <span>{i18n.t('qualification.likeIt')}</span>
            <CounterStyle>+1</CounterStyle>
          </QualifyButtonStyle>
          <QualifyButtonStyle color={color.agree} disabled>
            <span>{i18n.t('qualification.doable')}</span>
            <CounterStyle>+1</CounterStyle>
          </QualifyButtonStyle>
          <QualifyButtonStyle color={color.agree} disabled>
            <span>{i18n.t('qualification.platitudeAgree')}</span>
            <CounterStyle>+1</CounterStyle>
          </QualifyButtonStyle>
        </SpaceBetweenColumnStyle>
      </VoteContainerStyle>
    </FavouritesCardStyle>
  </CenterColumnStyle>
);
