const defaultCustomer = require('../db/defaultCustomer.json');
const defaultEvent = require('../db/defaultEvent.json');
const defaultGeneratedContent = require('../db/defaultGeneratedContent.json');
const defaultTermQuery = require('../db/defaultTermQuery.json');

const range = (start, end) => {
  const values = [];
  let current = start;
  while (current < end) {
    values.push(current);
    current += 1;
  }
  return values;
};

const generateComputedContent = count =>
  range(0, count).map(number => ({
    ...defaultGeneratedContent,
    id: `generated-content-${number}-id`,
    name: `Contenu généré nom-${number}`,
    title: `Contenu généré titre-${number}`,
    subtitle: `Contenu généré sous-titre-${number}`,
    i18n: [
      {
        ...defaultGeneratedContent.i18n[0],
        title: `Generated content title-${number}`,
        subtitle: `Generated content subtitle-${number}`,
      },
    ],
  }));

const generateTermQueries = count =>
  range(0, count).map(number => ({
    ...defaultTermQuery,
    id: `generated-term-query-${number}-id`,
    title: `Thème titre-${number}`,
    value: `theme-value-${number}`,
    i18n: [
      {
        ...defaultTermQuery.i18n[0],
        title: `Term query title-${number}`,
      },
    ],
  }));

const generatedContents = generateComputedContent(10);
const termQueries = generateTermQueries(10);

const fixtures = {
  customer: [defaultCustomer],
  event: [defaultEvent],
  generatedContents,
  termQueries,
};

module.exports = { fixtures };
