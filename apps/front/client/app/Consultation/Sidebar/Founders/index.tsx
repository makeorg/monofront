import React, { FC } from 'react';
import i18n from 'i18next';
import { PartnerType } from '@make.org/types';
import { PARTNER } from '@make.org/types/enums';
import { SidebarSeparatorStyle } from '@make.org/ui/elements/SeparatorsElements';
import { PartnersList } from '../Partners/List';
import { FoundersTitleStyle } from './style';

type Props = {
  isGreatCause: boolean;
  founders: PartnerType[];
};

type PartnersTypeListProps = {
  isGreatCause: boolean;
  partners: PartnerType[];
};

const PartnersListByType: FC<PartnersTypeListProps> = ({
  isGreatCause,
  partners,
}) => {
  const founders = partners.filter(
    partner => partner.partnerKind === PARTNER.FOUNDER_PARTNER
  );
  const medias = partners.filter(
    partner => partner.partnerKind === PARTNER.MEDIA_PARTNER
  );

  return isGreatCause ? (
    <>
      <FoundersTitleStyle>
        {i18n.t('consultation.partners.initWith')}
      </FoundersTitleStyle>
      <PartnersList partners={partners} />
    </>
  ) : (
    <>
      {founders.length > 0 && (
        <>
          <FoundersTitleStyle>
            {i18n.t('consultation.partners.by')}
          </FoundersTitleStyle>
          <PartnersList partners={founders} />
        </>
      )}
      {medias.length > 0 && (
        <>
          <FoundersTitleStyle>
            {i18n.t('consultation.partners.with')}
          </FoundersTitleStyle>
          <PartnersList partners={medias} />
        </>
      )}
    </>
  );
};

export const Founders: FC<Props> = ({ founders, isGreatCause }) => {
  if (!founders || founders.length === 0) {
    return null;
  }
  return (
    <>
      <SidebarSeparatorStyle />
      <PartnersListByType isGreatCause={isGreatCause} partners={founders} />
    </>
  );
};
