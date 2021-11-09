@front
Feature: Intro card on sequence
  I want to disable intro card on sequence
  
  Scenario: display intro card
    Given I am on the sequence page of the question "question-0-slug"
    Then I see "Des milliers de citoyens proposent des solutions." in "intro-card-title" container
    And I see "Prenez position sur ces solutions & proposez les vôtres." in "intro-card-text-0" container
    And I see "Les meilleures détermineront nos actions." in "intro-card-text-1" container

  Scenario: Track start sequence after click on intro card button
    Given I monitor API "postTracking" requests
    And I am on the sequence page of the question "question-0-slug"
    When I click on "intro card start" button
    Then event "click-start-sequence" should be tracked by Make with parameters values:
      | name                | value                                                               |
      | eventType           | trackCustom                                                         |
      | country             | FR                                                                  |
      | language            | fr                                                                  |
      | source              | core                                                                |
      | location            | sequence                                                            |
      | questionId          | question-0-id                                                       |
      | questionSlug        | question-0-slug                                                     |
      | referrer            | http://localhost:9009/__/                                           |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "2" is visible
    And card "2" is a proposal card
    And progress bar is "2" on "16"

  Scenario: Disable intro card from query
    Given I am on the sequence page of the question "question-0-slug" with intro card disabled
    Then card "1" is visible
    And card "1" is a proposal card

  Scenario: Track vote with intro card disabled
    Given I monitor API "postTracking" requests
    And I am on the sequence page of the question "question-0-slug" with intro card disabled
    When I vote "agree" on the first proposal of sequence
    And event "click-sequence-first-vote" should be tracked by Make with parameters values:
    | name                | value                                                                               |
    | eventType           | trackCustom                                                                         |
    | card-position       | 0                                                                                   |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false     |
    And event "click-proposal-vote" should be tracked by Make with parameters values:
    | name                | value                                                                               |
    | eventType           | trackCustom                                                                         |
    | card-position       | 0                                                                                   |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false     |
