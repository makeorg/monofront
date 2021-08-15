Feature: The footer
  I want to check footer component

  Scenario: Footer is present in all pages
    Given I go to "homepage"
    Then I see "footer" container
    When I go to "sequence" page of the question "question-3-slug"
    Then I see "footer" container
    When I go to "data policy"
    Then I see "footer" container
    When I go to "browse consultations"
    Then I see "footer" container
    When I go to "browse results"
    Then I see "footer" container
    When I go to "top idea" page of the question "question-1-slug"
    Then I see "footer" container
    When I go to 404 FR page
    Then I see "footer" container
    When I go to 404 page
    Then The "footer" container doesn't exist
  
  Scenario: French Mobile Footer is complete
    Given I go to "france homepage"
    Then I see an external link "Espace presse" to "https://about.make.org/les-medias-en-parlent" in "footer" container
    And I see an external link "Fonds de dotation Make.org" to "https://foundation.make.org" in "footer" container
    And I see a link "Contact" to "/FR/contact" in "footer" container
    And I see a link "Mentions légales" to "/FR/mentions-legales" in "footer" container
    And I see a link "Conditions d'utilisation" to "/FR/conditions-dutilisation" in "footer" container
    And I see a link "Politique de données" to "/FR/politique-donnees" in "footer" container
    And I see a link "Déclaration d'accessibilité" to "/FR/declaration-accessibilite" in "footer" container
    And I see a link "Gestion des cookies" to "/FR/cookies" in "footer" container
    And I see "Changer de pays" in "footer" container

  Scenario: Foreign Mobile Footer is complete
    Given I go to "british homepage"
    Then I see a link "Legal notice" to "/GB/legal-mentions" in "footer" container
    And I see a link "Terms of use" to "/GB/terms-of-use" in "footer" container
    And I see a link "Data use policy" to "/GB/data-terms" in "footer" container
    And I see a link "Use of cookies" to "/GB/cookies" in "footer" container
    And I see "Change country" in "footer" container
    And I see a link "Contact" to "/GB/contact" in "footer" container
