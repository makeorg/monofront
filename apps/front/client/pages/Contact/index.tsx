import { MetaTags } from '@make.org/components/MetaTags';
import { useAppContext } from '@make.org/store';
import React, { FC, useState } from 'react';
import i18n from 'i18next';
import { FORM } from '@make.org/types/enums';
import { ExpressService } from '@make.org/utils/services/Express';
import {
  ActiveButtonStyle,
  LinkAsRedButtonStyle,
} from '@make.org/ui/elements/ButtonsElements';
import { getHomeLink } from '@make.org/utils/helpers/url';
import { FormLeftAlignStyle } from '@make.org/ui/elements/FormElements';
import { getContactPageSubjectTransMap } from '../../helpers/translationsMap';
import {
  ContactPageWrapperStyle,
  ContactPageTitleContainerStyle,
  MainTitleStyle,
  SubTitleStyle,
  ContactPageLabelContainerStyle,
  ContactPageCheckboxLabelStyle,
  ContactPageFormContentStyle,
  ContactPageTextStyle,
  ContactPageSubmittedStyle,
  ContactPageErrorStyle,
} from './style';

type TypeContactFormValues = {
  from: string;
  name: string;
  subject: string;
  message: string;
};

const Contact: FC = () => {
  const { state } = useAppContext();
  const { country } = state.appConfig;
  const defaultFormValues = {
    from: '',
    name: '',
    subject: '',
    message: '',
  };
  const [formValues, setFormValues] =
    useState<TypeContactFormValues>(defaultFormValues);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitError, setSubmittedError] = useState<boolean>(false);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { id, value } = event.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
    setCanSubmit(true);
    setSubmittedError(false);
  };

  const handleSubmit: React.FormEventHandler<
    HTMLButtonElement | HTMLFormElement
  > = async (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setSubmittedError(false);
    setCanSubmit(false);

    const result = await ExpressService.sendContactMail(
      formValues.message,
      formValues.name,
      formValues.subject,
      formValues.from
    );

    if (!result) {
      return setSubmittedError(true);
    }

    return setSubmitted(true);
  };

  return (
    <>
      <MetaTags
        title={i18n.t('meta.contact.title')}
        description={i18n.t('meta.contact.description')}
      />
      <ContactPageWrapperStyle>
        {!submitted ? (
          <>
            <ContactPageTitleContainerStyle>
              <MainTitleStyle>{i18n.t('contact.contactUs')}</MainTitleStyle>
              <ContactPageTextStyle>
                {i18n.t('contact.paragraph')}
              </ContactPageTextStyle>
              <ContactPageTextStyle>
                {i18n.t('contact.delete')}{' '}
              </ContactPageTextStyle>
            </ContactPageTitleContainerStyle>

            <FormLeftAlignStyle
              id={FORM.CONTACT_FORMNAME}
              onSubmit={handleSubmit}
            >
              <ContactPageFormContentStyle>
                <ContactPageTitleContainerStyle>
                  <SubTitleStyle as="h3">
                    {i18n.t('contact.help')}
                  </SubTitleStyle>
                  <ContactPageTextStyle>
                    {i18n.t('contact.mandatory')}
                  </ContactPageTextStyle>
                </ContactPageTitleContainerStyle>
                <ContactPageLabelContainerStyle htmlFor="from">
                  {i18n.t('contact.mail')}
                  <input
                    type="email"
                    name="from"
                    id="from"
                    value={formValues.from}
                    onChange={handleChange}
                    placeholder={i18n.t('contact.mail_placeholder')}
                    required
                  />
                </ContactPageLabelContainerStyle>
                <ContactPageLabelContainerStyle htmlFor="name">
                  {i18n.t('contact.name')}
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formValues.name}
                    onChange={handleChange}
                    placeholder={i18n.t('contact.name_placeholder')}
                    required
                  />
                </ContactPageLabelContainerStyle>
                <ContactPageLabelContainerStyle htmlFor="subject">
                  {i18n.t('contact.request_type')}
                  <select
                    name="subject"
                    id="subject"
                    value={formValues.subject}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      {i18n.t('contact.request_placeholder')}
                    </option>
                    {Array.from(getContactPageSubjectTransMap()).map(
                      ([value, name]) => (
                        <option value={value} title={name} key={value}>
                          {name}
                        </option>
                      )
                    )}
                  </select>
                </ContactPageLabelContainerStyle>
                <ContactPageLabelContainerStyle htmlFor="message">
                  {i18n.t('contact.request_explain')}
                  <textarea
                    name="message"
                    id="message"
                    value={formValues.message}
                    onChange={handleChange}
                    placeholder={i18n.t('contact.request_explain_placeholder')}
                    required
                  />
                </ContactPageLabelContainerStyle>
                <ContactPageCheckboxLabelStyle htmlFor="consent">
                  {i18n.t('contact.authorize')}
                  <input type="checkbox" name="consent" id="consent" required />
                </ContactPageCheckboxLabelStyle>
                {submitError && (
                  <ContactPageErrorStyle>
                    {i18n.t('contact.error')}
                  </ContactPageErrorStyle>
                )}
                <ActiveButtonStyle
                  form={FORM.CONTACT_FORMNAME}
                  disabled={!canSubmit}
                  type="submit"
                >
                  {i18n.t('contact.send')}
                </ActiveButtonStyle>
              </ContactPageFormContentStyle>
            </FormLeftAlignStyle>
          </>
        ) : (
          <ContactPageSubmittedStyle>
            <MainTitleStyle>{i18n.t('contact.heard')}</MainTitleStyle>
            <ContactPageTextStyle>
              {i18n.t('contact.handle')}
            </ContactPageTextStyle>
            <ContactPageTextStyle>{i18n.t('contact.if')}</ContactPageTextStyle>
            <LinkAsRedButtonStyle type="button" to={getHomeLink(country)}>
              {i18n.t('contact.back')}
            </LinkAsRedButtonStyle>
          </ContactPageSubmittedStyle>
        )}
      </ContactPageWrapperStyle>
    </>
  );
};

// default export needed for loadable component
export default Contact; // eslint-disable-line import/no-default-export
