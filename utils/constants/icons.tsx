import React from 'react';
import {
  EmailIconStyle,
  ThumbsUpIconStyle,
  PencilIconStyle,
  LockIconStyle,
  UserIconStyle,
  ChildIconStyle,
  MapMarkerIconStyle,
  SuitcaseIconStyle,
  PaperPlaneIconStyle,
  SaveFileIconStyle,
  LinkIconStyle,
} from '@make.org/ui/elements/Buttons/style';

/** Form Icons */
export const EmailFieldIcon = <EmailIconStyle aria-hidden focusable="false" />;
export const PasswordFieldIcon = (
  <LockIconStyle aria-hidden focusable="false" />
);
export const AgeFieldIcon = <ChildIconStyle aria-hidden focusable="false" />;
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
