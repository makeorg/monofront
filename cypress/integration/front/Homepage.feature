@front
Feature: The Home Page
  I want to visit the Make.org home page
  
  Scenario: Homepage has a title
    Given I go to "france homepage"
    Then I see "Agir avec Make.org - Make.org" in the title

  Scenario: Homepage has canonical url
    Given I go to "france homepage"
    Then I see the canonical url "http://localhost:9009/FR" of the page

  Scenario: Homepage has hero section
    Given I go to "france homepage"
    Then I see "Ensemble, nous avons le pouvoir d'améliorer la société" in "hero-title" container

  Scenario: Homepage has highlights section
    Given I go to "france homepage"
    Then I see "Make.org en quelques chiffres" in "highlights_title" container

  Scenario: Homepage has currentQuestion section
    Given I go to "france homepage"
    Then I see "Participez aux consultations en cours" in "current_consultations_title" container

  Scenario: Homepage has featuredQuestions section
    Given I go to "france homepage"
    Then I see "Grandes causes Make.org" in "featured_questions_subtitle" container
    And I see "Make.org passe à l’action sur les grands sujets de société" in "featured_questions_title" container
    And I see a link "operationTitle_5" to "/FR/consultation/question-5-slug/participate" in "featured_questions_navigation" container

  Scenario: Homepage has featuredPosts section
    Given I go to "france homepage"
    And I see "Notre actualité" in "featured_posts_title" container

  Scenario: Homepage has partnership section
    Given I go to "france homepage"
    Then I see "Devenir partenaire" in "partnership_subtitle" container
    And I see "Collaborez avec Make.org" in "partnership_title" container
    And I see "Nous travaillons avec des entreprises, associations, institutions pour faire avancer nos projets. Nous accompagnons également ces organisations pour leur permettre de lancer leurs propres consultations." in "partnership_description" container
    And I see a link "Voir nos offres" to "https://about.make.org/fr/collaborate" in "partnership" container

  Scenario: Track display home page
    Given I monitor API "postTracking" requests
    When I go to "france homepage"
    Then I see "Ensemble, nous avons le pouvoir d'améliorer la société" in "main" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name                | value                                                                 |
      | eventType           | trackCustom                                                           |
      | country             | FR                                                                    |
      | language            | fr                                                                    |
      | source              | core                                                                  |
      | location            | homepage                                                              |
      | questionId          |                                                                       |
      | questionSlug        |                                                                       |
      | referrer            | http://localhost:9009/__/                                             |
      | url                 | http://localhost:9009/FR                                              |
    And some make data header should be sent to "postTracking":
      | name                | value                                                                 |
      | app-name            | main-front                                                            |
      | source              | core                                                                  |
      | location            | homepage                                                              |
      | client-language            | fr                                                                    |
      | country             | FR                                                                    |
      | question-id         | null                                                                  |
      | question-language   | null                                                                  |
      | question-slug       | null                                                                  |
      | referrer            | http://localhost:9009/__/                                             |
      | custom-data         | null                                                                  |

