import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { NotificationMessage } from '../Message';
import { TipWrapperStyle, TriangleDownStyle } from './style';
import { NotificationIcon } from '../Icon';

export const Tip: FC = () => {
  const { state } = useAppContext();
  const { tip } = state.notifications;
  const { contentId = '', level = '' } = tip;

  if (!contentId) return null;

  return (
    <>
      <TipWrapperStyle>
        <NotificationIcon level={level} context="tip" />
        <NotificationMessage name={contentId} />
      </TipWrapperStyle>
      <TriangleDownStyle />
    </>
  );
};
