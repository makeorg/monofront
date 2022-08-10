/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable cypress/no-assigning-return-values */
/* eslint-disable no-plusplus */
/* eslint-disable no-loop-func */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Then, Given, When } from 'cypress-cucumber-preprocessor/steps';
import { getIdentifierButtonByName } from '../mapping.js';

const sequencePage = {
  front: '/:country/consultation/:questionSlug/selection',
  widget:
    '/?questionSlug=:questionSlug&source=widget-test&country=:country&language=:language&widgetId=fake-widget-questionid&hash=fake-hash-id',
};
const sequencePopularPage = '/FR/consultation/:questionSlug/selection-popular';
const sequenceControversialPage =
  '/FR/consultation/:questionSlug/selection-controversial';

const voteLabel = {
  "D'accord": 'agree',
  "Pas d'accord": 'disagree',
  Neutre: 'neutral',
};

Given(
  'I am/go on/to the sequence (page )of the question {string}',
  questionSlug => {
    const page = sequencePage[Cypress.env('application')]
      .replace(':questionSlug', questionSlug)
      .replace(':language', 'fr')
      .replace(':country', 'FR');
    cy.visit(page);
  }
);

Given(
  'I am/go on/to the sequence (page )of the question {string} with no client load check',
  questionSlug => {
    const page = sequencePage[Cypress.env('application')]
      .replace(':questionSlug', questionSlug)
      .replace(':language', 'fr')
      .replace(':country', 'FR');
    cy.visit(page, { noLoadCheck: true });
  }
);

Given(
  'I am/go on/to the sequence (page )of the question {string} with country {string} and language {string}',
  (questionSlug, country, language) => {
    const page = sequencePage[Cypress.env('application')]
      .replace(':questionSlug', questionSlug)
      .replace(':language', language)
      .replace(':country', country);
    cy.visit(page);
  }
);

// call first proposal of sequence with new endpoint `first-proposal`
Given(
  'I am/go on/to the first card of sequence of the question {string} with country {string} and language {string}',
  (questionSlug, country, language) => {
    const page = sequencePage[Cypress.env('application')]
      .replace(':questionSlug', questionSlug)
      .replace(':language', language)
      .replace(':country', country);
    cy.visit(page);
  }
);

Given(
  'I am/go on/to the sequence page of the question {string} with a first proposal {string}',
  (questionSlug, firstProposalId) => {
    const page = sequencePage[Cypress.env('application')]
      .replace(':questionSlug', questionSlug)
      .replace(':language', 'fr')
      .replace(':country', 'FR');
    cy.visit(`${page}?firstProposal=${firstProposalId}`);
  }
);

Given(
  'I am/go on/to the sequence page of the question {string} with intro card disabled',
  questionSlug => {
    const page = sequencePage[Cypress.env('application')]
      .replace(':questionSlug', questionSlug)
      .replace(':language', 'fr')
      .replace(':country', 'FR');
    if (Cypress.env('application') === 'widget') {
      cy.visit(page);
    } else {
      cy.visit(`${page}?introCard=false`);
    }
  }
);

// Display sequence page for common tests between widget and front
Given(
  'I am/go on/to the common sequence page of the question {string}',
  questionSlug => {
    const page = sequencePage[Cypress.env('application')]
      .replace(':questionSlug', questionSlug)
      .replace(':language', 'fr')
      .replace(':country', 'FR');
    if (Cypress.env('application') === 'widget') {
      cy.visit(page);
    } else {
      cy.visit(`${page}?introCard=false`);
    }
  }
);

Given(
  'I am/go on/to the sequence popular page of the question {string}',
  questionSlug => {
    const page = sequencePopularPage.replace(':questionSlug', questionSlug);
    cy.visit(page);
  }
);

Given(
  'I am/go on/to the sequence controversial page of the question {string}',
  questionSlug => {
    const page = sequenceControversialPage.replace(
      ':questionSlug',
      questionSlug
    );
    cy.visit(page);
  }
);

When('I click on {string} of the sequence', buttonName => {
  const button = getIdentifierButtonByName(buttonName);
  cy.get(`[data-cy-button=${button}]`).first().click();
});

When('I click on {string} of the current card', buttonName => {
  const button = getIdentifierButtonByName(buttonName);
  cy.get(`[data-cy-button=${button}]`).first().click();
});

When('I vote {string} on proposal {string}', (voteType, proposalNumber) => {
  cy.monitorApiCall('postVote');
  cy.get(`#${voteLabel[voteType]}-${proposalNumber}`).click();
  cy.wait('@postVote');
});

When('I vote {string} on the first proposal of sequence', voteType => {
  cy.monitorApiCall('postVote');
  cy.get(
    `[data-cy-card-type=PROPOSAL_CARD] [data-cy-button=vote][data-cy-vote-key=${voteType}]`
  )
    .first()
    .click();
  cy.wait('@postVote');
});

When('I vote {string} on the current card', voteType => {
  cy.monitorApiCall('postVote');
  cy.get(`[data-cy-button=vote][data-cy-vote-key=${voteType}]`).first().click();
  cy.wait('@postVote');
});

