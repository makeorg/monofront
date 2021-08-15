Feature: Empty sequence
  I want to display an empty standard sequence
  
  Scenario: No proposals card in sequence
    Given I monitor API "postTracking" requests
    When I go to the sequence page of the question "question-5-slug"
    Then I see "Merci pour votre incroyable contribution !" in "main" container
    And event "display-sequence" should be tracked by Make with parameters values:
      | name                | value                                                                   |
      | eventType           | trackCustom                                                             |
      | country             | FR                                                                      |
      | language            | fr                                                                      |
      | source              | core                                                                    |
      | location            | sequence                                                                |
      | questionId          | question-5-id                                                           |
      | questionSlug        | question-5-slug                                                         |
      | referrer            | http://localhost:9009/__/                                               |
      | url                 | http://localhost:9009/FR/consultation/question-5-slug/selection         |
    And event "display-proposal-null" should be tracked by Make with parameters values:
      | name                | value                                                                   |
      | eventType           | trackCustom                                                             |
      | source              | core                                                                    |
      | location            | sequence                                                                |
      | questionId          | question-5-id                                                           |
      | questionSlug        | question-5-slug                                                         |
      | country             | FR                                                                      |
      | language            | fr                                                                      |
    And event "click-start-sequence" should not be tracked by Make
    When I click on "go-participate-page" link
    Then I see the "participate consultation" page of the question "question-5-slug"