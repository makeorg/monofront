@front
Feature: Demographic sequence card
  I want to see the demographic sequence card 
  
  Scenario: Display demographic card and skip
    Given I monitor API "postTracking" requests
    And I am on the sequence page of the question "question-0-slug"
    When I go to card "4"
    Then current card is a demographic card
    And I see "skip demographics" button on card "4"
    And event "display-demographics" should be tracked by Make with parameters values:
      | name                | value                                                                   |
      | eventType           | trackCustom                                                             |
      | country             | FR                                                                      |
      | language            | fr                                                                      |
      | source              | core                                                                    |
      | location            | sequence                                                                |
      | questionId          | question-0-id                                                           |
      | questionSlug        | question-0-slug                                                         |
      | referrer            | http://localhost:9009/__/                                               |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection         |
    When I click on "skip demographics" button
    Then current card is a proposal card
    And event "click-skip-demographics" should be tracked by Make with parameters values:
      | name                | value                                                                   |
      | eventType           | trackCustom                                                             |
      | country             | FR                                                                      |
      | language            | fr                                                                      |
      | source              | core                                                                    |
      | location            | sequence                                                                |
      | questionId          | question-0-id                                                           |
      | questionSlug        | question-0-slug                                                         |
      | referrer            | http://localhost:9009/__/                                               |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection         |
    When I click on "previous card" of the current card
    Then progress bar is "4" on "16"
    And current card is a demographic card
    And I see "Merci pour votre réponse" in the current card
    And event "display-demographics-confirmation" should be tracked by Make with parameters values:
      | name                | value                                                                   |
      | eventType           | trackCustom                                                             |
      | country             | FR                                                                      |
      | language            | fr                                                                      |
      | source              | core                                                                    |
      | location            | sequence                                                                |
      | questionId          | question-0-id                                                           |
      | questionSlug        | question-0-slug                                                         |
      | referrer            | http://localhost:9009/__/                                               |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection         |
    When I click on "demographic-continue-vote" button
    Then progress bar is "5" on "16"
    And event "click-vote-demographics" should be tracked by Make with parameters values:
      | name                | value                                                                   |
      | eventType           | trackCustom                                                             |
      | country             | FR                                                                      |
      | language            | fr                                                                      |
      | source              | core                                                                    |
      | location            | sequence                                                                |
      | questionId          | question-0-id                                                           |
      | questionSlug        | question-0-slug                                                         |
      | referrer            | http://localhost:9009/__/                                               |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection         |

  Scenario: Submit demographic card
    Given I monitor API "postTracking" requests
    And I am on the sequence page of the question "question-0-slug"
    When I go to card "4"    
    Then current card is a demographic card
    And I see "submit demographics" button on card "4"
    And the "submit demographics" button is disabled
    When I select a demographic value
    Then the "submit demographics" button is enabled
    When I click on "submit demographics" button
    Then progress bar is "5" on "16"
    And event "click-save-demographics" should be tracked by Make with parameters values:
      | name                | value                                                                   |
      | eventType           | trackCustom                                                             |
      | country             | FR                                                                      |
      | language            | fr                                                                      |
      | source              | core                                                                    |
      | location            | sequence                                                                |
      | questionId          | question-0-id                                                           |
      | questionSlug        | question-0-slug                                                         |
      | referrer            | http://localhost:9009/__/                                               |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection         |
    When I click on "previous card" of the current card
    Then progress bar is "4" on "16"
    And I see "Merci pour votre réponse" in the current card
    And event "display-demographics-confirmation" should be tracked by Make with parameters values:
      | name                | value                                                                   |
      | eventType           | trackCustom                                                             |
      | country             | FR                                                                      |
      | language            | fr                                                                      |
      | source              | core                                                                    |
      | location            | sequence                                                                |
      | questionId          | question-0-id                                                           |
      | questionSlug        | question-0-slug                                                         |
      | referrer            | http://localhost:9009/__/                                               |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection         |
    When I click on "demographic-continue-vote" button
    Then progress bar is "5" on "16"
    And event "click-vote-demographics" should be tracked by Make with parameters values:
      | name                | value                                                                   |
      | eventType           | trackCustom                                                             |
      | country             | FR                                                                      |
      | language            | fr                                                                      |
      | source              | core                                                                    |
      | location            | sequence                                                                |
      | questionId          | question-0-id                                                           |
      | questionSlug        | question-0-slug                                                         |
      | referrer            | http://localhost:9009/__/                                               |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/selection         |


  Scenario: Authenticate on demographic card
    Given I monitor API "postTracking" requests
    And I am on the sequence page of the question "question-0-slug"
    When I go to card "4"    
    Then current card is a demographic card
    When I login with email "test@example.com" and password "abcdefgh"
    Then current card is a demographic card
    And progress bar is "4" on "16"

  Scenario: Don't display demographic card if cookie is set
    Given I have already answered to the demographics card and the cookie is set
    And I am on the sequence page of the question "question-0-slug"
    When I go to card "4"    
    Then card "4" is a proposal card
    And progress bar is "4" on "15"

    
    


