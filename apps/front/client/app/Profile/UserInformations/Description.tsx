import React, { FC, useEffect, useState } from 'react';
import i18n from 'i18next';
import {
  ProfileDescriptionStyle,
  ProfileCollapseWrapperStyle,
  ProfileCollapseSeparatorStyle,
  ProfileCollapseButtonStyle,
  ProfileSeparatorStyle,
} from '@make.org/ui/elements/ProfileElements';
import { useAppContext } from '@make.org/store';
import { matchMobileDevice } from '@make.org/utils/helpers/styled';

type Props = {
  description: string;
};

export const UserDescription: FC<Props> = ({ description }) => {
  const { state } = useAppContext();
  const [isCollapsed, setCollapse] = useState(false);
  const { device } = state.appConfig;
  const isMobile = matchMobileDevice(device);
  const renderCollapseTrigger = description.length > 280 && isMobile;

  useEffect(() => {
    if (isMobile) {
      setCollapse(true);
    }
  }, [isMobile]);

  return (
    <>
      <ProfileDescriptionStyle isCollapsed={isCollapsed}>
        {description}
      </ProfileDescriptionStyle>
      {renderCollapseTrigger ? (
        <ProfileCollapseWrapperStyle>
          <ProfileCollapseSeparatorStyle isCollapsed={isCollapsed} />
          <ProfileCollapseButtonStyle onClick={() => setCollapse(!isCollapsed)}>
            {isCollapsed
              ? i18n.t('profile.informations_update.more')
              : i18n.t('profile.informations_update.less')}
          </ProfileCollapseButtonStyle>
        </ProfileCollapseWrapperStyle>
      ) : (
        <ProfileSeparatorStyle />
      )}
    </>
  );
};
