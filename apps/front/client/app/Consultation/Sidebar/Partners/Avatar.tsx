import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { PartnerType } from '@make.org/types';
import { Link } from 'react-router-dom';
import { PartnerAvatarStyle } from '@make.org/ui/components/Avatar/style';
import i18n from 'i18next';
import { getOrganisationProfileLink } from '@make.org/utils/helpers/url';
import { Image } from '@make.org/ui/components/Image';

const linkProps = (partner: PartnerType, country: string) => {
  const defaultProps = {
    as: 'span',
    href: undefined,
    target: undefined,
    rel: undefined,
    to: undefined,
  };

  if (partner.link) {
    return {
      ...defaultProps,
      as: 'a',
      href: partner.link,
      target: '_blank',
      rel: 'noopener',
    };
  }

  if (partner.organisation) {
    return {
      ...defaultProps,
      as: Link,
      to: getOrganisationProfileLink(country, partner.organisation.slug),
    };
  }

  return defaultProps;
};

const altProps = (partner: PartnerType) => {
  if (partner.link) {
    return i18n.t('consultation.partners.profile_link_new_window', {
      name: partner.name,
    });
  }

  if (partner.organisation) {
    return i18n.t('consultation.partners.profile_link', {
      name: partner.name,
    });
  }

  return partner.name;
};

type Props = {
  partner: PartnerType;
};

export const PartnerAvatar: FC<Props> = ({ partner }) => {
  const { state } = useAppContext();
  const { country } = state.appConfig;

  const { as, to, href, target, rel } = linkProps(partner, country);

  return (
    <PartnerAvatarStyle as={as} to={to} href={href} target={target} rel={rel}>
      {partner.logo && (
        <Image src={partner.logo} alt={altProps(partner)} height={65} />
      )}
    </PartnerAvatarStyle>
  );
};
