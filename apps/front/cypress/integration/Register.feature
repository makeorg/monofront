Feature: Register
  I want to check register modal behaviour

  Scenario: Check register modal and tracking
    Given I monitor API "postTracking" requests
    When I go to "france homepage"
    Then I see a button "login" in "header" container
    When I click on "login" button
    Then I see a button "register" in "authentication" container
    When I click on "register" button
    Then I see "Créer un compte" in "register-modal-title" container
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
      | url                 | http://localhost:9009/FR                                           |

  Scenario: Check register form submission and tracking
    Given I monitor API "postTracking" requests
    When I go to "france homepage"
    Then I click on "login" button
    And I click on "register" button
    Then I see the register form
    When I register with email "unique@example.com" and password "TestMake" and firstname "testfirstname" and age "35" and I accept the data policy before submitting
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

  Scenario: Check inputs validity
    Given I go to "france homepage"
    Then I click on "login" button
    And I click on "register" button
    Then I see the register form
    When I register with an invalid email "aaaa" 
    Then The field "email" should be invalid
    When I register with a missing password
    Then The field "password" should be empty
    When I register with a missing firstname
    Then The field "firstname" should be empty
    When I register with a missing age
    Then The field "age" should be empty
    When I register with a missing data policy
    Then The register checkbox should be empty 

  Scenario: Check legal consent for age input
    Given I go to "france homepage"
    Then I click on "login" button
    And I click on "register" button
    Then I see the register form
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