import React, { FC } from 'react';
import i18n from 'i18next';
import { useAppContext } from '@make.org/store';
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

export const TemporaryVivatech: FC = () => {
  const { state } = useAppContext();
  const { language } = state.appConfig;

  const blogPostLink =
    language === 'fr'
      ? 'https://about.make.org/post/lancement-des-communs-democratiques-premiere-mondiale-une-initiative-francaise-inedite-pour-mettre-lia-au-service-de-la-democratie'
      : 'https://about.make.org/articles-en/launch-of-democratic-commons-the-first-global-research-program-to-build-ai-in-service-of-democracy';

  return (
    <TempVivHeroWrapperStyle as="section">
      <TempVivHeroStyle>
        <TempVivNewsStyle>{i18n.t('temp_viva.break')}</TempVivNewsStyle>
        <TempVivTitleContainerStyle>
          <TempVivTitleStyle>{i18n.t('temp_viva.title')}</TempVivTitleStyle>
          <TempVivTitleItalicStyle>
            {i18n.t('temp_viva.title_italic')}
          </TempVivTitleItalicStyle>
          <br />
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
            <TempVivButtonStyle
              href={blogPostLink}
              target="_blank"
              rel="noopener noreferrer"
            >
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
            <TempVivButtonStyle
              href="https://viva.panoramic.make.org/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {i18n.t('temp_viva.button_2')}
            </TempVivButtonStyle>
          </TempVivBlockStyle>
        </TempVivFlexContainerStyle>
      </TempVivHeroStyle>
    </TempVivHeroWrapperStyle>
  );
};
