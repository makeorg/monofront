import { setTitleByType } from '@make.org/utils/helpers/demographics';
import { RedButtonStyle } from '@make.org/ui/elements/Buttons/style';
import React, { useEffect } from 'react';
import { i18n } from '@make.org/utils/i18n';
import { incrementSequenceIndex } from '@make.org/store/actions/sequence';
import {
  trackClickVoteDemographics,
  trackDisplayDemographicsConfirmation,
} from '@make.org/utils/services/Tracking';
import { useAppContext } from '@make.org/store';
import { SequenceIntroParagraphStyle, SequenceParagraphStyle } from '../style';

type Props = {
  type: string;
};

export const SubmittedDemographics: React.FC<Props> = ({ type }) => {
  const { dispatch } = useAppContext();

  useEffect(() => {
    trackDisplayDemographicsConfirmation(type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SequenceIntroParagraphStyle className="with-margin-bottom">
        {setTitleByType(type)}
      </SequenceIntroParagraphStyle>
      <SequenceParagraphStyle>
        {i18n.t('demographics_card.submitted_thanks')}
      </SequenceParagraphStyle>
      <SequenceParagraphStyle>
        {i18n.t('demographics_card.submitted_disclaimer')}
      </SequenceParagraphStyle>
      <RedButtonStyle
        onClick={() => {
          dispatch(incrementSequenceIndex());
          trackClickVoteDemographics(type);
        }}
      >
        {i18n.t('proposal_submit.success.button')}
      </RedButtonStyle>
    </>
  );
};
