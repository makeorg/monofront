import React, { FC, useState } from 'react';
import i18n from 'i18next';
import { UserService } from '@make.org/utils/services/User';
import { SubmitButton } from '@make.org/components/Form/SubmitButton';
import { PROFILE_UPDATE_FORMNAME } from '@make.org/utils/constants/form';
import { TileWithTitle } from '@make.org/ui/components/TileWithTitle';
import { SubmitSaveIcon } from '@make.org/utils/constants/icons';
import { UserType, ErrorObjectType, OrganisationProfileType, UserProfileType } from '@make.org/types';

import { getUser } from '@make.org/store/actions/authentication';
import { FormErrors } from '@make.org/components/Form/Errors';
import {
  FormRequirementsStyle,
  FormLeftAlignStyle,
} from '@make.org/components/Form/Styled/Content';
import { throttle } from '@make.org/utils/helpers/throttle';
import { FormSuccessMessage } from '@make.org/components/Form/Success';
import {
  TYPE_PERSONALITY,
  TYPE_ORGANISATION,
  TYPE_USER,
} from '@make.org/utils/constants/user';
import { getAgeFromDateOfBirth } from '@make.org/utils/helpers/date';
import { OrganisationService } from '@make.org/utils/services/Organisation';
import { PersonalityService } from '@make.org/utils/services/Personality';
import { LegalConsent } from '@make.org/components/Auth/Register/LegalConsent';
import { CenterColumnStyle } from '@make.org/ui/elements/FlexElements';
import { OrganisationForm } from './Organisation';
import { PersonalityForm } from './Personality';
import { UserForm } from './User';
import { useAppContext } from '@make.org/store'

type Props = {
  /** User */
  user: UserType;
};

export const UpdateInformations: FC<Props> = ({ user }) => {
  const {dispatch} = useAppContext();

  let updateProfile: (
    organisationId: string,
    profile: OrganisationProfileType | UserProfileType,
    success: () => void,
    handleErrors: (errors: ErrorObjectType[]) => void
  ) => Promise<null | void>;
  switch (user.userType) {
    case TYPE_ORGANISATION:
      updateProfile = OrganisationService.update;
      break;
    case TYPE_PERSONALITY:
      updateProfile = PersonalityService.update;
      break;
    case TYPE_USER:
      updateProfile = UserService.update;
      break;
    default:
      throw new Error(`Unexpected user type "${user.userType}"`);
  }

  const [profile, setProfileValues] = useState<UserProfileType | OrganisationProfileType>({
    ...user.profile,
    legalMinorConsent: false,
    legalAdvisorApproval: false,
  });
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [errors, setErrors] = useState<ErrorObjectType[]>([]);
  const [needLegalConsent, displayLegalConsent] = useState<boolean>(false);
  const userIsAChild =
    user.userType === TYPE_USER &&
    getAgeFromDateOfBirth("dateOfBirth" in profile ? profile.dateOfBirth : "") < 15;

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
      dispatch(getUser());
    };
    const handleErrors = (serviceErrors: ErrorObjectType[]) => {
      setIsSubmitSuccessful(false);
      setErrors(serviceErrors);
    };

    displayLegalConsent(false);

    const { userId } = user;
    await updateProfile(userId, profile, success, handleErrors);
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
          handleLegalField={handleChange}
          handleSubmit={throttle(handleSubmit)}
          toggleLegalConsent={toggleLegalConsent}
        />
      </CenterColumnStyle>
      <FormLeftAlignStyle
        id={PROFILE_UPDATE_FORMNAME}
        name={PROFILE_UPDATE_FORMNAME}
        onSubmit={userIsAChild ? toggleLegalConsent : throttle(handleSubmit)}
        className={needLegalConsent && 'hidden'}
      >
        <FormRequirementsStyle>
          {i18n.t('common.form.requirements')}
        </FormRequirementsStyle>
        <FormErrors errors={errors} />
        {user.userType === TYPE_ORGANISATION && (
          <OrganisationForm
            profile={user.profile}
            handleChange={handleChange}
            errors={errors}
          />
        )}
        {user.userType === TYPE_PERSONALITY && (
          <PersonalityForm
            profile={user.profile}
            handleChange={handleChange}
            errors={errors}
          />
        )}
        {user.userType === TYPE_USER && (
          <UserForm
            profile={user.profile}
            handleChange={handleChange}
            errors={errors}
          />
        )}
        <SubmitButton
          disabled={!canSubmit}
          formName={PROFILE_UPDATE_FORMNAME}
          icon={SubmitSaveIcon}
          label={i18n.t('profile.common.submit_label')}
        />
        {isSubmitSuccessful && <FormSuccessMessage />}
      </FormLeftAlignStyle>
    </TileWithTitle>
  );
};
