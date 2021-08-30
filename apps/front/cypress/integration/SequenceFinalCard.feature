Feature: Final card
  I want to see final card
  Scenario: Display final card
    Given I am on the sequence page of the question "question-3-slug"
    When I go to card "6"
    Then I see "Merci d’avoir réagi aux propositions !" in "final-card-title" container
    And I see "Continuez à voter pour nous aider à identifier les priorités." in "final-card-description" container
    And I see a link "J'accède à la consultation" to "/FR/consultation/question-3-slug/participate" in "final-card" container
    And I see "Comment suivre les résultats ?" in "final-card-register-description" container
    When I click on "final-card-register-button" button
    Then I see "Créer un compte" in "register-modal-title" container
    