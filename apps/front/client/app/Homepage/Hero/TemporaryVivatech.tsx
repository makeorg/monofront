import React, { FC } from 'react';
import i18n from 'i18next';
import {
  TempVivHeroStyle,
  TempVivHeroWrapperStyle,
  TempVivNewsStyle,
  TempVivTitleContainerStyle,
  TempVivTitleStyle,
  TempVivTitleItalicStyle,
  TempVivFlexContainerStyle,
  TempVivBlockStyle,
  TempVivSmallTitleStyle,
  TempVivSmallTitleItalicStyle,
  TempVivTextStyle,
  TempVivButtonStyle,
} from './style';

export const TemporaryVivatech: FC = () => (
  <TempVivHeroWrapperStyle as="section">
    <TempVivHeroStyle>
      <TempVivNewsStyle>{i18n.t('temp_viva.break')}</TempVivNewsStyle>
      <TempVivTitleContainerStyle>
        <TempVivTitleStyle>{i18n.t('temp_viva.title')}</TempVivTitleStyle>
        <TempVivTitleItalicStyle>
          {i18n.t('temp_viva.title_italic')}
        </TempVivTitleItalicStyle>
        <TempVivTitleStyle>{i18n.t('temp_viva.title_2')}</TempVivTitleStyle>
      </TempVivTitleContainerStyle>
      <TempVivFlexContainerStyle>
        <TempVivBlockStyle>
          <h3>
            <TempVivSmallTitleItalicStyle>
              {i18n.t('temp_viva.sub_1_italic')}
            </TempVivSmallTitleItalicStyle>
            <TempVivSmallTitleStyle>
              {i18n.t('temp_viva.sub_1')}
            </TempVivSmallTitleStyle>
          </h3>
          <TempVivTextStyle>{i18n.t('temp_viva.text_1')}</TempVivTextStyle>
          <TempVivButtonStyle href="" target="_blank" rel="noopener noreferrer">
            {i18n.t('temp_viva.button_1')}
          </TempVivButtonStyle>
        </TempVivBlockStyle>
        <TempVivBlockStyle>
          <h3>
            <TempVivSmallTitleItalicStyle>
              {i18n.t('temp_viva.sub_2_italic')}
            </TempVivSmallTitleItalicStyle>
            <TempVivSmallTitleStyle>
              {i18n.t('temp_viva.sub_2')}
            </TempVivSmallTitleStyle>
          </h3>
          <TempVivTextStyle>{i18n.t('temp_viva.text_2')}</TempVivTextStyle>
          <TempVivButtonStyle href="" target="_blank" rel="noopener noreferrer">
            {i18n.t('temp_viva.button_2')}
          </TempVivButtonStyle>
        </TempVivBlockStyle>
      </TempVivFlexContainerStyle>
    </TempVivHeroStyle>
  </TempVivHeroWrapperStyle>
);
