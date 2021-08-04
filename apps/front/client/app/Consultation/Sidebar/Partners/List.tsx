import React, { FC } from 'react';
import { PartnerType } from '@make.org/types';
import { Tooltip } from '@make.org/ui/components/Tooltip';
import { PARTNER } from '@make.org/types/enums';
import { PartnersListStyle, AvatarWrapperStyle } from '../../Styled/Partners';
import { PartnerTooltip } from './Tooltip';
import { PartnerAvatar } from './Avatar';

type TooltipProps = {
  partner: PartnerType;
};
const PartnerAvatarWithTooltip: FC<TooltipProps> = ({ partner }) => {
  const content = (
    <PartnerTooltip
      partnerName={partner.name}
      isFounder={partner.partnerKind === PARTNER.FOUNDER_PARTNER}
    />
  );

  return (
    <Tooltip content={content} direction="top">
      <PartnerAvatar partner={partner} />
    </Tooltip>
  );
};

type Props = {
  partners: PartnerType[];
};

export const orderByWeight = (
  partner1: PartnerType,
  partner2: PartnerType
): number => partner2.weight - partner1.weight;

export const PartnersList: FC<Props> = ({ partners }) => (
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
