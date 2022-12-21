@front
Feature: The Home Page
  I want to be redirect to the right page

  Scenario: Redirect to france Homepage
    Given I go to "homepage"
    Then I should be redirect to "france homepage"

  Scenario: Redirect to british Homepage
    Given I go to "homepage" from Great Britain
    Then I should be redirect to "british homepage"

  Scenario: Redirect to Not Found FR page
    Given I go to an unknown page
    Then I should be redirect to "not found page"