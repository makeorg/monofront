@todo
Feature: Vote on sequence
  I want to track votes 
  Scenario: Display vote buttons
    Given I am on the sequence page of the question "question-0-slug"
    When I click on "intro card start" of the current card
    Then card "2" is visible
    And I see vote buttons on card "2"
  Scenario: Vote agree
    Given I am on the sequence page of the question "question-1-slug"
    When I click on "intro card start" of the current card
    Then card "2" is visible
    When I vote "agree" on the first proposal of sequence
    Then I see agree qualifications buttons on card "2"
    And total votes are equal to "6"
    And I see "next proposal" button on card "2"
  Scenario: Vote disagree
    Given I am on the sequence page of the question "question-1-slug"
    When I click on "intro card start" of the current card
    Then card "2" is visible
    When I vote "disagree" on the first proposal of sequence
    Then I see disagree qualifications buttons on card "2"
    And total votes are equal to "6"
    And I see "next proposal" button on card "2"
  Scenario: Vote neutral
    Given I am on the sequence page of the question "question-1-slug"
    When I click on "intro card start" of the current card
    Then card "2" is visible
    When I vote "neutral" on the first proposal of sequence
    Then I see neutral qualifications buttons on card "2"
    And total votes are equal to "7"
    And I see "next proposal" button on card "2"
  Scenario: Unvote voted and qualified proposal
     Given I am on the sequence page of the question "question-1-slug"
     When I click on "intro card start" of the current card
     Then card "2" is visible
     And I vote "agree" on the current card
     When I qualify "likeIt" on the current card
     Then "likeIt" qualification button is highlight on the current card
     When I unvote on the current card
     Then I see vote buttons on the current card
     And I don't see qualification buttons on the current card
     When I vote "agree" on the current card
     Then "likeIt" qualification button is not highlight on the current card
     When I qualify "likeIt" on the current card
     Then "likeIt" qualification button is highlight on the current card
     And total "likeIt" qualifications are equal to "10" on the current card
     When I unqualify "likeIt" on the current card
     Then "likeIt" qualification button is not highlight on the current card
  Scenario: Track vote
    Given I monitor API "postVote" requests
    And I monitor API "postTracking" requests
    And I am on the sequence page of the question "question-0-slug"
    When I click on "intro card start" of the current card
    Then card "2" is visible
    
    When I vote "agree" on the first proposal of sequence
    Then some make data header should be sent to "postVote":  
    | name          | value                                       |
    | app-name      | main-front                                  |
    | source        | core                                        |
    | location      | sequence question-0-id                      |
    | language      | fr                                          |
    | country       | FR                                          |
    | question-id   | question-0-id                               |
    | referrer      | http://localhost:9009/__/                   |
    | custom-data   |                                             |
    And some make data header should be sent to "postTracking":
    | name          | value                                       |
    | app-name      | main-front                                  |
    | source        | core                                        |
    | location      | sequence question-0-id                      |
    | language      | fr                                          |
    | country       | FR                                          |
    | question-id   | question-0-id                               |
    | referrer      | http://localhost:9009/__/                   |
    | custom-data   |                                             |
    And event "click-sequence-first-vote" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | card-position       | 1                                                                   |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | nature              | agree                                                               |
    | proposalId          | proposal-question-0-slug-0-id                                       |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And event "click-proposal-vote" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | card-position       | 1                                                                   |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | nature              | agree                                                               |
    | proposalId          | proposal-question-0-slug-0-id                                       |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    When I click on "next proposal" of the current card
    Then card "2" is visible
    And I vote "neutral" on the current card
    Then event "click-proposal-vote" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | card-position       | 2                                                                   |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | nature              | neutral                                                             |
    | proposalId          | proposal-question-0-slug-1-id                                       |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
