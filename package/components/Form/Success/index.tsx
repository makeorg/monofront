import React, { useEffect, useRef, FC } from 'react';
import i18n from 'i18next';
import { SvgCheck } from '@make.org/ui/Svg/elements';
import {
  FormSuccessMessageStyle,
  FormSuccessSvgStyle,
} from '@make.org/ui/elements/FormElements';

export const FormSuccessMessage: FC = () => {
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.focus();
    }
  }, [messageRef]);

  return (
    <FormSuccessMessageStyle ref={messageRef} tabIndex={0}>
      <SvgCheck style={FormSuccessSvgStyle} />
      {i18n.t('common.form.messages.submit_success')}
    </FormSuccessMessageStyle>
  );
};
