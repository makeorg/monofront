@front
Feature: Propose in panel
    I want to check keep voting propose Feature

    Scenario: I propose from participate page and decide to keep proposing
        Given I go to "participate consultation" page of the question "question-0-slug"
        And I see "display propose panel" button
        When I click on "display propose panel" button
        Then I see "proposal_submit" container
        When I type "test" in field "proposal"
        And I click on "proposal submit" button
        Then I see the "email register" button
        When I click on "email register" button
        And I register with email "emailValue@example.com" and password "TestMake1!"
        And I register with firstname "testfirstname" and age "37" and postal code "94120" and I accept the data policy before submitting
        And I see the "keep proposing" button
        When I click on "keep proposing" button
        Then I see "proposal_submit" container

