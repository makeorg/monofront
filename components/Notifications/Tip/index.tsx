import React, { FC } from 'react';
import { useAppContext } from '@make.org/store';
import { NotificationMessage } from '../Message';
import { TipWrapperStyle, TriangleDownStyle } from './style';

export const Tip: FC = () => {
  const { state } = useAppContext();
  const { tip } = state.notifications;
  const { contentId = '' } = tip;

  if (!contentId) return null;

  return (
    <>
      <TipWrapperStyle>
        <NotificationMessage name={contentId} />
      </TipWrapperStyle>
      <TriangleDownStyle />
    </>
  );
};
