@widget @front
Feature: Progress and card position on sequence
  I want to see progression and track position 
  
  Scenario: Complete a sequence
    Given I monitor API "postTracking" requests
    And I am on the common sequence page of the question "question-0-slug"
    Then card "1" is visible
    And card "1" is a proposal card
    And progress bar is "1" on "15"
    And The "next proposal" button on card "1" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "1"
    When I click on "next proposal" of the current card
    Then card "2" is visible
    And I see "anonymous-name" container
    And I see "anonymous-svg" svg
    And card "2" is a proposal card
    And progress bar is "2" on "15"
    And The "next proposal" button on card "2" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "2"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    And card "3" is visible
    And progress bar is "3" on "15"
    When I click on "skip demographics" of the current card
    Then card "4" is visible
    And card "4" is a proposal card
    And progress bar is "4" on "15"
    And The "next proposal" button on card "4" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "4"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    And card "5" is visible
    And I see "anonymous-name" container
    And I see "anonymous-svg" svg
    And card "5" is a proposal card
    And progress bar is "5" on "15"
    And The "next proposal" button on card "5" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "5"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    And card "6" is visible
    And card "6" is a proposal card
    And progress bar is "6" on "15"
    And The "next proposal" button on card "6" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "6"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    And card "7" is visible
    And I see "anonymous-name" container
    And I see "anonymous-svg" svg
    And card "7" is a proposal card
    And progress bar is "7" on "15"
    And The "next proposal" button on card "7" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "7"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |    
    And card "8" is visible
    And card "8" is a push proposal card
    And progress bar is "8" on "15"
    And I see "push proposal next" button on card "8"
    When I click on "push proposal next" of the current card
    Then event "click-proposal-push-card-ignore" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | source              | core                                                                            | widget-test                                                                |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    And card "9" is visible
    And card "9" is a proposal card
    And progress bar is "9" on "15"
    And The "next proposal" button on card "9" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "9"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | source              | core                                                                            | widget-test                                                                |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    And card "10" is visible
    And I see "anonymous-name" container
    And I see "anonymous-svg" svg
    And card "10" is a proposal card
    And progress bar is "10" on "15"
    And The "next proposal" button on card "10" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "10"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | source              | core                                                                            | widget-test                                                                |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    And card "11" is visible
    And card "11" is a proposal card
    And progress bar is "11" on "15"
    And The "next proposal" button on card "11" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "11"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | source              | core                                                                            | widget-test                                                                |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    And card "12" is visible
    And I see "anonymous-name" container
    And I see "anonymous-svg" svg
    And card "12" is a proposal card
    And progress bar is "12" on "15"
    And The "next proposal" button on card "12" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "12"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    And card "13" is visible
    And card "13" is a proposal card
    And progress bar is "13" on "15"
    And The "next proposal" button on card "13" doesn't exist
    When I vote "agree" on the current card
    Then I see "next proposal" button on card "13"
    When I qualify "likeIt" on the current card
    And I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    And card "14" is visible
    And I see "anonymous-name" container
    And I see "anonymous-svg" svg
    And card "14" is a proposal card
    And progress bar is "14" on "15"
    And The "next proposal" button on card "14" doesn't exist
    When I vote "neutral" on the current card
    Then I see "next proposal" button on card "14"
    When I click on "next proposal" of the current card
    Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    And card "15" is visible
    And card "15" is a final card
    And progress bar is "15" on "15"
    When I click on "previous card" of the current card
    Then event "click-sequence-previous-card" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    And card "14" is visible
    And I see "anonymous-name" container
    And I see "anonymous-svg" svg
    When I click on "previous card" of the current card
    Then event "click-sequence-previous-card" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    And card "13" is visible
    And I see "likeIt" qualified proposal on the current card
    When I click on "previous card" of the current card
    Then event "click-sequence-previous-card" should be tracked by Make with parameters values:
    | name                | frontValue                                                                      | widgetValue                                                         |
    | eventType           | trackCustom                                                                     | trackCustom                                                         |
    | country             | FR                                                                              | FR                                                                  |
    | language            | fr                                                                              | fr                                                                  |
    | location            | sequence                                                                        | widget                                                              |
    | questionId          | question-0-id                                                                   | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                                 | question-0-slug                                                     |
    | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    And card "12" is visible
    And I see "anonymous-name" container
    And I see "anonymous-svg" svg
    And I see "neutral" voted proposal on the current card
   