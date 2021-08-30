Feature: Sequence display
  I want to track display sequence 
  
  Scenario: Track display on sequence
    Given I monitor API "postTracking" requests
    When I go to the sequence page of the question "question-0-slug"
    Then event "display-sequence" should be tracked by Make with parameters values:
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
    And event "display-intro-card" should be tracked by Make with parameters values:
      | name                | value                                                               |
      | eventType           | trackCustom                                                         |
      | source              | core                                                                |
      | location            | sequence                                                            |
      | questionId          | question-0-id                                                       |
      | questionSlug        | question-0-slug                                                     |
      | country             | FR                                                                  |
      | language            | fr                                                                  |
    And event "click-start-sequence" should not be tracked by Make
  Scenario: Closed question redirect sequence to about page
    Given I go to "sequence" page of the question "question-10-slug"
    Then I see the "about" page