/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import { Then, Given, When } from 'cypress-cucumber-preprocessor/steps';
import { getIdentifierButtonByName } from '../mapping.js';

const sequencePage = {
  front: '/:country/consultation/:questionSlug/selection',
  widget:
    '/?questionSlug=:questionSlug&source=widget-test&country=:country&language=:language&widgetId=fake-widget-id&hash=fake-hash-id',
};
const sequencePopularPage = '/FR/consultation/:questionSlug/selection-popular';
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
    cy.monitorApiCall('getStartSequence');
    cy.visit(page);
    cy.wait('@getStartSequence', { timeout: 8000 });
  }
);

Given(
  'I am/go on/to the sequence (page )of the question {string} with country {string} and language {string}',
  (questionSlug, country, language) => {
    const page = sequencePage[Cypress.env('application')]
      .replace(':questionSlug', questionSlug)
      .replace(':language', language)
      .replace(':country', country);
    cy.monitorApiCall('getStartSequence');
    cy.visit(page);
    cy.wait('@getStartSequence', { timeout: 8000 });
  }
);

Given(
  'I am/go on/to the sequence page of the question {string} with a first proposal {string}',
  (questionSlug, firstProposalId) => {
    const page = sequencePage[Cypress.env('application')]
      .replace(':questionSlug', questionSlug)
      .replace(':language', 'fr')
      .replace(':country', 'FR');
    cy.monitorApiCall('getStartSequence');
    cy.visit(`${page}?firstProposal=${firstProposalId}`);
    cy.wait('@getStartSequence', { timeout: 8000 });
  }
);

Given(
  'I am/go on/to the sequence page of the question {string} with intro card disabled',
  questionSlug => {
    const page = sequencePage[Cypress.env('application')]
      .replace(':questionSlug', questionSlug)
      .replace(':language', 'fr')
      .replace(':country', 'FR');
    cy.monitorApiCall('getStartSequence');
    cy.visit(`${page}?introCard=false`);
    cy.wait('@getStartSequence', { timeout: 8000 });
  }
);

Given(
  'I am/go on/to the sequence popular page of the question {string}',
  questionSlug => {
    const page = sequencePopularPage.replace(':questionSlug', questionSlug);
    cy.monitorApiCall('getPopularStartSequence');
    cy.visit(page);
    cy.wait('@getPopularStartSequence', { timeout: 8000 });
  }
);

When('I click on {string} of the sequence', buttonName => {
  const button = getIdentifierButtonByName(buttonName);
  cy.get(`[data-cy-button=${button}]`)
    .first()
    .then(el => el.get(0).click());
});

When('I click on {string} of the current card', buttonName => {
  const button = getIdentifierButtonByName(buttonName);
  cy.get(`[data-cy-button=${button}]`)
    .first()
    .then(el => el.get(0).click());
});

When('I vote {string} on proposal {string}', (voteType, proposalNumber) => {
  cy.monitorApiCall('postVote');
  cy.get(`#${voteLabel[voteType]}-${proposalNumber}`).then(el =>
    el.get(0).click()
  );
  cy.wait('@postVote');
});

When('I vote {string} on the first proposal of sequence', voteType => {
  cy.monitorApiCall('postVote');
  cy.get(
    `[data-cy-card-type=PROPOSAL_CARD] [data-cy-button=vote][data-cy-vote-key=${voteType}]`
  )
    .first()
    .then(el => el.get(0).click());
  cy.wait('@postVote');
});

When('I vote {string} on the current card', voteType => {
  cy.monitorApiCall('postVote');
  cy.get(`[data-cy-button=vote][data-cy-vote-key=${voteType}]`)
    .first()
    .then(el => el.get(0).click());
  cy.wait('@postVote');
});

When('I qualify {string} on the current card', qualificationType => {
  cy.monitorApiCall('postQualify');
  cy.get(
    `[data-cy-button=qualification][data-cy-qualification-key=${qualificationType}]`
  )
    .first()
    .then(el => el.get(0).click());
  cy.wait('@postQualify');
});

When('I unqualify {string} on the current card', qualificationType => {
  cy.monitorApiCall('postUnqualify');
  cy.get(
    `[data-cy-button=qualification][data-cy-qualification-key=${qualificationType}]`
  )
    .first()
    .then(el => el.get(0).click());
  cy.wait('@postUnqualify');
});

When('I unvote on the current card', () => {
  cy.monitorApiCall('postUnvote');
  cy.get(`[data-cy-button=vote]`)
    .first()
    .then(el => el.get(0).click());
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

When('I go to card {string}', cardNumber => {
  let previewCard = 0;
  const nextWhileCardTargetNotDisplayed = () => {
    const currentCard = cy.get(`[data-cy-card-number=${previewCard}]`);
    currentCard
      .then(card => {
        card.find('[data-cy-button=vote]').first().click();
      })
      .find(
        '[data-cy-button=next-proposal], [data-cy-button=push-proposal-next], [data-cy-button=skip-sign-up], [data-cy-button=start-sequence], [data-cy-button=skip-demographics]'
      )
      .click();

    const expectedCardNumber = (Number(previewCard) + 1).toString();
    cy.waitUntil(() =>
      cy.get(`[data-cy-card-number=${expectedCardNumber}]`).should('be.visible')
    );
    previewCard = expectedCardNumber;
    if (expectedCardNumber !== cardNumber) {
      nextWhileCardTargetNotDisplayed();
    }
  };
  cy.waitUntil(() => cy.get(`[data-cy-card-number]`).should('be.visible'));
  cy.get('body')
    .then(body => {
      const card = body.find('[data-cy-card-number]');
      if (card.length) {
        return parseInt(card[0].dataset.cyCardNumber, 10);
      }

      throw new Error('Card not found');
    })
    .then(number => {
      previewCard = number;
      nextWhileCardTargetNotDisplayed();
    });
});

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

Then('total votes are equal to {string}', voteCount => {
  cy.get('[data-cy-container=sequence]').should(
    'contain',
    `${voteCount} votes`
  );
});

Then(
  'total {string} qualifications are equal to {string} on the current card',
  (qualificationType, total) => {
    cy.get(
      `[data-cy-button-qualification-total][data-cy-qualification-key=${qualificationType}]`
    )
      .first()
      .contains(total);
  }
);

When('I select a demographic value', () => {
  cy.get('[data-cy-demographic-layout]').then(el => {
    const type = el[0].dataset.cyDemographicType;
    if (type === 'select') {
      // ToDo
    } else {
      cy.get('[data-cy-demographic-layout] label').first().click();
    }
  });
});
