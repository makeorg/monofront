@front
Feature: Accessibility
  I want to check accessibility

  Scenario: Check HTML validity of Accesssibility declaration page
  Given I go to "accessibility declaration"
  Then html page should be valid

  Scenario: Check HTML validity of Home page
  Given I go to "france homepage"
  Then html page should be valid
  When I click on "mobile-header-menu" button
  Then html page should be valid
  When I click on "mobile-header-close-menu" button
  And I click on "mobile-search" button
  Then html page should be valid
  And I click on "country-switch-modal" button
  Then html page should be valid

  Scenario: Check HTML validity of sequence page
  Given I am on the sequence page of the question "question-0-slug" with intro card disabled
  Then html page should be valid
  When I go to card "2" from card "1"
  Then html page should be valid
  When I go to card "4" from card "2"
  Then html page should be valid
  When I go to card "5" from card "4"
  Then html page should be valid

  Scenario: Check HTML validity of browse consultations
  Given I go to "browse consultations"
  Then html page should be valid

  Scenario: Check HTML validity of general terms of use
  Given I go to "general terms of use"
  Then html page should be valid

  Scenario: Check HTML validity of data policy
  Given I go to "data policy"
  Then html page should be valid

  #Scenario: Check HTML validity of results
  #Given I go to "results" page of the question ""
  #Then html page should be valid

  Scenario: Check HTML validity of browse results
  Given I go to "browse results"
  Then I see "Découvrez les résultats" in "main" container
  And html page should be valid

  #Scenario: Check HTML validity of top idea
  #Given I go to "top idea" page of the question "question-0-slug"
  #Then html page should be valid

  Scenario: Check HTML validity of search
  Given I go to "search"
  Then html page should be valid

  Scenario: Check HTML validity of participate consultation
  Given I go to "participate consultation" page of the question "question-0-slug"
  Then I see "question-0 Quis autem vel eum iure reprehenderit qui in ea voluptate velit ?" in "main" container
  And html page should be valid

  Scenario: Check HTML validity of explore consultation
  Given I go to "explore consultation" page of the question "question-0-slug"
  Then I see "question-0 Quis autem vel eum iure reprehenderit qui in ea voluptate velit ?" in "main" container
  Then html page should be valid

  Scenario: Check HTML validity of legal mentions
  Given I go to "legal mentions"
  Then html page should be valid

  Scenario: Check HTML validity of profile page
  Given I go to "france homepage"
  And I login with email "test@example.com" and password "abcdefgh"
  When I go to "profile proposals"
  Then I see "Mes dernières propositions" in "main" container
  And html page should be valid
  When I go to "profile favourites"
  Then I see "Mes coups de cœur" in "main" container
  Then html page should be valid
