import React from 'react';
import i18n from 'i18next';
import { TagType } from '@make.org/types';
import { ScreenReaderItemStyle } from '@make.org/ui/elements/AccessibilityElements';
import {
  ProposalFooterTagListStyle,
  ProposalFooterTagListItemStyle,
} from '../Styled';

const NUMBER_OF_TAGS_TO_DISPLAY = 4;

type Props = {
  tags: Partial<TagType>[];
};

export const ProposalFooterWithTagElement: React.FC<Props> = ({ tags }) => {
  if (!tags.filter(tag => tag.display).length) {
    return null;
  }

  return (
    <>
      <ScreenReaderItemStyle
        as="p"
        dangerouslySetInnerHTML={{
          __html: i18n.t('consultation.tags.proposal_list'),
        }}
      />
      <ProposalFooterTagListStyle>
        {tags
          .filter(tag => tag.display === true)
          .slice(0, NUMBER_OF_TAGS_TO_DISPLAY)
          .map(tag => (
            <ProposalFooterTagListItemStyle as="li" key={tag.tagId}>
              <span>{tag.label}</span>
            </ProposalFooterTagListItemStyle>
          ))}
      </ProposalFooterTagListStyle>
    </>
  );
};
