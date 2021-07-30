import React, { FC } from 'react';
import i18n from 'i18next';
import { TextArea } from '@make.org/components/Form/TextArea';
import { PERSONALITY_OPINION_FORMNAME } from '@make.org/utils/constants/form';
import { SubmitButton } from '@make.org/components/Form/SubmitButton';
import {
  OpinionFormStyle,
  OpinionFormTitleStyle,
  OpinionAreaWrapperStyle,
  OpinionSubmitWrapperStyle,
} from './style';

type Props = {
  firstComment: string;
  secondComment: string;
  thirdComment: string;
  setFirstComment: (value: string) => void;
  setSecondComment: (value: string) => void;
  setThirdComment: (value: string) => void;
  handleSubmit: () => void;
};

export const CommitmentForm: FC<Props> = ({
  firstComment,
  secondComment,
  thirdComment,
  setFirstComment,
  setSecondComment,
  setThirdComment,
  handleSubmit,
}) => {
  const TEXTAREA_MIN_LENGTH = 2;
  const TEXTAREA_MAX_LENGTH = 280;
  const canSubmit =
    firstComment.length > TEXTAREA_MIN_LENGTH ||
    secondComment.length > TEXTAREA_MIN_LENGTH ||
    thirdComment.length > TEXTAREA_MIN_LENGTH;
  return (
    <OpinionFormStyle id={PERSONALITY_OPINION_FORMNAME} onSubmit={handleSubmit}>
      <OpinionFormTitleStyle>
        {i18n.t('personality.opinions.form.title')}
      </OpinionFormTitleStyle>
      <OpinionAreaWrapperStyle>
        <TextArea
          name="firstComment"
          label={i18n.t('personality.opinions.form.label')}
          value={firstComment}
          minLength={TEXTAREA_MIN_LENGTH}
          maxLength={TEXTAREA_MAX_LENGTH}
          handleChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFirstComment(event.target.value)
          }
        />
      </OpinionAreaWrapperStyle>
      <OpinionAreaWrapperStyle>
        <TextArea
          name="secondComment"
          label={i18n.t('personality.opinions.form.label')}
          value={secondComment}
          minLength={TEXTAREA_MIN_LENGTH}
          maxLength={TEXTAREA_MAX_LENGTH}
          handleChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setSecondComment(event.target.value)
          }
        />
      </OpinionAreaWrapperStyle>
      <OpinionAreaWrapperStyle>
        <TextArea
          name="thirdComment"
          label={i18n.t('personality.opinions.form.label')}
          value={thirdComment}
          minLength={TEXTAREA_MIN_LENGTH}
          maxLength={TEXTAREA_MAX_LENGTH}
          handleChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
            setThirdComment(event.target.value)
          }
        />
      </OpinionAreaWrapperStyle>
      <OpinionSubmitWrapperStyle>
        <SubmitButton
          disabled={!canSubmit}
          formName={PERSONALITY_OPINION_FORMNAME}
          label={i18n.t('personality.opinions.form.validate')}
        />
      </OpinionSubmitWrapperStyle>
    </OpinionFormStyle>
  );
};
