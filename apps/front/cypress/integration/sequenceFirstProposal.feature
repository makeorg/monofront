Feature: Final proposal
  I want to see first proposal
  Scenario: Without first proposal
    Given I am on the sequence page of the question "question-3-slug"
    When I click on "intro card start" button
    Then I see "proposal-question-3-slug-0-content"
  Scenario: With first proposal
    Given I am to the sequence page of the question "question-3-slug" with a first proposal "proposal-question-0-slug-3-id"
    When I click on "intro card start" button
    Then I see "proposal-question-0-slug-3-content"

    