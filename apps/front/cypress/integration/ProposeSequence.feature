Feature: Propose on sequence
  I want to propose on sequence
  Scenario: display propose panel
    Given I am on the sequence page of the question "question-0-slug"
    And The "proposal_submit" container doesn't exist
    And The link "En savoir plus sur notre charte de modération" doesn't exist
    And I see "open propose panel" button
    When I click on "open propose panel" button
    Then I see "proposal_submit" container
    And I see a link "En savoir plus sur notre charte de modération" to "https://about.make.org/moderation" in "proposal_submit" container
    And I see a button "cancel proposal form" in "proposal_submit" container with label "Annuler et continuer à voter"
    And I see a button "proposal submit" in "proposal_submit" container with label "Valider"
    And I see a "close panel" button
    When I click on "cancel proposal form" button
    Then The "proposal_submit" container doesn't exist

  Scenario: submit button activation
    Given I am on the sequence page of the question "question-0-slug"
    When I click on "open propose panel" button
    Then I see "proposal_submit" container
    And the "proposal submit" button is disabled
    When I type "tes" in field "proposal"
    Then the "proposal submit" button is disabled
    When I type "t" in field "proposal"
    Then the "proposal submit" button is enabled

  Scenario: character counter
    Given I am on the sequence page of the question "question-0-slug"
    When I click on "open propose panel" button
    Then I see "char-count" container
    And I see "8 / 140" in "char-count" container
    When I type "tes" in field "proposal"
    Then I see "11 / 140" in "char-count" container
    When I type "t" in field "proposal"
    Then I see "12 / 140" in "char-count" container
    When I type "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada neque nisl, quis bibendum augue fringilla in. Quisquevitae fusce" in field "proposal"
    Then I see "140 / 140" in "char-count" container
    And I see "^Il faut testLorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam malesuada neque nisl, quis bibendum augue fringilla in. Quisquev$" in field "proposal"