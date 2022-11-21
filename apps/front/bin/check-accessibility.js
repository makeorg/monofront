#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const { argv } = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('check')
  .example('$0 check', 'Check accessibility documentation and scoring')
  .option('fix', {
    describe: 'Update documentation and scoring',
    default: false,
    type: 'boolean',
  })
  .demandCommand(1)
  .help('h')
  .alias('h', 'help');

// eslint-disable-next-line import/no-extraneous-dependencies
const { ESLint } = require('eslint');

const eslint = new ESLint({ fix: true });
const { getNotifierInstance } = require('../../../bin/utils/notification.js');

const dataRelativePath =
  '../../package/utils/services/accessibilityScoring.yaml';
const docRelativePath = '../../docs/accessibility.md';
const constantRelativePath =
  '../../package/utils/constants/accessibilitySummary.ts';
const configuration = {
  dataFile: path.resolve(process.cwd(), dataRelativePath),
  documentationFile: path.resolve(process.cwd(), docRelativePath),
  constantFile: path.resolve(process.cwd(), constantRelativePath),
  regReplacement:
    /<auto-generated-accessibility-doc>([\s\S]*?)<\/auto-generated-accessibility-doc>/g,
  rgaaGuideUrl:
    'https://www.numerique.gouv.fr/publications/rgaa-accessibilite/methode-rgaa/criteres/',
  anchorFromCriteria: criteria => `#test-${criteria.replace(/\./g, '-')}`,
};

const notifier = getNotifierInstance();
/*
 * Map score to text
 */
const mapSuccess = success => {
  if (success === true) {
    return 'OK';
  }
  if (success === null) {
    return 'NA';
  }

  return 'KO';
};

/*
 * Get summary counts from scores
 */
const getSummaryScores = scores => {
  const successOk = scores.reduce(
    (a, item) => (item.success === true ? a + 1 : a),
    0
  );
  const successKo = scores.reduce(
    (a, item) => (item.success === false ? a + 1 : a),
    0
  );
  const successNa = scores.reduce(
    (a, item) => (item.success === null ? a + 1 : a),
    0
  );

  const pourcentOk = Math.round((successOk / (successKo + successOk)) * 100);

  return {
    successOk,
    successKo,
    successNa,
    pourcentOk,
    total: scores.length,
  };
};

/*
 * Get criteria scoring from accessibility data
 */
const getCriteriaScoring = accessibilityTestData => {
  const getSuccess = (a, b) => {
    switch (true) {
      case a === undefined:
        return b;
      case a === false || b === false:
        return false;
      case a === null && b === null:
        return null;
      default:
        return true;
    }
  };
  const criteriaScores = [];
  accessibilityTestData.forEach(item => {
    const testParts = item.test.split('.');
    const criteria = `${testParts[0]}.${testParts[1]}`;
    const crit = criteriaScores.find(i => i.criteria === criteria);
    if (crit) {
      crit.success = getSuccess(crit.success, item.success);
    } else {
      criteriaScores.push({
        criteria,
        success: getSuccess(undefined, item.success),
      });
    }
  });

  return criteriaScores;
};

/*
 * Get a detail row content
 */
const testRowContent = (parameter, indent = ' ') => {
  const { test, criteria, criteriaSuccess } = parameter;
  const testParts = test.split('.');

  const criteriaDisplay = testParts[2] === '1' ? criteria : '';
  const criteriaSuccessDisplay =
    testParts[2] === '1' ? mapSuccess(criteriaSuccess) : '';
  const success = mapSuccess(parameter.success);
  const toDo = parameter.toDo
    ? parameter.toDo.replace(/(?:\r\n|\r|\n)/g, '<br>')
    : ' ';

  const rgaaUrl = `${
    configuration.rgaaGuideUrl
  }${configuration.anchorFromCriteria(test)}`;

  return `${indent}| ${criteriaDisplay} | ${
    criteriaSuccessDisplay === 'KO'
      ? '<span style="color:red">KO</span>'
      : criteriaSuccessDisplay
  } | [\`${test}\`](${rgaaUrl}) | ${
    success === 'KO' ? '<span style="color:red">KO</span>' : success
  } | ${toDo} |`;
};

