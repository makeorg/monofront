import React, { useEffect, useState } from 'react';
import i18n from 'i18next';
import { getQualificationIndex } from '@make.org/utils/helpers/qualification';
import { QualificationType } from '@make.org/types';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';

import { QualificationButton } from './Button';
import { QualifyButtonWrapperStyle } from './style';

type Props = {
  /** Array with qualifications received from Api */
  qualifications: QualificationType[];
  /** Proposal's Id */
  proposalId: string;
  /** String containing the hash generate api side for security purpose */
  proposalKey: string;
  /** Voted key property */
  votedKey: string;
  /** Index of the card */
  index: number;
};

/**
 * Handles Qualification Business Logic
 */
export const Qualification: React.FC<Props> = ({
  qualifications,
  proposalId,
  proposalKey,
  votedKey,
  index,
}) => {
  const [userQualifications, setUserQualifications] = useState(qualifications);
  useEffect(() => {
    setUserQualifications(qualifications);
  }, [qualifications]);

  return (
    <>
      <ScreenReaderItemStyle as="p">
        {i18n.t('qualification.title')}
      </ScreenReaderItemStyle>
      <QualifyButtonWrapperStyle>
        {userQualifications.map(qualification => (
          <li
            key={getQualificationIndex(
              qualification.qualificationKey,
              proposalId
            )}
          >
            <QualificationButton
              qualification={qualification}
              votedKey={votedKey}
              proposalKey={proposalKey}
              proposalId={proposalId}
              index={index}
            />
          </li>
        ))}
      </QualifyButtonWrapperStyle>
    </>
  );
};
