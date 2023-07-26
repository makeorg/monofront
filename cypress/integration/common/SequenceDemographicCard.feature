@widget @front
Feature: Demographic sequence card
  I want to see the demographic sequence card


  Scenario: Display demographic binding mode cards
    Given I monitor API "postTracking" requests
    And I am on the common sequence page of the question "question-2-slug"
    When I go to card "14" from card "1"
    Then current card is a demographic binding mode intro card
    And event "display-intro-demographics" should be tracked by Make with parameters values:
      | name                | frontValue                                                                      | widgetValue                                                                     |
      | eventType           | trackCustom                                                                     | trackCustom                                                                     |
      | country             | FR                                                                              | FR                                                                              |
      | language            | fr                                                                              | fr                                                                              |
      | source              | core                                                                            | widget-test                                                                     |
      | location            | sequence                                                                        | widget                                                                          |
      | questionId          | question-2-id                                                                   | question-2-id                                                                   |
      | questionSlug        | question-2-slug                                                                 | question-2-slug                                                                 |
      | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                                       |
      | url                 | http://localhost:9009/FR/consultation/question-2-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-2-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    Then I see a button "demographics-intro-next" with label "Suivant"
    When I click on "demographics-intro-next" button
    Then progress bar is "15" on "18"
    And current card is a demographic card
    And I see "skip demographics" button on card "15"
    And event "display-demographics" should be tracked by Make with parameters values:
      | name                | frontValue                                                                      | widgetValue                                                                     |
      | eventType           | trackCustom                                                                     | trackCustom                                                                     |
      | country             | FR                                                                              | FR                                                                              |
      | language            | fr                                                                              | fr                                                                              |
      | source              | core                                                                            | widget-test                                                                     |
      | location            | sequence                                                                        | widget                                                                          |
      | questionId          | question-2-id                                                                   | question-2-id                                                                   |
      | questionSlug        | question-2-slug                                                                 | question-2-slug                                                                 |
      | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                                       |
      | url                 | http://localhost:9009/FR/consultation/question-2-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-2-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    When I click on "skip demographics" button
    Then current card is a demographic card
    And event "click-skip-demographics" should be tracked by Make with parameters values:
      | name                | frontValue                                                                      | widgetValue                                                                     |
      | eventType           | trackCustom                                                                     | trackCustom                                                                     |
      | country             | FR                                                                              | FR                                                                              |
      | language            | fr                                                                              | fr                                                                              |
      | source              | core                                                                            | widget-test                                                                     |
      | location            | sequence                                                                        | widget                                                                          |
      | questionId          | question-2-id                                                                   | question-2-id                                                                   |
      | questionSlug        | question-2-slug                                                                 | question-2-slug                                                                 |
      | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                                       |
      | url                 | http://localhost:9009/FR/consultation/question-2-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-2-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    When I click on "previous card" of the current card
    Then progress bar is "15" on "18"
    And current card is a demographic card
    And I see "Votre réponse a déjà été prise en compte." in the current card
    And event "display-demographics-confirmation" should be tracked by Make with parameters values:
      | name                | frontValue                                                                      | widgetValue                                                                     |
      | eventType           | trackCustom                                                                     | trackCustom                                                                     |
      | country             | FR                                                                              | FR                                                                              |
      | language            | fr                                                                              | fr                                                                              |
      | source              | core                                                                            | widget-test                                                                     |
      | location            | sequence                                                                        | widget                                                                          |
      | questionId          | question-2-id                                                                   | question-2-id                                                                   |
      | questionSlug        | question-2-slug                                                                 | question-2-slug                                                                 |
      | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                                       |
      | url                 | http://localhost:9009/FR/consultation/question-2-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-2-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    When I click on "demographic-continue-vote" button
    Then progress bar is "16" on "18"
    And event "click-vote-demographics" should be tracked by Make with parameters values:
      | name                | frontValue                                                                      | widgetValue                                                                     |
      | eventType           | trackCustom                                                                     | trackCustom                                                                     |
      | country             | FR                                                                              | FR                                                                              |
      | language            | fr                                                                              | fr                                                                              |
      | source              | core                                                                            | widget-test                                                                     |
      | location            | sequence                                                                        | widget                                                                          |
      | questionId          | question-2-id                                                                   | question-2-id                                                                   |
      | questionSlug        | question-2-slug                                                                 | question-2-slug                                                                 |
      | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                                       |
      | url                 | http://localhost:9009/FR/consultation/question-2-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-2-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    And I see "submit demographics" button on card "16"
    And the "submit demographics" button is disabled
    When I select a demographic value
    Then the "submit demographics" button is enabled
    When I click on "submit demographics" button
    Then progress bar is "17" on "18"
    And event "click-save-demographics" should be tracked by Make with parameters values:
      | name                | frontValue                                                                      | widgetValue                                                             |
      | eventType           | trackCustom                                                                     | trackCustom                                                             |
      | country             | FR                                                                              | FR                                                                      |
      | language            | fr                                                                              | fr                                                                      |
      | source              | core                                                                            | widget-test                                                             |
      | location            | sequence                                                                        | widget                                                                  |
      | questionId          | question-2-id                                                                   | question-2-id                                                           |
      | questionSlug        | question-2-slug                                                                 | question-2-slug                                                         |
      | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                               |
      | url                 | http://localhost:9009/FR/consultation/question-2-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-2-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id         |
    Then I select a demographic value
    And the "submit demographics" button is enabled
    Then I click on "submit demographics" button
    And progress bar is "18" on "18"
    And event "click-save-demographics" should be tracked by Make with parameters values:
      | name                | frontValue                                                                      | widgetValue                                                             |
      | eventType           | trackCustom                                                                     | trackCustom                                                             |
      | country             | FR                                                                              | FR                                                                      |
      | language            | fr                                                                              | fr                                                                      |
      | source              | core                                                                            | widget-test                                                             |
      | location            | sequence                                                                        | widget                                                                  |
      | questionId          | question-2-id                                                                   | question-2-id                                                           |
      | questionSlug        | question-2-slug                                                                 | question-2-slug                                                         |
      | referrer            | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                               |
      | url                 | http://localhost:9009/FR/consultation/question-2-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-2-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id         |
    Then I see "Merci d’avoir réagi aux propositions !" in "final-card-title" container
 

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
    And I see "Votre réponse a déjà été prise en compte." in the current card
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
    And I see "Votre réponse a déjà été prise en compte." in the current card
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

