import React, { FC } from 'react';
import i18n from 'i18next';
import { MetaTags } from '@make.org/components/MetaTags';
import {
  ModerationCharterWrapperStyle,
  StaticSecondLevelTitleStyle,
  StaticCenteredParagraphStyle,
  ModerationDisclaimerParagraphStyle,
  StaticModerationOrderedExamplesStyle,
  StaticModerationOrderedItemStyle,
  ModerationExampleCardStyle,
  ModerationParagraphStyle,
  ModerationExampleCardTitleStyle,
  StaticParagraphStyle,
  ModerationExampleCardsWrapperStyle,
  ModerationExampleCardTitleIconStyle,
  ModerationFootnotesStyleOrderedListWrapperStyle,
  ModerationFootnotesStyleOrderedListItemStyle,
  ModerationSectionTitleStyle,
} from './style';

const ModerationCharterPage: FC = () => (
  <>
    <MetaTags
      title={i18n.t('meta.moderation.title')}
      description={i18n.t('meta.moderation.description')}
    />
    <ModerationCharterWrapperStyle>
      <StaticSecondLevelTitleStyle>
        {i18n.t('moderation_charter.title')}
      </StaticSecondLevelTitleStyle>
      <ModerationParagraphStyle>
        {i18n.t('moderation_charter.description')}
      </ModerationParagraphStyle>
      <ModerationSectionTitleStyle>
        {i18n.t('moderation_charter.refused_examples')}
      </ModerationSectionTitleStyle>
      <StaticModerationOrderedExamplesStyle className="list-style-inside">
        <StaticModerationOrderedItemStyle>
          <strong>
            {' '}
            {i18n.t('moderation_charter.incomprehensible_solutions.title')}
          </strong>
          <StaticParagraphStyle>
            {i18n.t(
              'moderation_charter.incomprehensible_solutions.description'
            )}
          </StaticParagraphStyle>
          <ModerationExampleCardsWrapperStyle>
            <ModerationExampleCardStyle className="refused">
              <ModerationExampleCardTitleStyle className="refused">
                <ModerationExampleCardTitleIconStyle className="refused" />
                {i18n.t('moderation_charter.refused_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.incomprehensible_solutions.refused_example_card'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="accepted">
              <ModerationExampleCardTitleStyle className="accepted">
                <ModerationExampleCardTitleIconStyle className="accepted" />
                {i18n.t('moderation_charter.validated_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.incomprehensible_solutions.validated_example_card'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
          </ModerationExampleCardsWrapperStyle>
        </StaticModerationOrderedItemStyle>
        <StaticModerationOrderedItemStyle>
          <strong>
            {i18n.t('moderation_charter.irrelevant_solutions.title')}
          </strong>
          <StaticParagraphStyle>
            {i18n.t('moderation_charter.irrelevant_solutions.description')}
          </StaticParagraphStyle>
          <StaticParagraphStyle>
            {i18n.t('moderation_charter.irrelevant_solutions.example')}
          </StaticParagraphStyle>
          <ModerationExampleCardsWrapperStyle>
            <ModerationExampleCardStyle className="refused">
              <ModerationExampleCardTitleStyle className="refused">
                <ModerationExampleCardTitleIconStyle className="refused" />
                {i18n.t('moderation_charter.refused_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.irrelevant_solutions.refused_card_example'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="accepted">
              <ModerationExampleCardTitleStyle className="accepted">
                <ModerationExampleCardTitleIconStyle className="accepted" />
                {i18n.t('moderation_charter.validated_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.irrelevant_solutions.validated_card_example'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
          </ModerationExampleCardsWrapperStyle>
        </StaticModerationOrderedItemStyle>
        <StaticModerationOrderedItemStyle>
          <strong>
            {' '}
            {i18n.t('moderation_charter.discriminatory_solutions.title')}
          </strong>
          <StaticParagraphStyle>
            {i18n.t('moderation_charter.discriminatory_solutions.description')}
          </StaticParagraphStyle>
          <ModerationExampleCardsWrapperStyle>
            <ModerationExampleCardStyle className="refused">
              <ModerationExampleCardTitleStyle className="refused">
                <ModerationExampleCardTitleIconStyle className="refused" />
                {i18n.t('moderation_charter.refused_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.discriminatory_solutions.refused_card_example'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="accepted">
              <ModerationExampleCardTitleStyle className="accepted">
                <ModerationExampleCardTitleIconStyle className="accepted" />
                {i18n.t('moderation_charter.validated_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.discriminatory_solutions.validated_card_example'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="refused">
              <ModerationExampleCardTitleStyle className="refused">
                <ModerationExampleCardTitleIconStyle className="refused" />
                {i18n.t('moderation_charter.refused_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.discriminatory_solutions.refused_card_example_2'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="accepted">
              <ModerationExampleCardTitleStyle className="accepted">
                <ModerationExampleCardTitleIconStyle className="accepted" />
                {i18n.t('moderation_charter.validated_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.discriminatory_solutions.validated_card_example_2'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
          </ModerationExampleCardsWrapperStyle>
        </StaticModerationOrderedItemStyle>
        <StaticModerationOrderedItemStyle>
          <strong>
            {i18n.t('moderation_charter.partisan_solutions.title')}
          </strong>
          <StaticParagraphStyle>
            {i18n.t('moderation_charter.partisan_solutions.description')}
          </StaticParagraphStyle>
          <ModerationExampleCardsWrapperStyle>
            <ModerationExampleCardStyle className="refused">
              <ModerationExampleCardTitleStyle className="refused">
                <ModerationExampleCardTitleIconStyle className="refused" />
                {i18n.t('moderation_charter.refused_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.partisan_solutions.refused_card_example'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="accepted">
              <ModerationExampleCardTitleStyle className="accepted">
                <ModerationExampleCardTitleIconStyle className="accepted" />
                {i18n.t('moderation_charter.validated_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.partisan_solutions.validated_card_example'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="refused">
              <ModerationExampleCardTitleStyle className="refused">
                <ModerationExampleCardTitleIconStyle className="refused" />
                {i18n.t('moderation_charter.refused_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.partisan_solutions.refused_card_example_2'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="accepted">
              <ModerationExampleCardTitleStyle className="accepted">
                <ModerationExampleCardTitleIconStyle className="accepted" />
                {i18n.t('moderation_charter.validated_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.partisan_solutions.refused_card_example_2'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
          </ModerationExampleCardsWrapperStyle>
        </StaticModerationOrderedItemStyle>
        <StaticModerationOrderedItemStyle>
          <strong>{i18n.t('moderation_charter.advertising.title')}</strong>
          <StaticParagraphStyle>
            {i18n.t('moderation_charter.advertising.description')}
          </StaticParagraphStyle>
          <ModerationExampleCardsWrapperStyle>
            <ModerationExampleCardStyle className="refused">
              <ModerationExampleCardTitleStyle className="refused">
                <ModerationExampleCardTitleIconStyle className="refused" />
                {i18n.t('moderation_charter.refused_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t('moderation_charter.advertising.refused_card_example')}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="accepted">
              <ModerationExampleCardTitleStyle className="accepted">
                <ModerationExampleCardTitleIconStyle className="accepted" />
                {i18n.t('moderation_charter.validated_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.advertising.validated_card_example'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
          </ModerationExampleCardsWrapperStyle>
        </StaticModerationOrderedItemStyle>
        <StaticModerationOrderedItemStyle>
          <strong> {i18n.t('moderation_charter.multiple_ideas.title')}</strong>
          <StaticParagraphStyle>
            {i18n.t('moderation_charter.multiple_ideas.description')}
          </StaticParagraphStyle>
          <ModerationExampleCardsWrapperStyle>
            <ModerationExampleCardStyle className="refused">
              <ModerationExampleCardTitleStyle className="refused">
                <ModerationExampleCardTitleIconStyle className="refused" />
                {i18n.t('moderation_charter.refused_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t('moderation_charter.advertising.refused_card_example')}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="accepted">
              <ModerationExampleCardTitleStyle className="accepted">
                <ModerationExampleCardTitleIconStyle className="accepted" />
                {i18n.t('moderation_charter.validated_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.advertising.validated_card_example'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
          </ModerationExampleCardsWrapperStyle>
        </StaticModerationOrderedItemStyle>
        <StaticModerationOrderedItemStyle>
          <strong> {i18n.t('moderation_charter.insults.title')}</strong>
          <StaticParagraphStyle>
            ‍{i18n.t('moderation_charter.insults.description')}
          </StaticParagraphStyle>
          <ModerationExampleCardsWrapperStyle>
            <ModerationExampleCardStyle className="refused">
              <ModerationExampleCardTitleStyle className="refused">
                <ModerationExampleCardTitleIconStyle className="refused" />
                {i18n.t('moderation_charter.refused_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t('moderation_charter.insults.refused_card_example')}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="accepted">
              <ModerationExampleCardTitleStyle className="accepted">
                <ModerationExampleCardTitleIconStyle className="accepted" />
                {i18n.t('moderation_charter.validated_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t('moderation_charter.insults.validated_card_example')}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
          </ModerationExampleCardsWrapperStyle>
        </StaticModerationOrderedItemStyle>
      </StaticModerationOrderedExamplesStyle>
      <ModerationSectionTitleStyle>
        {i18n.t('moderation_charter.correctly_formulated_solutions.title')}
      </ModerationSectionTitleStyle>
      <StaticModerationOrderedExamplesStyle>
        <StaticModerationOrderedItemStyle>
          <StaticParagraphStyle>
            {i18n.t('moderation_charter.search_function')}
          </StaticParagraphStyle>
        </StaticModerationOrderedItemStyle>
        <StaticModerationOrderedItemStyle>
          <StaticParagraphStyle>
            {i18n.t('moderation_charter.concrete_elements.text')}
          </StaticParagraphStyle>
          <ModerationExampleCardsWrapperStyle>
            <ModerationExampleCardStyle className="refused">
              <ModerationExampleCardTitleStyle className="refused">
                <ModerationExampleCardTitleIconStyle className="refused" />
                {i18n.t('moderation_charter.unsuitable_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.concrete_elements.refused_card_example'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="accepted">
              <ModerationExampleCardTitleStyle className="accepted">
                <ModerationExampleCardTitleIconStyle className="accepted" />
                {i18n.t('moderation_charter.adapted_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.concrete_elements.validated_card_example'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="refused">
              <ModerationExampleCardTitleStyle className="refused">
                <ModerationExampleCardTitleIconStyle className="refused" />
                {i18n.t('moderation_charter.unsuitable_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.concrete_elements.refused_card_example_2'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="accepted">
              <ModerationExampleCardTitleStyle className="accepted">
                <ModerationExampleCardTitleIconStyle className="accepted" />
                {i18n.t('moderation_charter.adapted_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.concrete_elements.validated_card_example'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
          </ModerationExampleCardsWrapperStyle>
        </StaticModerationOrderedItemStyle>
        <StaticModerationOrderedItemStyle>
          <StaticParagraphStyle>
            {i18n.t('moderation_charter.understandable_language.text')}
          </StaticParagraphStyle>
          <ModerationExampleCardsWrapperStyle>
            <ModerationExampleCardStyle className="refused">
              <ModerationExampleCardTitleStyle className="refused">
                <ModerationExampleCardTitleIconStyle className="refused" />
                {i18n.t('moderation_charter.unsuitable_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.understandable_language.refused_card_example'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="accepted">
              <ModerationExampleCardTitleStyle className="accepted">
                <ModerationExampleCardTitleIconStyle className="accepted" />
                {i18n.t('moderation_charter.adapted_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.understandable_language.validated_card_example'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="refused">
              <ModerationExampleCardTitleStyle className="refused">
                <ModerationExampleCardTitleIconStyle className="refused" />
                {i18n.t('moderation_charter.unsuitable_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.understandable_language.refused_card_example_2'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="accepted">
              <ModerationExampleCardTitleStyle className="accepted">
                <ModerationExampleCardTitleIconStyle className="accepted" />
                {i18n.t('moderation_charter.adapted_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t(
                  'moderation_charter.understandable_language.validated_card_example'
                )}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
          </ModerationExampleCardsWrapperStyle>
        </StaticModerationOrderedItemStyle>
        <StaticModerationOrderedItemStyle>
          <StaticParagraphStyle>
            {i18n.t('moderation_charter.acronyms.text')}
          </StaticParagraphStyle>
          <ModerationExampleCardsWrapperStyle>
            <ModerationExampleCardStyle className="refused">
              <ModerationExampleCardTitleStyle className="refused">
                <ModerationExampleCardTitleIconStyle className="refused" />
                {i18n.t('moderation_charter.unsuitable_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t('moderation_charter.acronyms.refused_card_example')}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
            <ModerationExampleCardStyle className="accepted">
              <ModerationExampleCardTitleStyle className="accepted">
                <ModerationExampleCardTitleIconStyle className="accepted" />
                {i18n.t('moderation_charter.adapted_label')}
              </ModerationExampleCardTitleStyle>
              <StaticCenteredParagraphStyle>
                {i18n.t('moderation_charter.acronyms.validated_card_example')}
              </StaticCenteredParagraphStyle>
            </ModerationExampleCardStyle>
          </ModerationExampleCardsWrapperStyle>
        </StaticModerationOrderedItemStyle>
      </StaticModerationOrderedExamplesStyle>
      <ModerationDisclaimerParagraphStyle>
        {i18n.t('moderation_charter.disclaimer')}
      </ModerationDisclaimerParagraphStyle>
      <ModerationFootnotesStyleOrderedListWrapperStyle>
        <ModerationFootnotesStyleOrderedListItemStyle>
          {i18n.t('moderation_charter.foot_notes.ethical_charter')}
        </ModerationFootnotesStyleOrderedListItemStyle>
        <ModerationFootnotesStyleOrderedListItemStyle>
          {i18n.t('moderation_charter.foot_notes.code_penal')}
        </ModerationFootnotesStyleOrderedListItemStyle>
      </ModerationFootnotesStyleOrderedListWrapperStyle>
    </ModerationCharterWrapperStyle>
  </>
);

export default ModerationCharterPage;
