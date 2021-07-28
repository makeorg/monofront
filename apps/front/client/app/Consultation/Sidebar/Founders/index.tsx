// @flow
import React from 'react';
import { i18n } from 'Shared/i18n';
import { type PartnerType } from 'Shared/types/question';
import { FOUNDER_PARTNER, MEDIA_PARTNER } from 'Shared/constants/partner';
import { SidebarSeparatorStyle } from 'Client/ui/Elements/TileWithTitle/style';
import { PartnersList } from '../Partners/List';
import { FoundersTitleStyle } from './style';

type Props = {
  isGreatCause: boolean,
  founders: PartnerType[],
};

type PartnersTypeListProps = {
  isGreatCause: boolean,
  partners: PartnerType[],
};

const PartnersListByType = ({
  isGreatCause,
  partners,
}: PartnersTypeListProps) => {
  const founders = partners.filter(
    partner => partner.partnerKind === FOUNDER_PARTNER
  );
  const medias = partners.filter(
    partner => partner.partnerKind === MEDIA_PARTNER
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

export const Founders = ({ founders, isGreatCause }: Props) => {
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
