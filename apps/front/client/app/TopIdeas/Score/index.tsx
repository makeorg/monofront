import React, { ReactNode, FC } from 'react';
import {
  ScoringContentStyle,
  ScoringTextContainerStyle,
  ScoringTextStyle,
  ScoringPercentageStyle,
  ScoringPercentageTextStyle,
} from './style';

type Props = {
  icon: ReactNode;
  percentage: number;
  text: string;
};

export const TopIdeaScore: FC<Props> = ({ icon, percentage, text }) => (
  <ScoringContentStyle>
    <ScoringTextContainerStyle>
      {icon}
      <ScoringTextStyle>
        <ScoringPercentageStyle>{`${percentage}%`}</ScoringPercentageStyle>
        <ScoringPercentageTextStyle>{text}</ScoringPercentageTextStyle>
      </ScoringTextStyle>
    </ScoringTextContainerStyle>
  </ScoringContentStyle>
);
