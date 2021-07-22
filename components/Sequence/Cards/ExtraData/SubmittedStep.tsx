import { setTitleByType } from '@make.org/utils/helpers/demographics';
import { RedButtonStyle } from '@make.org/ui/elements/ButtonsElements';
import React, { useEffect } from 'react';
import i18n from 'i18next';
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
        data-cy-button="demographic-continue-vote"
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
