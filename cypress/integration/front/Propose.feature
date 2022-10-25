@front
Feature: Propose in panel
    I want to check propose Feature

    Scenario: I propose from participate page and decide to keep voting
        Given I go to "participate consultation" page of the question "question-0-slug"
        And I see "display propose panel" button
        When I click on "display propose panel" button
        Then I see "proposal_submit" container
        And the "proposal submit" button is disabled
        When I type "test" in field "proposal"
        Then the "proposal submit" button is enabled
        When I click on "proposal submit" button
        Then I see the "email register" button
        When I click on "email register" button
        And I register with email "emailValue@example.com" and password "TestMake"
        Then I see "Sign up with e-mail (2/2)" in "register-panel-title" container
        When I register with firstname "testfirstname" and age "36" and postal code "94120" and I accept the data policy before submitting
        And I see the "keep voting" button
        When I click on "keep voting" button
        Then I am on the common sequence page of the question "question-0-slug"

    Scenario: I propose from participate page and decide to keep proposing
        Given I go to "participate consultation" page of the question "question-0-slug"
        And I see "display propose panel" button
        When I click on "display propose panel" button
        Then I see "proposal_submit" container
        When I type "test" in field "proposal"
        And I click on "proposal submit" button
        Then I see the "email register" button
        When I click on "email register" button
        And I register with email "emailValue@example.com" and password "TestMake"
        And I register with firstname "testfirstname" and age "36" and postal code "94120" and I accept the data policy before submitting
        And I see the "keep proposing" button
        When I click on "keep proposing" button
        Then I see "proposal_submit" container

