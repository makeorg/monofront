@front
Feature: Demographic sequence card
  I want to see the demographic sequence card

  Scenario: Authenticate on demographic card
    Given I monitor API "postTracking" requests
    And I am on the common sequence page of the question "question-0-slug"
    When I go to card "3" from card "1"
    Then current card is a demographic card
    When I login with valid identifiers
    Then current card is a demographic card
    And progress bar is "3" on "15"

  Scenario: Don't display demographic card if cookie is set
    Given I have already answered to the demographics card and the cookie is set
    And I am on the common sequence page of the question "question-0-slug"
    When I go to card "3" from card "1"
    Then card "3" is a proposal card
    And progress bar is "3" on "14"