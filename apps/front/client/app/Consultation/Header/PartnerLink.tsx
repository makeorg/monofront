import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { TRACKING, USER } from '@make.org/types/enums';

import { orderPartnersByWeight } from '@make.org/utils/helpers/question';
import {
  getOrganisationProfileLink,
  getPartnerAnchor,
} from '@make.org/utils/helpers/url';
import i18n from 'i18next';
import {
  trackClickLearnMore,
  trackClickPublicProfile,
} from '@make.org/utils/services/Tracking';
import { selectCurrentQuestion } from '@make.org/store/selectors/questions.selector';
import { PartnerType, QuestionType } from '@make.org/types';
import { NewWindowLink } from './Link';
import {
  HeaderListWrapperStyle,
  HeaderListLabelStyle,
  HeaderListStyle,
  HeaderListItemStyle,
  PartnerLinkStyle,
  PartnerStyle,
} from './style';

type Props = {
  partnersList: PartnerType[];
  title: string;
  seeMoreLink?: boolean;
  noMargin?: boolean;
};

export const PartnersList: FC<Props> = ({
  partnersList,
  title,
  seeMoreLink = false,
  noMargin = false,
}) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const question: QuestionType = selectCurrentQuestion(state);

  const displayMoreLink = seeMoreLink && partnersList.length > 2;

  return (
    <HeaderListWrapperStyle className={noMargin ? 'no-margin' : ''}>
      <HeaderListLabelStyle>
        {title}
        <> </>
      </HeaderListLabelStyle>
      <HeaderListStyle>
        {partnersList.sort(orderPartnersByWeight).map((partner, index) => (
          <HeaderListItemStyle key={partner.name}>
            {partner.organisation ? (
              <PartnerLinkStyle
                to={getOrganisationProfileLink(
                  country,
                  partner.organisation.slug
                )}
                onClick={() =>
                  trackClickPublicProfile(
                    USER.TYPE_ORGANISATION,
                    TRACKING.COMPONENT_PARAM_CONSULTATION_HEADER
                  )
                }
              >
                {partner.name}
              </PartnerLinkStyle>
            ) : (
              <PartnerStyle key={partner.name}>{partner.name}</PartnerStyle>
            )}
            {partnersList.length !== index + 1 && <>, </>}
          </HeaderListItemStyle>
        ))}
        {displayMoreLink && (
          <HeaderListItemStyle>
            <>, ... </>
            <NewWindowLink
              linkUrl={getPartnerAnchor(question.aboutUrl)}
              linkText={i18n.t('consultation.partners.commitment_link')}
              tracking={() =>
                trackClickLearnMore(
                  TRACKING.COMPONENT_PARAM_CONSULTATION_HEADER
                )
              }
            />
          </HeaderListItemStyle>
        )}
      </HeaderListStyle>
    </HeaderListWrapperStyle>
  );
};
