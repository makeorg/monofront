@front
Feature: Login
  I want to check login panel behaviour

  Scenario: Check login panel and tracking
    Given I monitor API "postTracking" requests
    When I go to "france homepage"
    Then I see a button "login" in "header" container
    When I click on "login" button
    Then I see "Se connecter" in "login-panel-title" container
    And event "display-signin-form" should be tracked by Make with parameters values:
      | name                | value                                                               |
      | eventType           | trackCustom                                                         |
      | country             | FR                                                                  |
      | language            | fr                                                                  |
      | source              | core                                                                |
      | location            | homepage                                                            |
      | questionId          |                                                                     |
      | questionSlug        |                                                                     |
      | referrer            | http://localhost:9009/__/                                           |
      | url                 | http://localhost:9009/FR                                           |

  Scenario: Check login form submission and tracking
    Given I monitor API "postTracking" requests
    When I go to "france homepage"
    Then I click on "login" button
    Then I see "Se connecter" in "login-panel-title" container
    When I login with valid identifiers
    Then login form is closed
    Then I see "Vous avez été connecté(e) avec succès." in "login-banner-success" container
    Then I click on "close-banner" button
    Then banner is closed
    Then event "signin-email-success" should be tracked by Make with parameters values:
      | name                | value                                                               |
      | eventType           | trackCustom                                                         |
      | country             | FR                                                                  |
      | language            | fr                                                                  |
      | source              | core                                                                |
      | location            | homepage                                                            |
      | questionId          |                                                                     |
      | questionSlug        |                                                                     |
      | referrer            | http://localhost:9009/__/                                           |
      | url                 | http://localhost:9009/FR                                           |
