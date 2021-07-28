import React from 'react';
import { type PartnerType } from 'Shared/types/question';
import {
  PartnersListStyle,
  AvatarWrapperStyle,
} from 'Client/features/consultation/Styled/Partners';
import { Tooltip } from 'Client/ui/Tooltip';
import { FOUNDER_PARTNER } from 'Shared/constants/partner';
import { PartnerTooltip } from './Tooltip';
import { PartnerAvatar } from './Avatar';

type TooltipProps = {
  partner: PartnerType,
};
const PartnerAvatarWithTooltip = ({ partner }: TooltipProps) => {
  const content = (
    <PartnerTooltip
      partnerName={partner.name}
      isFounder={partner.partnerKind === FOUNDER_PARTNER}
    />
  );

  return (
    <Tooltip content={content} direction="top">
      <PartnerAvatar partner={partner} />
    </Tooltip>
  );
};

type Props = {
  partners: PartnerType[],
};

export const orderByWeight = (partner1, partner2) =>
  partner2.weight - partner1.weight;

export const PartnersList = ({ partners }: Props) => (
  <PartnersListStyle>
    {partners.sort(orderByWeight).map(partner => (
      <AvatarWrapperStyle key={partner.name}>
        <PartnerAvatarWithTooltip
          key={`avatar_with_tooltip_${partner.name}`}
          partner={partner}
        />
      </AvatarWrapperStyle>
    ))}
  </PartnersListStyle>
);