When('I qualify {string} on the current card', qualificationType => {
  cy.monitorApiCall('postQualify');
  cy.get(
    `[data-cy-button=qualification][data-cy-qualification-key=${qualificationType}]`
  )
    .first()
    .click();
  cy.wait('@postQualify');
});

When('I unqualify {string} on the current card', qualificationType => {
  cy.monitorApiCall('postUnqualify');
  cy.get(
    `[data-cy-button=qualification][data-cy-qualification-key=${qualificationType}]`
  )
    .first()
    .click();
  cy.wait('@postUnqualify');
});

When('I unvote on the current card', () => {
  cy.monitorApiCall('postUnvote');
  cy.get(`[data-cy-button=vote]`).first().click();
  cy.wait('@postUnvote');
});

Then('I see {string} button on card {string}', (buttonName, cardNumber) => {
  const button = getIdentifierButtonByName(buttonName);
  cy.get(
    `[data-cy-card-number=${cardNumber}] [data-cy-button=${button}]`
  ).should('be.visible');
});

Then(
  "The {string} button on card {string} doesn't exist",
  (buttonName, cardNumber) => {
    const button = getIdentifierButtonByName(buttonName);
    cy.get(
      `[data-cy-card-number=${cardNumber}] [data-cy-button=${button}]`
    ).should('not.exist');
  }
);

When(
  'I go to card {string} from card {string}',
  (cardNumber, currentCardPosition) => {
    for (
      let currentCard = currentCardPosition;
      currentCard < cardNumber;
      currentCard++
    ) {
      // check if current card is visible
      cy.get(`[data-cy-card-number=${currentCard}]`)
        .should('exist')
        .should('be.visible');

      cy.get(`[data-cy-card-number=${currentCard}]`).then(card => {
        const voteButtons = card.find('[data-cy-button=vote]');

        // for proposals only
        if (voteButtons.length) {
          // wait for vote button to exist in DOM
          cy.waitUntil(() =>
            cy
              .get('[data-cy-vote-key=agree]')
              .should('exist')
              .should('be.visible')
          );
          // click on vote agree button
          cy.get(`[data-cy-button=vote][data-cy-vote-key=agree]`)
            .first()
            .click();

          // check next-proposal button exists in DOM
          cy.get('[data-cy-button=next-proposal]')
            .should('exist')
            .should('be.visible');
          // click on next-proposal button
          cy.get('[data-cy-button=next-proposal]').click();
        } else {
          // check for various next button exist in DOM
          cy.get(
            '[data-cy-button=push-proposal-next], [data-cy-button=skip-sign-up], [data-cy-button=start-sequence], [data-cy-button=skip-demographics]'
          )
            .should('exist')
            .should('be.visible');
          // click on next button
          cy.get(
            '[data-cy-button=push-proposal-next], [data-cy-button=skip-sign-up], [data-cy-button=start-sequence], [data-cy-button=skip-demographics]'
          )
            .first()
            .click();
        }
      });
    }
  }
);

Then('card {string} is visible', cardNumber => {
  cy.get(`[data-cy-card-number=${cardNumber}]`).should('be.visible');
});

Then('card {string} is a proposal card', cardNumber => {
  cy.get(`[data-cy-card-number=${cardNumber}]`).should(
    'have.attr',
    'data-cy-card-type',
    'PROPOSAL_CARD'
  );
});

Then('current card is a proposal card', () => {
  cy.get(`[data-cy-card-type]`)
    .first()
    .should('have.attr', 'data-cy-card-type', 'PROPOSAL_CARD');
});

Then('card {string} is a demographic card', cardNumber => {
  cy.get(`[data-cy-card-number=${cardNumber}]`).should(
    'have.attr',
    'data-cy-card-type',
    'EXTRASLIDE_DEMOGRAPHICS_CARD'
  );
});

Then('current card is a demographic card', () => {
  cy.get(`[data-cy-card-type]`)
    .first()
    .should('have.attr', 'data-cy-card-type', 'EXTRASLIDE_DEMOGRAPHICS_CARD');
});

Then('card {string} is a final card', cardNumber => {
  cy.get(`[data-cy-card-number=${cardNumber}]`).should(
    'have.attr',
    'data-cy-card-type',
    'EXTRASLIDE_FINAL_CARD'
  );
});

Then('current card is a final card', () => {
  cy.get(`[data-cy-card-type]`)
    .first()
    .should('have.attr', 'data-cy-card-type', 'EXTRASLIDE_FINAL_CARD');
});

Then('card {string} is an intro card', cardNumber => {
  cy.get(`[data-cy-card-number=${cardNumber}]`).should(
    'have.attr',
    'data-cy-card-type',
    'EXTRASLIDE_INTRO_CARD'
  );
});

Then('current card is a intro card', () => {
  cy.get(`[data-cy-card-type]`)
    .first()
    .should('have.attr', 'data-cy-card-type', 'EXTRASLIDE_INTRO_CARD');
});

Then('card {string} is a push proposal card', cardNumber => {
  cy.get(`[data-cy-card-number=${cardNumber}]`).should(
    'have.attr',
    'data-cy-card-type',
    'EXTRASLIDE_PUSH_PROPOSAL_CARD'
  );
});

