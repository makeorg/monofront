import React, { FC, useState } from 'react';
import i18n from 'i18next';
import { UserService } from '@make.org/utils/services/User';
import { SubmitButton } from '@make.org/components/Form/SubmitButton';
import { FORM, USER } from '@make.org/types/enums';
import { TileWithTitle } from '@make.org/ui/components/TileWithTitle';
import { SubmitSaveIcon } from '@make.org/utils/constants/icons';
import {
  UserType,
  ErrorObjectType,
  PersonalityType,
  OrganisationType,
  CommonUsersProfileType,
} from '@make.org/types';

import { getUser } from '@make.org/store/actions/authentication';
import { FormErrors } from '@make.org/components/Form/Errors';
import {
  FormRequirementsStyle,
  FormLeftAlignStyle,
} from '@make.org/ui/elements/FormElements';
import { throttle } from '@make.org/utils/helpers/throttle';
import { FormSuccessMessage } from '@make.org/components/Form/Success';

import { getAgeFromDateOfBirth } from '@make.org/utils/helpers/date';
import { OrganisationService } from '@make.org/utils/services/Organisation';
import { PersonalityService } from '@make.org/utils/services/Personality';
import { LegalConsent } from '@make.org/components/Auth/Register/LegalConsent';
import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import { useAppContext } from '@make.org/store';
import { OrganisationForm } from './Organisation';
import { PersonalityForm } from './Personality';
import { UserForm } from './User';

type Props = {
  /** User */
  user: (UserType | PersonalityType | OrganisationType) & {
    profile: CommonUsersProfileType;
  };
};

export const UpdateInformations: FC<Props> = ({ user }) => {
  const { dispatch, state } = useAppContext();

  let updateProfile: (
    organisationId: string,
    profile: CommonUsersProfileType,
    success: () => void,
    handleErrors: (errors: ErrorObjectType[]) => void
  ) => Promise<null | void>;
  switch (user.userType) {
    case USER.TYPE_ORGANISATION:
      updateProfile = OrganisationService.update;
      break;
    case USER.TYPE_PERSONALITY:
      updateProfile = PersonalityService.update;
      break;
    case USER.TYPE_USER:
      updateProfile = UserService.update;
      break;
    default:
      throw new Error(`Unexpected user type "${user.userType}"`);
  }

  const [profile, setProfileValues] = useState<CommonUsersProfileType>({
    ...user.profile,
    legalMinorConsent: false,
    legalAdvisorApproval: false,
  });
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorObjectType[]>([]);
  const [needLegalConsent, displayLegalConsent] = useState<boolean>(false);
  const userIsAChild =
    user.userType === USER.TYPE_USER &&
    Number(
      getAgeFromDateOfBirth('dateOfBirth' in profile ? profile.dateOfBirth : '')
    ) < 15;

  const handleChange = (
    name: string,
    value: string | number | boolean | null
  ) => {
    setProfileValues({ ...profile, [name]: value });
    setCanSubmit(true);
    setIsSubmitSuccessful(false);
  };

  const handleSubmit = async (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    setCanSubmit(false);
    const success = () => {
      setIsSubmitSuccessful(true);
      setErrors([]);
      getUser(dispatch, state.modal.isOpen);
    };
    const handleErrors = (serviceErrors: ErrorObjectType[]) => {
      setErrors(serviceErrors);
      setIsSubmitSuccessful(false);
    };

    displayLegalConsent(false);

    const { userId } = user;
    await updateProfile(
      userId,
      profile,
      () => success(),
      serviceErrors => handleErrors(serviceErrors)
    );
  };

  const toggleLegalConsent = (event: React.ChangeEvent<any>) => {
    event.preventDefault();
    displayLegalConsent(!needLegalConsent);
  };

  return (
    <TileWithTitle title={i18n.t('profile.informations_update.title')}>
      <CenterColumnStyle>
        <LegalConsent
          needLegalConsent={needLegalConsent}
          handleCheckbox={handleChange}
          handleSubmit={throttle(handleSubmit)}
          toggleLegalConsent={toggleLegalConsent}
        />
      </CenterColumnStyle>
      <FormLeftAlignStyle
        id={FORM.PROFILE_UPDATE_FORMNAME}
        name={FORM.PROFILE_UPDATE_FORMNAME}
        onSubmit={userIsAChild ? toggleLegalConsent : throttle(handleSubmit)}
        className={needLegalConsent ? 'hidden' : ''}
      >
        <FormRequirementsStyle>
          {i18n.t('common.form.requirements')}
        </FormRequirementsStyle>
        <FormErrors errors={errors} />
        {user.userType === USER.TYPE_ORGANISATION && (
          <OrganisationForm
            profile={user.profile}
            handleChange={handleChange}
            errors={errors}
          />
        )}
        {user.userType === USER.TYPE_PERSONALITY && (
          <PersonalityForm
            profile={user.profile}
            handleChange={handleChange}
            errors={errors}
          />
        )}
        {user.userType === USER.TYPE_USER && (
          <UserForm
            profile={user.profile}
            handleChange={handleChange}
            errors={errors}
          />
        )}
        <SubmitButton
          disabled={!canSubmit}
          formName={FORM.PROFILE_UPDATE_FORMNAME}
          icon={SubmitSaveIcon}
          label={i18n.t('profile.common.submit_label')}
        />
        {isSubmitSuccessful && <FormSuccessMessage />}
      </FormLeftAlignStyle>
    </TileWithTitle>
  );
};
