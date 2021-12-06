@widget
Feature: Load first proposal on sequence
I want to check first proposal on widget sequence

Scenario: display first proposal with specific endpoint and progress in sequence first cards
  Given I monitor API "postTracking" requests
  And I am on the first card of sequence of the question "question-0-slug" with country "FR" and language "fr"
  Then card "1" is visible
  And card "1" is a proposal card
  When I vote "neutral" on the current card
  Then I see "next proposal" button on card "1"
  When I click on "next proposal" button    
  Then event "click-sequence-first-vote" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | card-position       | 0                                                                   |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | source              | widget-test                                                         |
    | location            | widget                                                              |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id|
  Then card "2" is visible
  And card "2" is a proposal card  
  When I vote "neutral" on the current card
  Then I see "next proposal" button on card "2"
  When I click on "next proposal" button    
  Then event "click-sequence-next-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | source              | widget-test                                                         |
    | location            | widget                                                              |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id|
  Then card "3" is visible
  When I click on "previous card" of the current card
  Then event "click-sequence-previous-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | source              | widget-test                                                         |
    | location            | widget                                                              |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id|
  And card "2" is visible
  When I click on "previous card" of the current card
  Then event "click-sequence-previous-card" should be tracked by Make with parameters values:
    | name                | value                                                               |
    | eventType           | trackCustom                                                         |
    | country             | FR                                                                  |
    | language            | fr                                                                  |
    | source              | widget-test                                                         |
    | location            | widget                                                              |
    | questionId          | question-0-id                                                       |
    | questionSlug        | question-0-slug                                                     |
    | referrer            | http://localhost:9008/__/                                           |
    | url                 | http://localhost:9008/?questionSlug=question-0-slug&source=widget-test&country=FR&language=fr&widgetId=fake-widget-questionid&hash=fake-hash-id|
  And card "1" is visible

Scenario: start sequence with include neutral proposal of first card
  Given I am on the first card of sequence of the question "question-0-slug" with country "FR" and language "fr"
  Then I vote "neutral" on the current card
  Then I see neutral qualifications buttons on card "1"
  Then I see "next proposal" button on card "1"
  When I click on "next proposal" button    
  Then card "2" is visible
  When I click on "previous card" of the current card
  Then I see neutral qualifications buttons on card "1"