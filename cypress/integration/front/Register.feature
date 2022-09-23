@front
Feature: Register
  I want to check register panel behaviour

  Scenario: Check register panel and tracking
    Given I monitor API "postTracking" requests
    When I go to "france homepage"
    Then I see a button "login" in "header" container
    When I click on "login" button
    Then I see a button "register" in "authentication" container
    When I click on "register" button
    Then I see "S’inscrire par e-mail (1/2)" in "register-panel-title" container
    And event "display-signup-form" should be tracked by Make with parameters values:
      | name                | value                                                               |
      | eventType           | trackCustom                                                         |
      | country             | FR                                                                  |
      | language            | fr                                                                  |
      | source              | core                                                                |
      | location            | homepage                                                            |
      | questionId          |                                                                     |
      | questionSlug        |                                                                     |
      | referrer            | http://localhost:9009/__/                                           |
      | url                 | http://localhost:9009/FR                                            |
      | step                | 1                                                                  |

  Scenario: Check register form submission and tracking
    Given I monitor API "postTracking" requests
    When I go to "france homepage"
    Then I click on "login" button
    And I click on "register" button
    Then I see the register form
    When I register with email "emailValue@example.com" and password "TestMake"
    Then I see "S’inscrire par e-mail (2/2)" in "register-panel-title" container
    When I register with firstname "testfirstname" and age "36" and postal code "94120" and I accept the data policy before submitting
    Then I see "Bienvenue testfirstname !" in "register-confirmation-panel-title" container
    And I see "emailValue@example.com" in "register-confirmation-panel-mail" container
    Then register form is closed
    Then event "signup-email-success" should be tracked by Make with parameters values:
      | name                | value                                                               |
      | eventType           | trackCustom                                                         |
      | country             | FR                                                                  |
      | language            | fr                                                                  |
      | source              | core                                                                |
      | location            | homepage                                                            |
      | questionId          |                                                                     |
      | questionSlug        |                                                                     |
      | referrer            | http://localhost:9009/__/                                           |
      | url                 | http://localhost:9009/FR                                           |

  Scenario: Check inputs validity on FR page
    Given I go to "france homepage"
    Then I click on "login" button
    And I click on "register" button
    Then I see the register form
    When I register with an invalid email "aaaa" 
    Then The field "email" should be invalid
    When I register with a missing password
    Then The field "password" should be empty
    Then I clear the "email" field
    Then I clear the "password" field
    When I register with email "emailValue@example.com" and password "TestMake"
    Then I see "S’inscrire par e-mail (2/2)" in "register-panel-title" container
    When I register with a missing firstname
    Then The field "firstname" should be invalid
    When I register with a missing age
    Then The field "age" should be invalid
    When I register with an invalid postal code
    Then The field "postalcode" should be invalid
    When I register with a missing data policy
    Then The register checkbox should be empty 

  Scenario: Check legal consent for age input
    Given I go to "france homepage"
    Then I click on "login" button
    And I click on "register" button
    Then I see the register form
    When I register with email "emailValue@example.com" and password "TestMake"
    Then I see "S’inscrire par e-mail (2/2)" in "register-panel-title" container
    When I register as minor 
    Then I see the legal consent form
    When I check the "legalMinorConsent" checkbox
    Then the "legal_consent" button is disabled
    When I uncheck the "legalMinorConsent" checkbox
    And I check the "legalAdvisorApproval" checkbox
    Then the "legal_consent" button is disabled
    When I uncheck the "legalAdvisorApproval" checkbox
    When I check both legalMinorConsent and legalAdvisorApproval checkboxes
    Then the "legal_consent" button is enabled
  
  Scenario: Check register in FR without completed postal code
    When I go to "france homepage"
    Then I click on "login" button
    And I click on "register" button
    Then I see the register form
    When I register with email "emailValue@example.com" and password "TestMake"
    Then I see "S’inscrire par e-mail (2/2)" in "register-panel-title" container
    When I register with firstname "testfirstname" and age "36" and postal code "" and I accept the data policy before submitting
    Then I see "Bienvenue testfirstname !" in "register-confirmation-panel-title" container

  Scenario: Register with valid and invalid postal code on DE page
    When I go to "german homepage" with a browser language "de"
    Then I click on "login" button
    And I click on "register" button
    Then I see the register form
    When I register with email "emailValue@example.com" and password "TestMake"
    Then I see "Registrieren bei E-Mail (2/2)" in "register-panel-title" container
    When I register with an invalid postal code
    Then The field "postalcode" should be invalid
    Then I clear the "firstname" field
    Then I clear the "age" field
    Then I clear the "postalcode" field
    When I register with firstname "testfirstname" and age "36" and postal code "94120" and I accept the data policy before submitting
    Then I see "Herzlich willkommen testfirstname !" in "register-confirmation-panel-title" container

  Scenario: Check register in DE without completed postal code
    When I go to "german homepage" with a browser language "de"
    Then I click on "login" button
    And I click on "register" button
    Then I see the register form
    When I register with email "emailValue@example.com" and password "TestMake"
    Then I see "Registrieren bei E-Mail (2/2)" in "register-panel-title" container
    When I register with firstname "testfirstname" and age "36" and postal code "" and I accept the data policy before submitting
    Then I see "Herzlich willkommen testfirstname !" in "register-confirmation-panel-title" container

  Scenario: Check postal code is not displayed on GB page
    When I go to "british homepage" with a browser language "en"
    Then I click on "login" button
    And I click on "register" button
    Then I see the register form
    When I register with email "emailValue@example.com" and password "TestMake"
    Then I don't see the "postalcode" field