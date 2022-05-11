@widget @front
Feature: Demographic sequence card
  I want to see the demographic sequence card

  Scenario: Display demographic card and skip
    Given I monitor API "postTracking" requests
    And I am on the common sequence page of the question "question-0-slug"
    When I go to card "3" from card "1"
    Then current card is a demographic card
    And I see "skip demographics" button on card "3"
    And event "display-demographics" should be tracked by Make with parameters values:
      | name                | frontValue                                                                      | widgetValue                                                                     |
      | eventType           | trackCustom                                                                     | trackCustom                                                                     |
      | country             | FR                                                                              | FR                                                                              |
      | language            | fr                                                                              | fr                                                                              |
      | source              | core                                                                            | widget-test                                                                     |
      | location            | sequence                                                                        | widget                                                                          |
      | questionId          | question-0-id                                                                   | question-0-id                                                                   |
      | questionSlug        | question-0-slug                                                                 | question-0-slug                                                                 |
      | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                                       |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    When I click on "skip demographics" button
    Then current card is a proposal card
    And event "click-skip-demographics" should be tracked by Make with parameters values:
      | name                | frontValue                                                                      | widgetValue                                                                     |
      | eventType           | trackCustom                                                                     | trackCustom                                                                     |
      | country             | FR                                                                              | FR                                                                              |
      | language            | fr                                                                              | fr                                                                              |
      | source              | core                                                                            | widget-test                                                                     |
      | location            | sequence                                                                        | widget                                                                          |
      | questionId          | question-0-id                                                                   | question-0-id                                                                   |
      | questionSlug        | question-0-slug                                                                 | question-0-slug                                                                 |
      | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                                       |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    When I click on "previous card" of the current card
    Then progress bar is "3" on "15"
    And current card is a demographic card
    And I see "Merci pour votre réponse" in the current card
    And event "display-demographics-confirmation" should be tracked by Make with parameters values:
      | name                | frontValue                                                                      | widgetValue                                                                     |
      | eventType           | trackCustom                                                                     | trackCustom                                                                     |
      | country             | FR                                                                              | FR                                                                              |
      | language            | fr                                                                              | fr                                                                              |
      | source              | core                                                                            | widget-test                                                                     |
      | location            | sequence                                                                        | widget                                                                          |
      | questionId          | question-0-id                                                                   | question-0-id                                                                   |
      | questionSlug        | question-0-slug                                                                 | question-0-slug                                                                 |
      | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                                       |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    When I click on "demographic-continue-vote" button
    Then progress bar is "4" on "15"
    And event "click-vote-demographics" should be tracked by Make with parameters values:
      | name                | frontValue                                                                      | widgetValue                                                                     |
      | eventType           | trackCustom                                                                     | trackCustom                                                                     |
      | country             | FR                                                                              | FR                                                                              |
      | language            | fr                                                                              | fr                                                                              |
      | source              | core                                                                            | widget-test                                                                     |
      | location            | sequence                                                                        | widget                                                                          |
      | questionId          | question-0-id                                                                   | question-0-id                                                                   |
      | questionSlug        | question-0-slug                                                                 | question-0-slug                                                                 |
      | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                                       |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |

  Scenario: Submit demographic card
    Given I monitor API "postTracking" requests
    And I am on the common sequence page of the question "question-0-slug"
    When I go to card "3" from card "1"
    Then current card is a demographic card
    And I see "submit demographics" button on card "3"
    And the "submit demographics" button is disabled
    When I select a demographic value
    Then the "submit demographics" button is enabled
    When I click on "submit demographics" button
    Then progress bar is "4" on "15"
    And event "click-save-demographics" should be tracked by Make with parameters values:
      | name                | frontValue                                                                      | widgetValue                                                             |
      | eventType           | trackCustom                                                                     | trackCustom                                                             |
      | country             | FR                                                                              | FR                                                                      |
      | language            | fr                                                                              | fr                                                                      |
      | source              | core                                                                            | widget-test                                                             |
      | location            | sequence                                                                        | widget                                                                  |
      | questionId          | question-0-id                                                                   | question-0-id                                                           |
      | questionSlug        | question-0-slug                                                                 | question-0-slug                                                         |
      | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                               |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id         |
    When I click on "previous card" of the current card
    Then progress bar is "3" on "15"
    And I see "Merci pour votre réponse" in the current card
    And event "display-demographics-confirmation" should be tracked by Make with parameters values:
      | name                | frontValue                                                                      | widgetValue                                                             |
      | eventType           | trackCustom                                                                     | trackCustom                                                             |
      | country             | FR                                                                              | FR                                                                      |
      | language            | fr                                                                              | fr                                                                      |
      | source              | core                                                                            | widget-test                                                             |
      | location            | sequence                                                                        | widget                                                                  |
      | questionId          | question-0-id                                                                   | question-0-id                                                           |
      | questionSlug        | question-0-slug                                                                 | question-0-slug                                                         |
      | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                               |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id         |
    When I click on "demographic-continue-vote" button
    Then progress bar is "4" on "15"
    And event "click-vote-demographics" should be tracked by Make with parameters values:
      | name                | frontValue                                                                      | widgetValue                                                             |
      | eventType           | trackCustom                                                                     | trackCustom                                                             |
      | country             | FR                                                                              | FR                                                                      |
      | language            | fr                                                                              | fr                                                                      |
      | source              | core                                                                            | widget-test                                                             |
      | location            | sequence                                                                        | widget                                                                  |
      | questionId          | question-0-id                                                                   | question-0-id                                                           |
      | questionSlug        | question-0-slug                                                                 | question-0-slug                                                         |
      | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                               |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id         |

