@front
Feature: Sequence popular
  I want to display a popular sequence
  
  Scenario: Track display on sequence
    Given I monitor API "postTracking" requests
    When I go to the sequence popular page of the question "question-0-slug"
    Then I see "Les propositions les plus populaires" in "main" container
    And event "display-sequence" should be tracked by Make with parameters values:
      | name                | value                                                                   |
      | eventType           | trackCustom                                                             |
      | country             | FR                                                                      |
      | language            | fr                                                                      |
      | source              | core                                                                    |
      | location            | sequence-popular                                                        |
      | questionId          | question-0-id                                                           |
      | questionSlug        | question-0-slug                                                         |
      | referrer            | http://localhost:9009/__/                                               |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection-popular |
    And event "display-intro-card" should be tracked by Make with parameters values:
      | name                | value                                                               |
      | eventType           | trackCustom                                                         |
      | source              | core                                                                |
      | location            | sequence-popular                                                    |
      | questionId          | question-0-id                                                       |
      | questionSlug        | question-0-slug                                                     |
      | country             | FR                                                                  |
      | language            | fr                                                                  |
    And event "click-start-sequence" should not be tracked by Make
