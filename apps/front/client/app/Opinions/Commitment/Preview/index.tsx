import React, { FC, useState, useMemo } from 'react';
import i18n from 'i18next';
import { PersonalityService } from '@make.org/utils/services/Personality';
import { SvgThumbsUp } from '@make.org/ui/Svg/elements';
import { opinionsVoteStaticParams } from '@make.org/utils/constants/opinions';
import { setEmptyStringToNull } from '@make.org/utils/helpers/form';
import {
  CommitmentPreviewSeparatorStyle,
  CommitmentPreviewBoxStyle,
  CommitmentPreviewDislaimerStyle,
  CommitmentPreviewOpinionsIconWrapperStyle,
  CommitmentPreviewParagraphStyle,
  CommitmentPreviewButtonsWrapperStyle,
  CommitmentPreviewConfirmStyle,
  CommitmentPreviewCancelStyle,
  CommitmentPreviewOpinionsParagraphStyle,
  CommitmentPreviewOpinionsWrapperStyle,
} from './style';

type Props = {
  userId: string;
  topIdeaId: string;
  vote: string;
  qualification: string;
  firstComment: string;
  secondComment: string;
  thirdComment: string;
  handleCancel: () => void;
  preview: boolean;
};

export const CommitmentPreview: FC<Props> = ({
  userId,
  topIdeaId,
  vote,
  qualification,
  firstComment,
  secondComment,
  thirdComment,
  handleCancel,
  preview,
}) => {
  const [isOpinionSent, sendOpinion] = useState(false);
  const comment1 = firstComment.trim();
  const comment2 = secondComment.trim();
  const comment3 = thirdComment.trim();
  const postOpinion = async () => {
    const comment = await PersonalityService.postPersonnalityComments(
      userId,
      topIdeaId,
      `${setEmptyStringToNull(comment1)}`,
      `${setEmptyStringToNull(comment2)}`,
      `${setEmptyStringToNull(comment3)}`,
      vote,
      qualification
    );
    if (comment) {
      sendOpinion(true);
    }
  };

  const opinionsPreviewTransMap = useMemo(
    () =>
      new Map([
        ['agree_', i18n.t('personality.opinions.preview.agree')],
        ['disagree_', i18n.t('personality.opinions.preview.disagree')],
        ['neutral_', i18n.t('personality.opinions.preview.neutral')],
        ['agree_likeIt', i18n.t('personality.opinions.preview.agree_likeIt')],
        ['agree_doable', i18n.t('personality.opinions.preview.agree_doable')],
        [
          'agree_platitudeAgree',
          i18n.t('personality.opinions.preview.agree_platitudeAgree'),
        ],
        [
          'disagree_noWay',
          i18n.t('personality.opinions.preview.disagree_noWay'),
        ],
        [
          'disagree_impossible',
          i18n.t('personality.opinions.preview.disagree_impossible'),
        ],
        [
          'disagree_platitudeDisagree',
          i18n.t('personality.opinions.preview.disagree_platitudeDisagree'),
        ],
        [
          'disagree_platitudeDisagree',
          i18n.t('personality.opinions.preview.disagree_platitudeDisagree'),
        ],
        [
          'neutral_noOpinion',
          i18n.t('personality.opinions.preview.neutral_noOpinion'),
        ],
        [
          'neutral_doNotUnderstand',
          i18n.t('personality.opinions.preview.neutral_doNotUnderstand'),
        ],
        [
          'neutral_doNotCare',
          i18n.t('personality.opinions.preview.neutral_doNotCare'),
        ],
      ]),
    [i18n.language]
  );

  return (
    <>
      <CommitmentPreviewSeparatorStyle />
      <CommitmentPreviewOpinionsWrapperStyle>
        <CommitmentPreviewOpinionsIconWrapperStyle
          transform={opinionsVoteStaticParams[vote].transform}
          color={opinionsVoteStaticParams[vote].color}
        >
          <SvgThumbsUp aria-hidden focusable="false" />
        </CommitmentPreviewOpinionsIconWrapperStyle>
        <CommitmentPreviewOpinionsParagraphStyle
          color={opinionsVoteStaticParams[vote].color}
          dangerouslySetInnerHTML={{
            __html:
              opinionsPreviewTransMap.get(`${vote}_${qualification}`) || '-',
          }}
        />
      </CommitmentPreviewOpinionsWrapperStyle>

      {comment1 && (
        <CommitmentPreviewBoxStyle>{comment1}</CommitmentPreviewBoxStyle>
      )}
      {comment2 && (
        <CommitmentPreviewBoxStyle>{comment2}</CommitmentPreviewBoxStyle>
      )}
      {comment3 && (
        <CommitmentPreviewBoxStyle>{comment3}</CommitmentPreviewBoxStyle>
      )}
      {preview && !isOpinionSent && (
        <CommitmentPreviewDislaimerStyle>
          <CommitmentPreviewParagraphStyle>
            {i18n.t('personality.opinions.form.disclaimer')}
          </CommitmentPreviewParagraphStyle>
          <CommitmentPreviewButtonsWrapperStyle>
            <CommitmentPreviewCancelStyle onClick={handleCancel}>
              {i18n.t('personality.opinions.form.preview_cancel')}
            </CommitmentPreviewCancelStyle>
            <CommitmentPreviewConfirmStyle onClick={postOpinion}>
              {i18n.t('personality.opinions.form.preview_confirm')}
            </CommitmentPreviewConfirmStyle>
          </CommitmentPreviewButtonsWrapperStyle>
        </CommitmentPreviewDislaimerStyle>
      )}
    </>
  );
};
