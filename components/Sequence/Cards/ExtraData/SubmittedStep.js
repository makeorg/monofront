// @flow
import { setTitleByType } from 'Client/helper/demographics';
import { RedButtonStyle } from 'Client/ui/Elements/Buttons/V2/style';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { i18n } from 'Shared/i18n';
import { incrementSequenceIndex } from 'Shared/store/actions/sequence';
import {
  trackClickVoteDemographics,
  trackDisplayDemographicsConfirmation,
} from 'Shared/services/Tracking';
import { SequenceIntroParagraphStyle, SequenceParagraphStyle } from '../style';

type Props = {
  type: string,
};

export const SubmittedDemographics = ({ type }: Props) => {
  const dispatch = useDispatch();

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
