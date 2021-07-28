// @flow
import React from 'react';
import { useSelector } from 'react-redux';
import { type PartnerType } from 'Shared/types/question';
import { Link } from 'react-router-dom';
import { PartnerAvatarStyle } from 'Client/ui/Avatar/style';
import { i18n } from 'Shared/i18n';
import { getOrganisationProfileLink } from 'Shared/helpers/url';
import { Image } from 'Client/ui/Image';

const linkProps = (partner, country) => {
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

const altProps = partner => {
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
  partner: PartnerType,
};

export const PartnerAvatar = ({ partner }: Props) => {
  const country: string = useSelector(state => state.appConfig.country);

  const { as, to, href, target, rel } = linkProps(partner, country);

  return (
    <PartnerAvatarStyle as={as} to={to} href={href} target={target} rel={rel}>
      {partner.logo && (
        <Image src={partner.logo} alt={altProps(partner)} height={65} />
      )}
    </PartnerAvatarStyle>
  );
};
