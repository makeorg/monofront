@front
Feature: results Page
  I want to check the Results page behaviour 
  Scenario: Track display Results page
    Given I monitor API "postTracking" requests
    When I go to the results page of the question "question-0-slug"
    Then event "display-page-results" should be tracked by Make with parameters values:
      | name                | value                                                               |
      | eventType           | trackCustom                                                         |
      | country             | FR                                                                  |
      | language            | fr                                                                  |
      | source              | core                                                                |
      | location            | page-results                                                        |
      | questionId          | question-0-id                                                          |
      | questionSlug        | question-0-slug                                                     |
      | referrer            | http://localhost:9009/__/                                           |
      | url                 | http://localhost:9009/FR/consultation/question-0-slug/results       |

  Scenario: Results page has canonical url
    Given I go to the results page of the question "question-0-slug"
    Then I see the canonical url "http://localhost:9009/FR/consultation/question-0-slug/results" of the page
  
  Scenario: I see all the sections of the page 
    Given I go to the results page of the question "question-0-slug"
    Then I see "Le contexte" in "context" container 
    And I see "top-ideas" container 
    And I see "La cartographie du débat" in "cartography" container 
    And I see "Les propositions les plus controversées" in "proposals-controversials" container 
    And I see "Les participants à la consultation" in "participants-chart" container 
