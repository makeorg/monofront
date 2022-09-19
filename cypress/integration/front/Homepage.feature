@front
Feature: The Home Page
  I want to vist the Make.org home page

  Scenario: Redirect to france Homepage
    Given I go to "homepage"
    Then I should be redirect to "france homepage"

  Scenario: Redirect to british Homepage
    Given I go to "homepage" from Great Britain
    Then I should be redirect to "british homepage"
  
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

  Scenario: Country switching redirect to Homepage
    Given I monitor API "postTracking" requests
    When I go to "france homepage"    
    Then I see "France" in "footer" container
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
      | language            | fr                                                                    |
      | country             | FR                                                                    |
      | question-id         | null                                                                  |
      | referrer            | http://localhost:9009/__/                                             |
      | custom-data         | null                                                                  |
    When I click on "country-language-switch-panel" button
    Then I see "Votre pays" in "country_language_switch_nav" container
    And I see a "country_switch_GB" radio
    When I click on "country_switch_GB" radio
    And I click on "confirm-country-language-switch" button
    Then I should be redirect to "british homepage"
    And I see "Grande Bretagne" in "footer" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name                | value                                                                 |
      | eventType           | trackCustom                                                           |
      | country             | GB                                                                    |
      | language            | fr                                                                    |
      | source              | core                                                                  |
      | location            | homepage                                                              |
      | questionId          |                                                                       |
      | questionSlug        |                                                                       |
      | referrer            | http://localhost:9009/__/                                             |
      | url                 | http://localhost:9009/GB                                              |
    And some make data header should be sent to "postTracking":
      | name                | value                                                                 |
      | app-name            | main-front                                                            |
      | source              | core                                                                  |
      | location            | homepage                                                              |
      | language            | fr                                                                    |
      | country             | GB                                                                    |
      | question-id         | null                                                                  |
      | referrer            | http://localhost:9009/__/                                             |
      | custom-data         | null                                                                  |

  Scenario: Language switching
    Given I monitor API "postTracking" requests
    When I go to "france homepage"    
    Then I see "France" in "footer" container
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
      | language            | fr                                                                    |
      | country             | FR                                                                    |
      | question-id         | null                                                                  |
      | referrer            | http://localhost:9009/__/                                             |
      | custom-data         | null                                                                  |
    When I click on "country-language-switch-panel" button
    Then I see "Votre pays" in "country_language_switch_nav" container
    And I see a "language_switch_en" radio
    When I click on "language_switch_en" radio
    And I click on "confirm-country-language-switch" button
    And I see "France" in "footer" container
   
  Scenario: Language and country switching redirect to Homepage
    Given I monitor API "postTracking" requests
    When I go to "france homepage"    
    Then I see "France" in "footer" container
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
      | language            | fr                                                                    |
      | country             | FR                                                                    |
      | question-id         | null                                                                  |
      | referrer            | http://localhost:9009/__/                                             |
      | custom-data         | null                                                                  |
    When I click on "country-language-switch-panel" button
    Then I see "Votre pays" in "country_language_switch_nav" container
    And I see a "language_switch_en" radio
    And I see a "country_switch_GB" radio
    When I click on "language_switch_en" and "country_switch_GB" radios
    And I click on "confirm-country-language-switch" button
    And I see "Great Britain" in "footer" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name                | value                                                                 |
      | eventType           | trackCustom                                                           |
      | country             | GB                                                                    |
      | language            | en                                                                    |
      | source              | core                                                                  |
      | location            | homepage                                                              |
      | questionId          |                                                                       |
      | questionSlug        |                                                                       |
      | referrer            | http://localhost:9009/__/                                             |
      | url                 | http://localhost:9009/GB                                              |
    And some make data header should be sent to "postTracking":
      | name                | value                                                                 |
      | app-name            | main-front                                                            |
      | source              | core                                                                  |
      | location            | homepage                                                              |
      | language            | en                                                                    |
      | country             | GB                                                                    |
      | question-id         | null                                                                  |
      | referrer            | http://localhost:9009/__/                                             |
      | custom-data         | null                                                                  |

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
      | language            | fr                                                                    |
      | country             | FR                                                                    |
      | question-id         | null                                                                  |
      | referrer            | http://localhost:9009/__/                                             |
      | custom-data         | null                                                                  |

  Scenario: Track display home page on british version
    Given I monitor API "postTracking" requests
    When I go to "british homepage" with a browser language "en"
    Then I see "Together, we can change society for the better" in "main" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name                | value                                                                 |
      | eventType           | trackCustom                                                           |
      | country             | GB                                                                    |
      | language            | en                                                                    |
      | source              | core                                                                  |
      | location            | homepage                                                              |
      | questionId          |                                                                       |
      | questionSlug        |                                                                       |
      | referrer            | http://localhost:9009/__/                                             |
      | url                 | http://localhost:9009/GB                                              |
    And some make data header should be sent to "postTracking":
      | name                | value                                                                 |
      | app-name            | main-front                                                            |
      | source              | core                                                                  |
      | location            | homepage                                                              |
      | language            | en                                                                    |
      | country             | GB                                                                    |
      | question-id         | null                                                                  |
      | referrer            | http://localhost:9009/__/                                             |
      | custom-data         | null                                                                  |

  Scenario: Track display france Homepage with "en" language
    Given I monitor API "postTracking" requests
    When I go to "france homepage" with a browser language "en, fr, de"
    Then I see "Together, we can change society for the better" in "main" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name                | value                                                                 |
      | eventType           | trackCustom                                                           |
      | country             | FR                                                                    |
      | language            | en                                                                    |
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
      | language            | en                                                                    |
      | country             | FR                                                                    |
      | question-id         | null                                                                  |
      | referrer            | http://localhost:9009/__/                                             |
      | custom-data         | null                                                                  |


  Scenario: Track display france Homepage whith language fallback
    Given I monitor API "postTracking" requests
    When I go to "france homepage" with a browser language "it"
    Then I see "Together, we can change society for the better" in "main" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name                | value                                                                 |
      | eventType           | trackCustom                                                           |
      | country             | FR                                                                    |
      | language            | en                                                                    |
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
      | language            | en                                                                    |
      | country             | FR                                                                    |
      | question-id         | null                                                                  |
      | referrer            | http://localhost:9009/__/                                             |
      | custom-data         | null                                                                  |


  Scenario: Track display british Homepage with a browser language "de"
    Given I monitor API "postTracking" requests
    When I go to "british homepage" with a browser language "de"
    Then I see "Gemeinsam können wir die Gesellschaft verbessern" in "main" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name                | value                                                                 |
      | eventType           | trackCustom                                                           |
      | country             | GB                                                                    |
      | language            | de                                                                    |
      | source              | core                                                                  |
      | location            | homepage                                                              |
      | questionId          |                                                                       |
      | questionSlug        |                                                                       |
      | referrer            | http://localhost:9009/__/                                             |
      | url                 | http://localhost:9009/GB                                              |
    And some make data header should be sent to "postTracking":
      | name                | value                                                                 |
      | app-name            | main-front                                                            |
      | source              | core                                                                  |
      | location            | homepage                                                              |
      | language            | de                                                                    |
      | country             | GB                                                                    |
      | question-id         | null                                                                  |
      | referrer            | http://localhost:9009/__/                                             |
      | custom-data         | null                                                                  |

  Scenario: Track display france Homepage with a browser language ""
    Given I monitor API "postTracking" requests
    When I go to "france homepage" with a browser language ""
    Then I see "Together, we can change society for the better" in "main" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name                | value                                                                 |
      | eventType           | trackCustom                                                           |
      | country             | FR                                                                    |
      | language            | en                                                                    |
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
      | language            | en                                                                    |
      | country             | FR                                                                    |
      | question-id         | null                                                                  |
      | referrer            | http://localhost:9009/__/                                             |
      | custom-data         | null                                                                  |

  Scenario: Track display france Homepage with a browser language "wrong-language"
    Given I monitor API "postTracking" requests
    When I go to "france homepage" with a browser language "wrong-language"
    Then I see "Together, we can change society for the better" in "main" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name                | value                                                                 |
      | eventType           | trackCustom                                                           |
      | country             | FR                                                                    |
      | language            | en                                                                    |
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
      | language            | en                                                                    |
      | country             | FR                                                                    |
      | question-id         | null                                                                  |
      | referrer            | http://localhost:9009/__/                                             |
      | custom-data         | null                                                                  |
      