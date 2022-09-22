@front
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
    Then I see "footer" container
  
  Scenario: French Mobile Footer is complete
    Given I go to "france homepage"
    Then I see an external link "Espace presse" to "https://about.make.org/les-medias-en-parlent" in "footer" container
    And I see an external link "Fonds de dotation Make.org" to "https://foundation.make.org" in "footer" container
    And I see an external link "Charte de modération" to "https://about.make.org/moderation" in "footer" container
    And I see a link "Contact" to "/FR/contact" in "footer" container
    And I see a link "Mentions légales" to "/FR/mentions-legales" in "footer" container
    And I see a link "Conditions d'utilisation" to "/FR/conditions-dutilisation" in "footer" container
    And I see a link "Politique de données" to "/FR/politique-donnees" in "footer" container
    And I see a link "Déclaration d'accessibilité" to "/FR/declaration-accessibilite" in "footer" container
    And I see a link "Gestion des cookies" to "/FR/cookies" in "footer" container
    And I see a link "Conditions d'utilisation" to "/FR/conditions-dutilisation" in "footer" container
    And I see a link "Politique de données" to "/FR/politique-donnees" in "footer" container
    And I see a link "Déclaration d'accessibilité" to "/FR/declaration-accessibilite" in "footer" container
    And I see a link "Gestion des cookies" to "/FR/cookies" in "footer" container
    And I see "France" in "footer" container

  Scenario: English Mobile Footer is complete
    Given I go to "british homepage" from Great Britain
    Then I see an external link "Moderation charter" to "https://about.make.org/en/moderation" in "footer" container
    And I see a link "Legal notice" to "/GB/legal-mentions" in "footer" container
    And I see a link "Terms of use" to "/GB/terms-of-use" in "footer" container
    And I see a link "Data use policy" to "/GB/data-terms" in "footer" container
    And I see a link "Use of cookies" to "/GB/cookies" in "footer" container
    And I see a link "Contact" to "/GB/contact" in "footer" container
    And I see "Great Britain" in "footer" container

  Scenario: German Mobile Footer is complete
    Given I go to "german homepage" from Germany
    Then I see an external link "Moderationscharta" to "https://about.make.org/de/moderation-charter" in "footer" container
    And I see a link "Impressum" to "/DE/impressum" in "footer" container
    And I see a link "Nutzungsbedingungen" to "/DE/nutzungsbedingungen" in "footer" container
    And I see a link "Datenschutzerklärung" to "/DE/datenschutzerklärung" in "footer" container
    And I see a link "Barrierefreiheit" to "/DE/barrierefreiheit" in "footer" container
    And I see a link "Cookie-Richtlinie" to "/DE/cookies" in "footer" container
    And I see a link "Kontakt" to "/DE/kontakt" in "footer" container
    And I see "Deutschland" in "footer" container

  Scenario: French Mobile Footer in english
    Given I go to "france homepage" with a browser language "en"
    Then I see an external link "Press" to "https://about.make.org/les-medias-en-parlent" in "footer" container
    And I see an external link "Endowment fund" to "https://foundation.make.org" in "footer" container
    And I see an external link "Moderation charter" to "https://about.make.org/moderation" in "footer" container
    And I see a link "Contact" to "/FR/contact" in "footer" container
    And I see a link "Legal notice" to "/FR/mentions-legales" in "footer" container
    And I see a link "Terms of use" to "/FR/conditions-dutilisation" in "footer" container
    And I see a link "Data use policy" to "/FR/politique-donnees" in "footer" container
    And I see a link "Accessibilty statement" to "/FR/declaration-accessibilite" in "footer" container
    And I see a link "Use of cookies" to "/FR/cookies" in "footer" container
    And I see "France" in "footer" container

  Scenario: French Mobile Footer in german
    Given I go to "france homepage" with a browser language "de"
    Then I see an external link "Presseschau" to "https://about.make.org/les-medias-en-parlent" in "footer" container
    And I see an external link "Make.org Stiftungsfonds" to "https://foundation.make.org" in "footer" container
    And I see an external link "Moderationscharta" to "https://about.make.org/moderation" in "footer" container
    And I see a link "Kontakt" to "/FR/contact" in "footer" container
    And I see a link "Impressum" to "/FR/mentions-legales" in "footer" container
    And I see a link "Nutzungsbedingungen" to "/FR/conditions-dutilisation" in "footer" container
    And I see a link "Datenschutzerklärung" to "/FR/politique-donnees" in "footer" container
    And I see a link "Barrierefreiheit" to "/FR/declaration-accessibilite" in "footer" container
    And I see a link "Cookie-Richtlinie" to "/FR/cookies" in "footer" container
    And I see "Frankreich" in "footer" container

  Scenario: English Mobile Footer in french
    Given I go to "british homepage" with a browser language "fr"
    Then I see an external link "Charte de modération" to "https://about.make.org/en/moderation" in "footer" container
    And I see a link "Mentions légales" to "/GB/legal-mentions" in "footer" container
    And I see a link "Conditions d'utilisation" to "/GB/terms-of-use" in "footer" container
    And I see a link "Politique de données" to "/GB/data-terms" in "footer" container
    And I see a link "Gestion des cookies" to "/GB/cookies" in "footer" container
    And I see a link "Contact" to "/GB/contact" in "footer" container
    And I see "Grande Bretagne" in "footer" container
