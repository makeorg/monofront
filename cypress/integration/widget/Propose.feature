@widget
Feature: Propose in panel
    I want to check keep voting propose Feature

    Scenario: display propose panel
        Given I am on the sequence of the question "question-0-slug" with country "FR" and language "fr"
        And I don't see the "proposal_submit" container
        And The link "charte de modération" doesn't exist
        And I see "open propose panel" button
        When I click on "open propose panel" button
        Then I see "proposal_submit" container
        And I see a link "charte de modération" to "https://make.org/FR/moderation" in "proposal_submit" container
        And I see a button "proposal submit" in "proposal_submit" container with label "PROPOSER"
        And I see a "close panel" button
        When I click on "close panel" button
        Then I don't see the "proposal_submit" container

