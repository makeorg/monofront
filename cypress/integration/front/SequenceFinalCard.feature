@front
Feature: Final card
  I want to see final card
  Scenario: Display final card
    Given I am on the sequence page of the question "question-3-slug"
    When I go to card "6" from card "1"
    Then I see "Merci d’avoir réagi aux propositions !" in "final-card-title" container
    And I see "Continuez à voter pour nous aider à identifier les priorités." in "final-card-description" container
    
  Scenario: click on "continue voting" button
    Given I am on the sequence page of the question "question-3-slug"
    When I go to card "6" from card "1"
    Then I see "Merci d’avoir réagi aux propositions !" in "final-card-title" container
    When I click on "final-card-relaunch-sequence" button
    Then card "1" is visible