import React, { FC } from 'react';
import {
  PersonalityProfileType,
  OrganisationProfileType,
  ErrorObjectType,
} from '@make.org/types';

import {
  DescriptionFieldIcon,
  WebsiteLinkFieldIcon,
} from '@make.org/utils/constants/icons';
import { getFieldError } from '@make.org/utils/helpers/form';
import { CustomPatternInput } from '@make.org/components/Form/CustomPatternInput';
import { TextArea } from '@make.org/components/Form/TextArea';
import i18n from 'i18next';

type CommonProfileFieldsProps = {
  profile: OrganisationProfileType | PersonalityProfileType;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  errors: ErrorObjectType[];
};

export const CommonProfileFields: FC<CommonProfileFieldsProps> = ({
  profile,
  onChange,
  errors,
}) => {
  const websiteError = getFieldError('website', errors);
  const { description, website } = profile;
  return (
    <>
      <TextArea
        name="description"
        icon={DescriptionFieldIcon}
        value={description}
        label={i18n.t('common.form.label.biography', { context: 'optional' })}
        maxLength={450}
        withCounter
        handleChange={onChange}
      />
      <CustomPatternInput
        type="url"
        name="website"
        icon={WebsiteLinkFieldIcon}
        value={website}
        label={i18n.t('common.form.label.website', {
          context: 'optional',
        })}
        error={websiteError}
        handleChange={onChange}
        pattern="^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.%]+$"
      />
    </>
  );
};
