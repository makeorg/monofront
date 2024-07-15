const defaultCustomer = require('../db/defaultCustomer.json');
const defaultEvent = require('../db/defaultEvent.json');
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

const termQueries = generateTermQueries(10);

const fixtures = {
  customer: [defaultCustomer],
  event: [defaultEvent],
  termQueries,
};

module.exports = { fixtures };
