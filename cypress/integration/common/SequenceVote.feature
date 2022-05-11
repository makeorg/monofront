@widget @front
Feature: Vote on sequence
  I want to track votes 
  Scenario: Display vote buttons
    When I go to the common sequence page of the question "question-0-slug"
    Then card "1" is visible
    And I see vote buttons on card "1"
  Scenario: Vote agree
    Given I am on the common sequence page of the question "question-1-slug"
    And card "1" is visible
    When I vote "agree" on the current card
    Then I see agree qualifications buttons on card "1"
    And I see "next proposal" button on card "1"
  Scenario: Vote disagree
    Given I am on the common sequence page of the question "question-1-slug"
    And card "1" is visible
    When I vote "disagree" on the current card
    Then I see disagree qualifications buttons on card "1"
    And I see "next proposal" button on card "1"
  Scenario: Vote neutral
    Given I am on the common sequence page of the question "question-1-slug"
    And card "1" is visible
    When I vote "neutral" on the current card
    Then I see neutral qualifications buttons on card "1"
    And I see "next proposal" button on card "1"
  Scenario: Unvote voted and qualified proposal
     Given I am on the common sequence page of the question "question-1-slug"
     And card "1" is visible
     When I vote "agree" on the current card
     And I qualify "likeIt" on the current card
     Then "likeIt" qualification button is highlight on the current card
     When I unvote on the current card
     Then I see vote buttons on the current card
     And I don't see qualification buttons on the current card
     When I vote "agree" on the current card
     Then "likeIt" qualification button is not highlight on the current card
     When I qualify "likeIt" on the current card
     Then "likeIt" qualification button is highlight on the current card
     When I unqualify "likeIt" on the current card
     Then "likeIt" qualification button is not highlight on the current card
  Scenario: Track vote
    Given I monitor API "postVote" requests
    And I monitor API "postTracking" requests
    And I am on the common sequence page of the question "question-0-slug"
    And card "1" is visible
    When I vote "agree" on the current card
    Then some make data header should be sent to "postVote":  
    | name          | frontValue                                  | widgetValue                                 |
    | app-name      | main-front                                  | widget                                      |
    | source        | core                                        | widget-test                                 |
    | location      | sequence question-0-id                      | widget                                      |
    | language      | fr                                          | fr                                          |
    | country       | FR                                          | FR                                          |
    | question-id   | question-0-id                               | question-0-id                               |
    | referrer      | http://localhost:9009/__/                   | http://localhost:9008/__/                   |
    | custom-data   | null                                        | null                                        |
    And some make data header should be sent to "postTracking":
    | name          | frontValue                                  | widgetValue                                 |
    | app-name      | main-front                                  | widget                                      |
    | source        | core                                        | widget-test                                 |
    | location      | sequence question-0-id                      | widget                                      |
    | language      | fr                                          | fr                                          |
    | country       | FR                                          | FR                                          |
    | question-id   | question-0-id                               | question-0-id                               |
    | referrer      | http://localhost:9009/__/                   | http://localhost:9008/__/                   |
    | custom-data   | null                                        | null                                        |
    And event "click-sequence-first-vote" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | card-position       | 0                                                                               | 0                                                                   |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | nature              | agree                                                                           | agree                                                               |
    | proposalId          | proposal-question-0-slug-0-id                                                   | proposal-question-0-slug-first-id                                   |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id     |
    And event "click-proposal-vote" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | card-position       | 0                                                                               | 0                                                                   |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | nature              | agree                                                                           | agree                                                               |
    | proposalId          | proposal-question-0-slug-0-id                                                   | proposal-question-0-slug-first-id                                   |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id     |
    When I click on "next proposal" of the current card
    Then card "2" is visible
    And I vote "neutral" on the current card
    Then event "click-proposal-vote" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | card-position       | 1                                                                               | 1                                                                   |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | nature              | neutral                                                                         | neutral                                                             |
    | proposalId          | proposal-question-0-slug-1-id                                                   | proposal-question-0-slug-1-id                                       |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id     |
