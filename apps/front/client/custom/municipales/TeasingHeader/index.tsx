import React, { FC } from 'react';
import i18n from 'i18next';
import { modalShowRegister } from '@make.org/store/actions/modal';
import { RedHTMLLinkElementStyle } from '@make.org/ui/elements/LinkElements';
import { useAppContext } from '@make.org/store';
import {
  TeasingHeaderContainerStyle,
  TeasingHeaderWrapperStyle,
  TeasingHeaderCenterStyle,
  TeasingHeaderTextStyle,
  TeasingHeaderSubTextStyle,
} from './style';

export const TeasingHeader: FC = () => {
  const { dispatch } = useAppContext();
  return (
    <TeasingHeaderContainerStyle>
      <TeasingHeaderWrapperStyle>
        <TeasingHeaderCenterStyle>
          <TeasingHeaderTextStyle>
            {i18n.t('consultation.municipal.header.candidates_answers')}
          </TeasingHeaderTextStyle>
          <TeasingHeaderSubTextStyle
            onClick={() => dispatch(modalShowRegister())}
            dangerouslySetInnerHTML={{
              __html: i18n.t(
                'consultation.municipal.header.candidates_subscribe',
                {
                  subscribe: `<a>$t(consultation.municipal.header.subscribe)</a>`,
                }
              ),
            }}
          />
        </TeasingHeaderCenterStyle>
        <TeasingHeaderCenterStyle>
          <TeasingHeaderTextStyle>
            {i18n.t('consultation.municipal.header.candidates')}
          </TeasingHeaderTextStyle>
          <TeasingHeaderSubTextStyle>
            <RedHTMLLinkElementStyle href="mailto:candidats-municipales@make.org">
              {i18n.t('consultation.municipal.header.contact_us')}
            </RedHTMLLinkElementStyle>
          </TeasingHeaderSubTextStyle>
        </TeasingHeaderCenterStyle>
      </TeasingHeaderWrapperStyle>
    </TeasingHeaderContainerStyle>
  );
};
