import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import i18n from 'i18next';
import { LinkAsGreyButton } from '@make.org/ui/elements/LinkElements';
import {
  PencilIconStyle,
  AngleArrowLeftIconStyle,
} from '@make.org/ui/elements/SvgElements';

export const EditProfileLink: FC<{ link: string }> = ({ link }) => (
  <LinkAsGreyButton to={link} as={Link}>
    <PencilIconStyle aria-hidden focusable="false" />
    {i18n.t('profile.informations_update.title')}
  </LinkAsGreyButton>
);

export const GoToProfileLink: FC<{ link: string }> = ({ link }) => (
  <LinkAsGreyButton to={link} as={Link}>
    <AngleArrowLeftIconStyle aria-hidden focusable="false" />
    {i18n.t('profile.informations_update.link_to_profile')}
  </LinkAsGreyButton>
);
