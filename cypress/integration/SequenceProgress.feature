Feature: Progress and card position on sequence
  I want to see progression and track position 
  
  Scenario: Complete a sequence
    Given I monitor API "postTracking" requests
    And I am on the sequence page of the question "question-0-slug"
    Then card "1" is visible
    And card "1" is an intro card
    And progress bar is "1" on "16"
    When I click on "intro card start" of the current card
    Then card "2" is visible
    And card "2" is a proposal card
    And progress bar is "2" on "16"
    And The "next proposal" button on card "2" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "2"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "3" is visible
    And card "3" is a proposal card
    And progress bar is "3" on "16"
    And The "next proposal" button on card "3" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "3"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "4" is visible
    When I click on "skip demographics" of the current card
    Then card "5" is visible
    And card "5" is a proposal card
    And progress bar is "5" on "16"
    And The "next proposal" button on card "5" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "5"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "6" is visible
    And card "6" is a proposal card
    And progress bar is "6" on "16"
    And The "next proposal" button on card "6" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "6"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "7" is visible
    And card "7" is a proposal card
    And progress bar is "7" on "16"
    And The "next proposal" button on card "7" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "7"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | source              | core                                                                |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "8" is visible
    And card "8" is a proposal card
    And progress bar is "8" on "16"
    And The "next proposal" button on card "8" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "8"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | source              | core                                                                |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "9" is visible
    And card "9" is a push proposal card
    And progress bar is "9" on "16"
    And I see "push proposal next" button on card "9"
    When I click on "push proposal next" of the current card
    Then event "click-proposal-push-card-ignore" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | source              | core                                                                |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "10" is visible
    And card "10" is a proposal card
    And progress bar is "10" on "16"
    And The "next proposal" button on card "10" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "10"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | source              | core                                                                |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "11" is visible
    And card "11" is a proposal card
    And progress bar is "11" on "16"
    And The "next proposal" button on card "11" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "11"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "12" is visible
    And card "12" is a proposal card
    And progress bar is "12" on "16"
    And The "next proposal" button on card "12" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "12"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "13" is visible
    And card "13" is a proposal card
    And progress bar is "13" on "16"
    And The "next proposal" button on card "13" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "13"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "14" is visible
    And card "14" is a proposal card
    And progress bar is "14" on "16"
    And The "next proposal" button on card "14" doesn't exist
    When I vote "agree" on the current card
    And I qualify "likeIt" on the current card
    Then I see "next proposal" button on card "14"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "15" is visible
    And card "15" is a proposal card
    And progress bar is "15" on "16"
    And The "next proposal" button on card "15" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "15"
    When I click on "next proposal" of the current card
    Then event "click-sequence-last-proposal" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "16" is visible
    And card "16" is a final card
    And progress bar is "16" on "16"
    When I click on "previous card" of the current card
    Then event "click-sequence-previous-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "15" is visible
    When I click on "previous card" of the current card
    Then event "click-sequence-previous-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "14" is visible
    When I click on "previous card" of the current card
    And I see "likeIt" qualified proposal on the current card
    Then event "click-sequence-previous-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | location            | sequence                                                            |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection     |
    And card "13" is visible
    And I see "neutral" voted proposal on the current card
   