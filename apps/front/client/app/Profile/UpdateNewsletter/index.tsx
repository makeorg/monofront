import React, { FC, useState } from 'react';
import i18n from 'i18next';
import { FORM, USER } from '@make.org/types/enums';
import {
  ErrorObjectType,
  OrganisationProfileType,
  PersonalityProfileType,
  UserProfileType,
} from '@make.org/types';
import { SubmitButton } from '@make.org/components/Form/SubmitButton';
import { SubmitSaveIcon } from '@make.org/utils/constants/icons';
import { CheckBox } from '@make.org/components/Form/CheckBox';
import { UserService } from '@make.org/utils/services/User';
import { OrganisationService } from '@make.org/utils/services/Organisation';
import { TileWithTitle } from '@make.org/ui/components/TileWithTitle';
import { FormErrors } from '@make.org/components/Form/Errors';
import { FormSuccessMessage } from '@make.org/components/Form/Success';
import { getUser } from '@make.org/store/actions/authentication';
import { PersonalityService } from '@make.org/utils/services/Personality';
import { useAppContext } from '@make.org/store';

type Props = {
  /** User id */
  userId: string;
  /** User type */
  userType: string;
  /** User Profile */
  profile: UserProfileType & OrganisationProfileType & PersonalityProfileType;
};

export const UpdateNewsletter: FC<Props> = ({ userId, userType, profile }) => {
  const { dispatch, state } = useAppContext();
  // to remember : optInNewsletter has been swapped for an optOut boolean (might be changed later)
  const [optInNewsletter, setOptInNewsletter] = useState<boolean>(
    profile.optInNewsletter
  );
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorObjectType[]>([]);

  const handleCheck = (event: React.SyntheticEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setOptInNewsletter(!optInNewsletter);

    setCanSubmit(true);
    setIsSubmitSuccessful(false);
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async event => {
    event.preventDefault();
    const success = () => {
      setIsSubmitSuccessful(true);
      setCanSubmit(false);
      getUser(dispatch, state.modal.isOpen);
    };
    const handleErrors = (serviceErrors: ErrorObjectType[]) => {
      setErrors(serviceErrors);
      setIsSubmitSuccessful(false);
    };
    const newProfile = {
      ...profile,
      optInNewsletter,
    };
    switch (userType) {
      case USER.TYPE_ORGANISATION:
        await OrganisationService.update(
          userId,
          newProfile,
          () => success(),
          serviceErrors => handleErrors(serviceErrors)
        );
        break;
      case USER.TYPE_PERSONALITY:
        await PersonalityService.update(
          userId,
          newProfile,
          () => success(),
          serviceErrors => handleErrors(serviceErrors)
        );
        break;
      default:
        await UserService.update(
          userId,
          {
            ...profile,
            optInNewsletter,
            legalAdvisorApproval: true,
            legalMinorConsent: true,
          },
          () => success(),
          serviceErrors => handleErrors(serviceErrors)
        );
        break;
    }
  };

  return (
    <TileWithTitle title={i18n.t('profile.newsletter_update.title')}>
      <form id={FORM.NEWSLETTER_UPDATE_FORMNAME} onSubmit={handleSubmit}>
        <FormErrors errors={errors} />
        <CheckBox
          name="optInNewsletter"
          value="newsletter"
          handleCheck={handleCheck}
          label={i18n.t('profile.newsletter_update.optin_label')}
          isChecked={!optInNewsletter}
        />
        <SubmitButton
          disabled={!canSubmit}
          formName={FORM.NEWSLETTER_UPDATE_FORMNAME}
          icon={SubmitSaveIcon}
          label={i18n.t('profile.common.submit_label')}
        />
        {isSubmitSuccessful && <FormSuccessMessage />}
      </form>
    </TileWithTitle>
  );
};
