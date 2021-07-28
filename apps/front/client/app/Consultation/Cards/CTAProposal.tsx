// @flow
import React from 'react';
import { ColumnElementStyle } from 'Client/ui/Elements/FlexElements';
import { i18n } from 'Shared/i18n';
import {
  CardStyle,
  CardTitleStyle,
  CardDescriptionStyle,
  CardLinkStyle,
  CardSoonStyle,
  CardSoonIconStyle,
} from './style';

type Props = {
  icon: any,
  title: string,
  description: string,
  proposalCount: number,
  thresold: number,
  linkText: string,
  linkHref: string,
  classes?: string,
  onClickAction?: () => void,
  isKeywordActive?: boolean,
};

export const CTAProposal = ({
  icon,
  title,
  description,
  proposalCount,
  thresold,
  linkText,
  linkHref,
  classes = '',
  onClickAction = () => {},
  isKeywordActive,
}: Props) => {
  const isActive = proposalCount >= thresold;

  return (
    <CardStyle className={classes} isKeywordActive={isKeywordActive}>
      <ColumnElementStyle>
        {icon}
        <CardTitleStyle>{title}</CardTitleStyle>
        <CardDescriptionStyle>{description}</CardDescriptionStyle>
      </ColumnElementStyle>
      {isActive ? (
        <CardLinkStyle to={linkHref} onClick={onClickAction}>
          {linkText}
        </CardLinkStyle>
      ) : (
        <CardSoonStyle>
          <CardSoonIconStyle
            width={16}
            height={16}
            aria-hidden
            focusable="false"
          />
          <> </>
          {i18n.t('consultation.cards.soon')}
        </CardSoonStyle>
      )}
    </CardStyle>
  );
};
