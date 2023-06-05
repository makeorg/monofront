@front
Feature: Country and Language management
  I want to switch language and/or country

  Scenario: Track display home page on british version
    Given I monitor API "postTracking" requests
    When I go to "british homepage" with a browser language "en"
    Then I see "Together, we can change society for the better" in "main" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name         | value                     |
      | eventType    | trackCustom               |
      | country      | GB                        |
      | language     | en                        |
      | source       | core                      |
      | location     | homepage                  |
      | questionId   |                           |
      | questionSlug |                           |
      | referrer     | http://localhost:9009/__/ |
      | url          | http://localhost:9009/GB  |
    And some make data header should be sent to "postTracking":
      | name              | value                     |
      | app-name          | main-front                |
      | source            | core                      |
      | location          | homepage                  |
      | client-language   | en                        |
      | country           | GB                        |
      | question-id       | null                      |
      | question-language | null                      |
      | question-slug     | null                      |
      | referrer          | http://localhost:9009/__/ |
      | custom-data       | null                      |

  Scenario: Track display france Homepage with "en" language
    Given I monitor API "postTracking" requests
    When I go to "france homepage" with a browser language "en, fr, de"
    Then I see "Together, we can change society for the better" in "main" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name         | value                     |
      | eventType    | trackCustom               |
      | country      | FR                        |
      | language     | en                        |
      | source       | core                      |
      | location     | homepage                  |
      | questionId   |                           |
      | questionSlug |                           |
      | referrer     | http://localhost:9009/__/ |
      | url          | http://localhost:9009/FR  |
    And some make data header should be sent to "postTracking":
      | name              | value                     |
      | app-name          | main-front                |
      | source            | core                      |
      | location          | homepage                  |
      | client-language   | en                        |
      | country           | FR                        |
      | question-id       | null                      |
      | question-language | null                      |
      | question-slug     | null                      |
      | referrer          | http://localhost:9009/__/ |
      | custom-data       | null                      |


  Scenario: Track display france Homepage whith language fallback
    Given I monitor API "postTracking" requests
    When I go to "france homepage" with a browser language "br"
    Then I see "Together, we can change society for the better" in "main" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name         | value                     |
      | eventType    | trackCustom               |
      | country      | FR                        |
      | language     | en                        |
      | source       | core                      |
      | location     | homepage                  |
      | questionId   |                           |
      | questionSlug |                           |
      | referrer     | http://localhost:9009/__/ |
      | url          | http://localhost:9009/FR  |
    And some make data header should be sent to "postTracking":
      | name              | value                     |
      | app-name          | main-front                |
      | source            | core                      |
      | location          | homepage                  |
      | client-language   | en                        |
      | country           | FR                        |
      | question-id       | null                      |
      | question-language | null                      |
      | question-slug     | null                      |
      | referrer          | http://localhost:9009/__/ |
      | custom-data       | null                      |


  Scenario: Track display british Homepage with a browser language "de"
    Given I monitor API "postTracking" requests
    When I go to "british homepage" with a browser language "de"
    Then I see "Gemeinsam können wir die Gesellschaft verbessern" in "main" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name         | value                     |
      | eventType    | trackCustom               |
      | country      | GB                        |
      | language     | de                        |
      | source       | core                      |
      | location     | homepage                  |
      | questionId   |                           |
      | questionSlug |                           |
      | referrer     | http://localhost:9009/__/ |
      | url          | http://localhost:9009/GB  |
    And some make data header should be sent to "postTracking":
      | name              | value                     |
      | app-name          | main-front                |
      | source            | core                      |
      | location          | homepage                  |
      | client-language   | de                        |
      | country           | GB                        |
      | question-id       | null                      |
      | question-language | null                      |
      | question-slug     | null                      |
      | referrer          | http://localhost:9009/__/ |
      | custom-data       | null                      |

  Scenario: Track display france Homepage with a browser language ""
    Given I monitor API "postTracking" requests
    When I go to "france homepage" with a browser language ""
    Then I see "Together, we can change society for the better" in "main" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name         | value                     |
      | eventType    | trackCustom               |
      | country      | FR                        |
      | language     | en                        |
      | source       | core                      |
      | location     | homepage                  |
      | questionId   |                           |
      | questionSlug |                           |
      | referrer     | http://localhost:9009/__/ |
      | url          | http://localhost:9009/FR  |
    And some make data header should be sent to "postTracking":
      | name              | value                     |
      | app-name          | main-front                |
      | source            | core                      |
      | location          | homepage                  |
      | client-language   | en                        |
      | country           | FR                        |
      | question-id       | null                      |
      | question-language | null                      |
      | question-slug     | null                      |
      | referrer          | http://localhost:9009/__/ |
      | custom-data       | null                      |

  Scenario: Track display france Homepage with a browser language "wrong-language"
    Given I monitor API "postTracking" requests
    When I go to "france homepage" with a browser language "wrong-language"
    Then I see "Together, we can change society for the better" in "main" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name         | value                     |
      | eventType    | trackCustom               |
      | country      | FR                        |
      | language     | en                        |
      | source       | core                      |
      | location     | homepage                  |
      | questionId   |                           |
      | questionSlug |                           |
      | referrer     | http://localhost:9009/__/ |
      | url          | http://localhost:9009/FR  |
    And some make data header should be sent to "postTracking":
      | name              | value                     |
      | app-name          | main-front                |
      | source            | core                      |
      | location          | homepage                  |
      | client-language   | en                        |
      | country           | FR                        |
      | question-id       | null                      |
      | question-language | null                      |
      | question-slug     | null                      |
      | referrer          | http://localhost:9009/__/ |
      | custom-data       | null                      |

  Scenario: Country switching redirect to Homepage
    Given I monitor API "postTracking" requests
    When I go to "france homepage"
    Then I see a button "country language switch" with label "France • Fr"
    And event "display-page-home" should be tracked by Make with parameters values:
      | name         | value                     |
      | eventType    | trackCustom               |
      | country      | FR                        |
      | language     | fr                        |
      | source       | core                      |
      | location     | homepage                  |
      | questionId   |                           |
      | questionSlug |                           |
      | referrer     | http://localhost:9009/__/ |
      | url          | http://localhost:9009/FR  |
    And some make data header should be sent to "postTracking":
      | name              | value                     |
      | app-name          | main-front                |
      | source            | core                      |
      | location          | homepage                  |
      | client-language   | fr                        |
      | country           | FR                        |
      | question-id       | null                      |
      | question-language | null                      |
      | question-slug     | null                      |
      | referrer          | http://localhost:9009/__/ |
      | custom-data       | null                      |
    When I click on "country language switch" button
    Then I see "Votre pays" in "country_language_switch_nav" container
    And I see a "country_switch_GB" radio
    When I click on "country_switch_GB" radio
    And I click on "confirm-country-language-switch" button
    And event "click-confirm-language-country" should be tracked by Make with parameters values:
      | name         | value                     |
      | eventType    | trackCustom               |
      | country      | FR                        |
      | language     | fr                        |
      | source       | core                      |
      | location     | homepage                  |
      | questionId   |                           |
      | questionSlug |                           |
      | referrer     | http://localhost:9009/__/ |
      | url          | http://localhost:9009/FR  |
    And some make data header should be sent to "postTracking":
      | name              | value                     |
      | app-name          | main-front                |
      | source            | core                      |
      | location          | homepage                  |
      | client-language   | fr                        |
      | country           | FR                        |
      | question-id       | null                      |
      | question-language | null                      |
      | question-slug     | null                      |
      | referrer          | http://localhost:9009/__/ |
      | custom-data       | null                      |
    Then I should be redirect to "british homepage"
    Then I see a button "country language switch" with label "Grande Bretagne • Fr"
    And event "display-page-home" should be tracked by Make with parameters values:
      | name         | value                     |
      | eventType    | trackCustom               |
      | country      | GB                        |
      | language     | fr                        |
      | source       | core                      |
      | location     | homepage                  |
      | questionId   |                           |
      | questionSlug |                           |
      | referrer     | http://localhost:9009/__/ |
      | url          | http://localhost:9009/GB  |
    And some make data header should be sent to "postTracking":
      | name              | value                     |
      | app-name          | main-front                |
      | source            | core                      |
      | location          | homepage                  |
      | client-language   | fr                        |
      | country           | GB                        |
      | question-id       | null                      |
      | question-language | null                      |
      | question-slug     | null                      |
      | referrer          | http://localhost:9009/__/ |
      | custom-data       | null                      |

  Scenario: Language switching
    Given I monitor API "postTracking" requests
    When I go to "france homepage"
    Then I see "France" in "footer" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name         | value                     |
      | eventType    | trackCustom               |
      | country      | FR                        |
      | language     | fr                        |
      | source       | core                      |
      | location     | homepage                  |
      | questionId   |                           |
      | questionSlug |                           |
      | referrer     | http://localhost:9009/__/ |
      | url          | http://localhost:9009/FR  |
    And some make data header should be sent to "postTracking":
      | name              | value                     |
      | app-name          | main-front                |
      | source            | core                      |
      | location          | homepage                  |
      | client-language   | fr                        |
      | country           | FR                        |
      | question-id       | null                      |
      | question-language | null                      |
      | question-slug     | null                      |
      | referrer          | http://localhost:9009/__/ |
      | custom-data       | null                      |
    When I click on "country language switch" button
    Then I see "Votre pays" in "country_language_switch_nav" container
    And I see a "language_switch_en" radio
    When I click on "language_switch_en" radio
    And I click on "confirm-country-language-switch" button
    Then I see a button "country language switch" with label "France • En"

  Scenario: Language and country switching redirect to Homepage
    Given I monitor API "postTracking" requests
    When I go to "france homepage" with a browser language "fr"
    Then I see "France" in "footer" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name         | value                     |
      | eventType    | trackCustom               |
      | country      | FR                        |
      | language     | fr                        |
      | source       | core                      |
      | location     | homepage                  |
      | questionId   |                           |
      | questionSlug |                           |
      | referrer     | http://localhost:9009/__/ |
      | url          | http://localhost:9009/FR  |
    And some make data header should be sent to "postTracking":
      | name              | value                     |
      | app-name          | main-front                |
      | source            | core                      |
      | location          | homepage                  |
      | client-language   | fr                        |
      | country           | FR                        |
      | question-id       | null                      |
      | question-language | null                      |
      | question-slug     | null                      |
      | referrer          | http://localhost:9009/__/ |
      | custom-data       | null                      |
    When I click on "country language switch" button
    Then I see "Votre pays" in "country_language_switch_nav" container
    And I see a "language_switch_en" radio
    And I see a "country_switch_GB" radio
    When I click on "language_switch_en" and "country_switch_GB" radios
    And I click on "confirm-country-language-switch" button
    And event "click-confirm-language-country" should be tracked by Make with parameters values:
      | name         | value                     |
      | eventType    | trackCustom               |
      | country      | FR                        |
      | language     | fr                        |
      | newCountry   | GB                        |
      | newLanguage  | en                        |
      | source       | core                      |
      | location     | homepage                  |
      | questionId   |                           |
      | questionSlug |                           |
      | referrer     | http://localhost:9009/__/ |
      | url          | http://localhost:9009/FR  |
    And some make data header should be sent to "postTracking":
      | name              | value                     |
      | app-name          | main-front                |
      | source            | core                      |
      | location          | homepage                  |
      | client-language   | fr                        |
      | country           | FR                        |
      | question-id       | null                      |
      | question-language | null                      |
      | question-slug     | null                      |
      | referrer          | http://localhost:9009/__/ |
      | custom-data       | null                      |
    Then I see a button "country language switch" with label "Great Britain • En"
    And event "display-page-home" should be tracked by Make with parameters values:
      | name         | value                     |
      | eventType    | trackCustom               |
      | country      | GB                        |
      | language     | en                        |
      | source       | core                      |
      | location     | homepage                  |
      | questionId   |                           |
      | questionSlug |                           |
      | referrer     | http://localhost:9009/__/ |
      | url          | http://localhost:9009/GB  |
    And some make data header should be sent to "postTracking":
      | name              | value                     |
      | app-name          | main-front                |
      | source            | core                      |
      | location          | homepage                  |
      | client-language   | en                        |
      | country           | GB                        |
      | question-id       | null                      |
      | question-language | null                      |
      | question-slug     | null                      |
      | referrer          | http://localhost:9009/__/ |
      | custom-data       | null                      |

  Scenario: Force language with the query param lang
    Given I monitor API "postTracking" requests
    When I go to "france homepage" with a browser language "en, fr" and query params "lang=de"
    Then I see "Gemeinsam können wir die Gesellschaft verbessern" in "main" container
    And event "display-page-home" should be tracked by Make with parameters values:
      | name         | value                            |
      | eventType    | trackCustom                      |
      | country      | FR                               |
      | language     | de                               |
      | source       | core                             |
      | location     | homepage                         |
      | questionId   |                                  |
      | questionSlug |                                  |
      | referrer     | http://localhost:9009/__/        |
      | url          | http://localhost:9009/FR?lang=de |
    And some make data header should be sent to "postTracking":
      | name              | value                     |
      | app-name          | main-front                |
      | source            | core                      |
      | location          | homepage                  |
      | client-language   | de                        |
      | country           | FR                        |
      | question-id       | null                      |
      | question-language | null                      |
      | question-slug     | null                      |
      | referrer          | http://localhost:9009/__/ |
      | custom-data       | null                      |
    When I click on "country language switch" button
    And I click on "language_switch_en" radio
    And I click on "confirm-country-language-switch" button
    And event "click-confirm-language-country" should be tracked by Make with parameters values:
      | name         | value                            |
      | eventType    | trackCustom                      |
      | country      | FR                               |
      | language     | de                               |
      | newCountry   | FR                               |
      | newLanguage  | en                               |
      | source       | core                             |
      | location     | homepage                         |
      | questionId   |                                  |
      | questionSlug |                                  |
      | referrer     | http://localhost:9009/__/        |
      | url          | http://localhost:9009/FR?lang=de |
    And some make data header should be sent to "postTracking":
      | name              | value                     |
      | app-name          | main-front                |
      | source            | core                      |
      | location          | homepage                  |
      | client-language   | de                        |
      | country           | FR                        |
      | question-id       | null                      |
      | question-language | null                      |
      | question-slug     | null                      |
      | referrer          | http://localhost:9009/__/ |
      | custom-data       | null                      |
    Then I see a button "country language switch" with label "France • En"
    And I see "Together, we can change society for the better" in "main" container
    And I don't see "lang=de" in url
