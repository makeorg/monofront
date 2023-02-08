@widget @front
Feature: Report a proposal translation on sequence
  I want to report a proposal translation
  Scenario: Display panel
    Given I monitor API "postTracking" requests
    When I go to the common sequence page of the question "question-0-slug"
    Then card "1" is visible
    And I see "translation report" button on card "1"
    When I click on "translation report" button
    Then event "display-solution-options-panel" should be tracked by Make with parameters values:
      | name         | frontValue                                                                      | widgetValue                                                                                                                                     |
      | eventType    | trackCustom                                                                     | trackCustom                                                                                                                                     |
      | country      | FR                                                                              | FR                                                                                                                                              |
      | language     | fr                                                                              | fr                                                                                                                                              |
      | source       | core                                                                            | widget-test                                                                                                                                     |
      | location     | sequence                                                                        | widget                                                                                                                                          |
      | questionId   | question-0-id                                                                   | question-0-id                                                                                                                                   |
      | questionSlug | question-0-slug                                                                 | question-0-slug                                                                                                                                 |
      | referrer     | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                                                                                                       |
      | url          | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |
    And I see a button "show report form" in "report-first-step" container
    When I click on "show report form" button
    Then event "display-report-options" should be tracked by Make with parameters values:
      | name         | frontValue                                                                      | widgetValue                                                                                                                                     |
      | eventType    | trackCustom                                                                     | trackCustom                                                                                                                                     |
      | country      | FR                                                                              | FR                                                                                                                                              |
      | language     | fr                                                                              | fr                                                                                                                                              |
      | source       | core                                                                            | widget-test                                                                                                                                     |
      | location     | sequence                                                                        | widget                                                                                                                                          |
      | questionId   | question-0-id                                                                   | question-0-id                                                                                                                                   |
      | questionSlug | question-0-slug                                                                 | question-0-slug                                                                                                                                 |
      | referrer     | http://localhost:9009/__/                                                       | http://localhost:9008/__/                                                                                                                       |
      | url          | http://localhost:9009/FR/consultation/question-0-slug/selection?introCard=false | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id |

    And I see "Traduction incompréhensible" in "report-second-step" container
    And I see "Erreur dans la traduction" in "report-second-step" container
    And I see "Contient une information fausse" in "report-second-step" container
    And I see "Proposition offensante" in "report-second-step" container
    And I see a button "submit report" in "report-second-step" container
    When I click on "submit report" button
    Then I see "Merci pour le signalement !"
    And I see a button "close report confirmation" in "report-confirmation" container
    When I click on "close report confirmation" button
    Then I don't see the existing "report-confirmation" container