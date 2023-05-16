@widget @front
Feature: Propose on sequence
  I want to propose on sequence
  Scenario: display propose panel
    Given I am on the sequence of the question "question-0-slug" with country "FR" and language "fr"
    And I don't see the "proposal_submit" container
    And The link "charte de modération" doesn't exist
    And I see "open propose panel" button
    When I click on "open propose panel" button
    Then I see "proposal_submit" container
    And I see a link "charte de modération" to "/FR/moderation" in "proposal_submit" container
    And I see a button "proposal submit" in "proposal_submit" container with label "PROPOSER"
    And I see a "close panel" button
    When I click on "close panel" button
    Then I don't see the "proposal_submit" container

  Scenario: submit button activation
    Given I am on the sequence of the question "question-0-slug" with country "FR" and language "fr"
    When I click on "open propose panel" button
    Then I see "proposal_submit" container
    And the "proposal submit" button is disabled
    When I type "tes" in field "proposal"
    Then the "proposal submit" button is disabled
    When I type "t" in field "proposal"
    Then the "proposal submit" button is enabled

  Scenario: character counter
    Given I am on the sequence of the question "question-0-slug" with country "FR" and language "fr"
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

  Scenario: I propose with anonymous mode
    Given I monitor API "postTracking" requests
    When I go to the common sequence page of the question "question-1-slug"
    When I click on "open propose panel" button
    Then I see "proposal_submit" container
    And I see "switch" button
    Then I click on "switch" button
    When I type "test" in field "proposal"
    And I click on "proposal submit" button
    Then I click on "show-login-form" button
    And I see "Se connecter" in "login-panel-title" container
    When I login and submit a proposal in anonymous mode
    And event "display-proposal-submit-validation" should be tracked by Make with parameters values:
      | name         | frontValue                                                                      | widgetValue                                                                                                                                     |
      | eventType    | trackCustom                                                                     | trackCustom                                                                                                                                     |
      | country      | FR                                                                              | FR                                                                                                                                              |
      | language     | fr                                                                              | fr                                                                                                                                              |
      | source       | core                                                                            | widget-test                                                                                                                                     |
      | location     | sequence                                                                        | widget                                                                                                                                          |
      | questionId   | question-1-id                                                                   | question-1-id                                                                                                                                   |
      | questionSlug | question-1-slug                                                                 | question-1-slug                                                                                                                                 |
      | referrer     | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                                                                                                       |
      | url          | http://localhost:9009/FR/consultation/question-1-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-1-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    Then I see "anonymous-name" container
    And I see "anonymous-svg" svg

  Scenario: I propose from participate page and decide to keep voting
    Given I go to the common sequence page of the question "question-0-slug"
    When I click on "open propose panel" button
    Then I see "proposal_submit" container
    And the "proposal submit" button is disabled
    When I type "test" in field "proposal"
    Then the "proposal submit" button is enabled
    When I click on "proposal submit" button
    Then I see the "email register" button
    When I click on "email register" button
    And I register with email "emailValue@example.com" and password "TestMake1!"
    Then I see "S’inscrire par e-mail (2/2)" in "register-panel-title" container
    When I register with firstname "testfirstname" and age "37" and postal code "94120" and I accept the data policy before submitting
    And I see the "keep voting" button
    When I click on "keep voting" button
    Then I am on the common sequence page of the question "question-0-slug"
