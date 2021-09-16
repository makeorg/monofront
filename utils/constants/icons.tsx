import React from 'react';
import {
  EmailIconStyle,
  ThumbsUpIconStyle,
  PencilIconStyle,
  LockIconStyle,
  UserIconStyle,
  BirthdayIconStyle,
  MapMarkerIconStyle,
  SuitcaseIconStyle,
  PaperPlaneIconStyle,
  SaveFileIconStyle,
  LinkIconStyle,
} from '@make.org/ui/elements/SvgElements';

/** Form Icons */
export const EmailFieldIcon = <EmailIconStyle aria-hidden focusable="false" />;
export const PasswordFieldIcon = (
  <LockIconStyle aria-hidden focusable="false" />
);
export const AgeFieldIcon = <BirthdayIconStyle aria-hidden focusable="false" />;
export const NameFiledIcon = <UserIconStyle aria-hidden focusable="false" />;
export const PostalCodeFieldIcon = (
  <MapMarkerIconStyle aria-hidden focusable="false" />
);
export const WebsiteLinkFieldIcon = (
  <LinkIconStyle aria-hidden focusable="false" />
);
export const JobFieldIcon = <SuitcaseIconStyle aria-hidden focusable="false" />;
export const DescriptionFieldIcon = (
  <PencilIconStyle aria-hidden focusable="false" />
);
export const SubmitThumbsUpIcon = (
  <ThumbsUpIconStyle aria-hidden focusable="false" />
);
export const SubmitPaperPlaneIcon = (
  <PaperPlaneIconStyle aria-hidden focusable="false" />
);
export const SubmitSaveIcon = (
  <SaveFileIconStyle aria-hidden focusable="false" />
);
