@front
Feature: Proposal language switch
  I want to switch beetween original and translated proposal language 

  Scenario: Switch beetween original and translated language 
    Given I am on the common sequence page of the question "question-0-slug"
    Then card "1" is visible
    And card "1" is a proposal card
    And I see "proposal-question-0-slug-0-content-en" in "proposal-content" container
    And I see a button "proposal-language-switch" with label "Voir l'original"
    And The "next proposal" button on card "1" doesn't exist
    When I click on "proposal-language-switch" button
    Then I see "proposal-question-0-slug-0-content" in "proposal-content" container
    And I see a button "proposal-language-switch" with label "Voir la traduction"
    When I click on "proposal-language-switch" button
    Then I see "proposal-question-0-slug-0-content-en" in "proposal-content" container
    And I see a button "proposal-language-switch" with label "Voir l'original"
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "1"
    And The "proposal-language-switch" button on card "1" doesn't exist