/*
 * Get a summary row from scores
 */
const summaryScoringContent = scores => {
  const { successOk, successKo, successNa, pourcentOk, total } = scores;

  return `
| OK | KO | NA | Total | % success |
|-|-|-|-|-|
| ${successOk} | ${successKo} | ${successNa} | ${total} | ***${pourcentOk}*** |
`;
};

/*
 * Get documentation page content
 */
const newContent = (detailData, scoring) => `<auto-generated-accessibility-doc>

### RGAA criteria scoring

${summaryScoringContent(scoring.criteria)}  

### RGAA test scoring

${summaryScoringContent(scoring.test)}  

### RGAA tests detail

Criteria | Criteria success | Test | Test success | To do |
|-|-|-|-|-|
${detailData.map(item => testRowContent(item, '')).join('\n')}


</auto-generated-accessibility-doc>`;

/* start */
(async () => {
  const level1 = '\n\r>>> ';
  const level2 = '    ';

  notifier.newLine();
  notifier.add('Accessibility check', '').notifyInfo2();
  notifier.setPrefix(level1).add('Starting analyse...', '').notifyInfo();

  try {
    /* Get files content */
    const accessibilityTestData = yaml.load(
      fs.readFileSync(configuration.dataFile, 'utf8')
    );
    const documentationContent = fs.readFileSync(
      configuration.documentationFile,
      'utf8'
    );
    const constantContent = fs.readFileSync(configuration.constantFile, 'utf8');

    /* Extract criteria scoring from test scoring */
    const criteriaScoring = getCriteriaScoring(accessibilityTestData);

    /* Criteria scoring and test scoring in the same object */
    const detailData = accessibilityTestData.map(item => {
      const { test } = item;
      const criteria = test.split('.').slice(0, 2).join('.');
      const criteriaSuccess = criteriaScoring.find(
        i => i.criteria === criteria
      ).success;

      return {
        ...item,
        criteria,
        criteriaSuccess,
      };
    });

    /* Summaries */
    const allScores = {
      criteria: getSummaryScores(criteriaScoring),
      test: getSummaryScores(accessibilityTestData),
    };

    /* Updated contents */
    const updatedContent = documentationContent.replace(
      configuration.regReplacement,
      newContent(detailData, allScores)
    );
    const updatedConstantContent = (
      await eslint.lintText(`
// autogenerated code - DONT'T EDIT THIS FILE
export const summary = ${JSON.stringify(allScores, null, '    ')};
  `)
    ).pop().output;

    if (
      updatedContent === documentationContent &&
      updatedConstantContent === constantContent
    ) {
      notifier.setPrefix(level1).add(' All is ok ').notifySuccess();
      notifier
        .newLine()
        .add('Don’t count your chickens before they’re hatched')
        .notifyInfo2();
      notifier.newLine();
      process.exit(0);
    }
    if (!argv.fix) {
      notifier
        .setPrefix(level1)
        .add(
          '',
          ' KO - accessibility documentation or constant is not up to date'
        )
        .notifyError();

      notifier
        .newLine()
        .add('Add the --fix option to update accessibility documentation file')
        .notifyInfo2();
      notifier.add('', '').notifyInfo();
      process.exit(1);
    }

    // Start fix
    notifier.setPrefix(level1).add('Starting fix...').notifyInfo();
    notifier
      .setPrefix(level2)
      .add('Update file', configuration.documentationFile)
      .notifyInfo();
    fs.writeFileSync(configuration.documentationFile, updatedContent);
    fs.writeFileSync(configuration.constantFile, updatedConstantContent);
    notifier
      .setPrefix(level1)
      .add(' All is ok - documentation file fixed ')
      .notifySuccess();

    notifier.newLine().add("Don't forget to commit changes").notifyInfo2();
    notifier.newLine();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