Then('current card is a push proposal card', () => {
  cy.get(`[data-cy-card-type]`)
    .first()
    .should('have.attr', 'data-cy-card-type', 'EXTRASLIDE_PUSH_PROPOSAL_CARD');
});

Then('progress bar is {string} on {string}', (current, total) => {
  cy.get('[data-cy-container=progress]').contains(`${current}/${total}`);
  cy.get('[data-cy-container=progress]').contains(
    `Élément ${current} sur ${total}`
  );
});

Then('I see {string} in the current card', text => {
  cy.get('[data-cy-card-number]').should('contain', text);
});

Then('I see vote buttons on card {string}', cardNumber => {
  cy.get(
    `[data-cy-card-number=${cardNumber}] [data-cy-button=vote][data-cy-vote-key=agree]`
  )
    .should('have.length', 1)
    .and('be.visible');
  cy.get(
    `[data-cy-card-number=${cardNumber}] [data-cy-button=vote][data-cy-vote-key=disagree]`
  )
    .should('have.length', 1)
    .and('be.visible');
  cy.get(
    `[data-cy-card-number=${cardNumber}] [data-cy-button=vote][data-cy-vote-key=neutral]`
  )
    .should('have.length', 1)
    .and('be.visible');
});

Then('I see vote buttons on the current card', () => {
  cy.get(`[data-cy-button=vote][data-cy-vote-key=agree]`)
    .should('have.length', 1)
    .and('be.visible');
  cy.get(`[data-cy-button=vote][data-cy-vote-key=disagree]`)
    .should('have.length', 1)
    .and('be.visible');
  cy.get(`[data-cy-button=vote][data-cy-vote-key=neutral]`)
    .should('have.length', 1)
    .and('be.visible');
});

Then('I see {string} voted proposal on the current card', voteType => {
  cy.get(`[data-cy-button=vote][data-cy-vote-key=${voteType}] svg`)
    .should('have.length', 1)
    .and('be.visible')
    .and('have.class', 'voted');
});

Then(
  'I see {string} qualified proposal on the current card',
  qualificationType => {
    cy.get(`[data-cy-button=qualification][data-cy-qualification-key=likeIt]`)
      .should('have.length', 1)
      .and('be.visible')
      .and('have.class', 'qualified');
  }
);

Then('I see agree qualifications buttons on card {string}', cardNumber => {
  cy.get(
    `[data-cy-card-number=${cardNumber}] [data-cy-button=qualification]`
  ).should('have.length', 3);
  cy.get(
    `[data-cy-card-number=${cardNumber}] [data-cy-qualification-key=likeIt]`
  ).should('be.visible');
  cy.get(
    `[data-cy-card-number=${cardNumber}] [data-cy-qualification-key=doable]`
  ).should('be.visible');
  cy.get(
    `[data-cy-card-number=${cardNumber}] [data-cy-qualification-key=platitudeAgree]`
  ).should('be.visible');
});

Then('I see disagree qualifications buttons on card {string}', cardNumber => {
  cy.get(
    `[data-cy-card-number=${cardNumber}] [data-cy-button=qualification]`
  ).should('have.length', 3);
  cy.get(
    `[data-cy-card-number=${cardNumber}] [data-cy-qualification-key=noWay]`
  ).should('be.visible');
  cy.get(
    `[data-cy-card-number=${cardNumber}] [data-cy-qualification-key=impossible]`
  ).should('be.visible');
  cy.get(
    `[data-cy-card-number=${cardNumber}] [data-cy-qualification-key=platitudeDisagree]`
  ).should('be.visible');
});

Then('I see neutral qualifications buttons on card {string}', cardNumber => {
  cy.get(
    `[data-cy-card-number=${cardNumber}] [data-cy-button=qualification]`
  ).should('have.length', 3);
  cy.get(
    `[data-cy-card-number=${cardNumber}] [data-cy-qualification-key=doNotUnderstand]`
  ).should('be.visible');
  cy.get(
    `[data-cy-card-number=${cardNumber}] [data-cy-qualification-key=noOpinion]`
  ).should('be.visible');
  cy.get(
    `[data-cy-card-number=${cardNumber}] [data-cy-qualification-key=doNotCare]`
  ).should('be.visible');
});

Then("I don't see qualification buttons on the current card", () => {
  cy.get('[data-cy-qualification-key]').should('have.length', 0);
});

Then(
  '{string} qualification button is highlight on the current card',
  qualificationType => {
    cy.get(
      `[data-cy-button=qualification][data-cy-qualification-key=${qualificationType}]`
    )
      .first()
      .should('have.css', 'background-color', 'rgb(80, 122, 31)');
  }
);

Then(
  '{string} qualification button is not highlight on the current card',
  qualificationType => {
    cy.get(
      `[data-cy-button=qualification][data-cy-qualification-key=${qualificationType}]`
    )
      .first()
      .should('have.not.css', 'background-color', 'rgb(80, 122, 31)');
  }
);

When('I select a demographic value', () => {
  cy.get('[data-cy-demographic-layout] label').first().click();
});
