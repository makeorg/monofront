import React, { FC, useEffect, useState } from 'react';
import { PersonalityType, PersonalityOpinionType } from '@make.org/types';

import {
  ThumbsUpWrapperStyle,
  ThumbsUpStyle,
  PlaceholderParagraphStyle,
} from '@make.org/ui/elements/PlaceholdersElements';
import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import { SecondLevelTitleStyle } from '@make.org/ui/elements/TitleElements';
import {
  ProfileContentHeaderStyle,
  ProfileTitleSeparatorStyle,
} from '@make.org/ui/elements/ProfileElements';
import { SvgThumbsUp, SvgInfos } from '@make.org/ui/Svg/elements';
import i18n from 'i18next';
import { TileWithTitle } from '@make.org/ui/components/TileWithTitle';
import { ParagraphStyle } from '@make.org/ui/elements/ParagraphElements';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import { PersonalityService } from '@make.org/utils/services/Personality';
import { Spinner } from '@make.org/ui/components/Loading/Spinner';
import { UnstyledListStyle } from '@make.org/ui/elements/ListElements';
import { formatUserName } from '@make.org/utils/helpers/stringFormatter';
import { DisclaimerSubtitleStyle, OpinionCardListItemStyle } from './style';
import { OpinionCard } from './Card';

type Props = {
  personality: PersonalityType;
  privateProfile?: boolean;
};

type OpinionsProps = {
  opinions: PersonalityOpinionType[];
  personality: PersonalityType;
};

const RenderOpinions: FC<OpinionsProps> = ({ opinions, personality }) => {
  const noOpinions = opinions.length < 1;

  if (noOpinions) {
    return (
      <CenterColumnStyle>
        <ThumbsUpWrapperStyle>
          <SvgThumbsUp style={ThumbsUpStyle} focusable="false" />
        </ThumbsUpWrapperStyle>
        <PlaceholderParagraphStyle>
          {i18n.t('personality.opinions.placeholder_text', {
            firstname: formatUserName(personality.firstName),
            lastname: formatUserName(personality.lastName),
          })}
        </PlaceholderParagraphStyle>
      </CenterColumnStyle>
    );
  }

  return (
    <UnstyledListStyle>
      {opinions.map(opinion => (
        <OpinionCardListItemStyle key={opinion.topIdea.id}>
          <OpinionCard userId={personality.userId} opinion={opinion} />
        </OpinionCardListItemStyle>
      ))}
    </UnstyledListStyle>
  );
};

const getCommentedOpinions = (opinions: PersonalityOpinionType[]) =>
  opinions.filter(opinion => opinion.comment !== null);

export const Opinions: FC<Props> = ({
  personality,
  privateProfile = false,
}) => {
  const [opinions, setOpinions] = useState<PersonalityOpinionType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPersonnalityOpinions = async () => {
    const personalityOpinions = await PersonalityService.getPersonnalityOpinion(
      personality.userId
    );
    if (!personalityOpinions) {
      return;
    }

    if (privateProfile) {
      setOpinions(personalityOpinions);
    } else {
      setOpinions(getCommentedOpinions(personalityOpinions));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPersonnalityOpinions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [personality]);

  return (
    <>
      {!privateProfile ? (
        <ProfileContentHeaderStyle>
          <SecondLevelTitleStyle>
            {i18n.t('personality.opinions.title', {
              firstname: formatUserName(personality.firstName),
              lastname: formatUserName(personality.lastName),
            })}
          </SecondLevelTitleStyle>
          <ProfileTitleSeparatorStyle />
        </ProfileContentHeaderStyle>
      ) : (
        <>
          <ScreenReaderItemStyle>
            <SecondLevelTitleStyle>
              {i18n.t('personality.opinions.title', {
                firstname: formatUserName(personality.firstName),
                lastname: formatUserName(personality.lastName),
              })}
            </SecondLevelTitleStyle>
            <ProfileTitleSeparatorStyle />
          </ScreenReaderItemStyle>
          <TileWithTitle
            title={i18n.t('personality.disclaimer.title')}
            icon={
              // eslint-disable-next-line react/jsx-wrap-multilines
              <SvgInfos
                aria-hidden
                style={{ marginRight: '10px' }}
                focusable="false"
              />
            }
          >
            <DisclaimerSubtitleStyle>
              {i18n.t('personality.disclaimer.subtitle_first')}
            </DisclaimerSubtitleStyle>
            <ParagraphStyle>
              {i18n.t('personality.disclaimer.description_first')}
            </ParagraphStyle>
            <DisclaimerSubtitleStyle className="margin-top">
              {i18n.t('personality.disclaimer.subtitle_second')}
            </DisclaimerSubtitleStyle>
            <ParagraphStyle
              dangerouslySetInnerHTML={{
                __html: i18n.t('personality.disclaimer.description_second', {
                  mailto:
                    '<a class="red-link" href="mailto:candidats-municipales@make.org">candidats-municipales@make.org</a>',
                }),
              }}
            />
          </TileWithTitle>
        </>
      )}
      {isLoading ? (
        <Spinner />
      ) : (
        <RenderOpinions opinions={opinions} personality={personality} />
      )}
    </>
  );
};
