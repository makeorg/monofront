#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */

const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const { argv } = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('check')
  .example('$0 check', 'Check tracking documentation is up to date')
  .option('fix', {
    describe: 'Update documentation',
    default: false,
    type: 'boolean',
  })
  .demandCommand(1)
  .help('h')
  .alias('h', 'help');
const { getNotifierInstance } = require('./utils/notification.js');

const notifier = getNotifierInstance();
const documentationDir = path.resolve(process.cwd(), '../../docs');
const trackingDocumentationFile = path.resolve(documentationDir, 'tracking.md');
const trackingConfigurationFile = path.resolve(
  process.cwd(),
  '../../utils/services/trackingConfiguration.yaml'
);
const regReplacement =
  /<auto-generated-tracking-doc>([\s\S]*?)<\/auto-generated-tracking-doc>/g;

const paramsTemplate = (parameter, indent = ' ') => {
  const requiredLabel = parameter.optional === true ? 'false' : 'true';
  const name = parameter.key;
  const description = `${parameter.description}`;
  const values = parameter.values
    ? `${parameter.values.map(val => `\`${val}\``).join(', ')}`
    : '';

  return `${indent}| \`${name}\` | ${requiredLabel} | ${description} | ${values} |`;
};
const eventTemplate = event => {
  const { key, description, parameters } = event;
  const params = parameters
    ? `
    | param_name | required | description | values |
    |-|-|-|-|
${parameters.map(param => paramsTemplate(param, '    ')).join('\n')}
  `
    : '';
  return `
  - \`${key}\` ${description}

    ${params}
  `;
};

const newContent = (commonParameters, events) => `<auto-generated-tracking-doc>

### Common params

Following parameters are added to all events.

| param_name | required | description | values |
|-|-|-|-|
${commonParameters.map(param => paramsTemplate(param, '')).join('\n')}


### Event list 

${events.map(eventTemplate).join('\n')}

</auto-generated-tracking-doc>`;

const level1 = '\n\r>>> ';
const level2 = '    ';

notifier.newLine();
notifier.add('Documentation check', '').notifyInfo2();
notifier.setPrefix(level1).add('Starting analyse...', '').notifyInfo();

try {
  const trackingConfiguration = yaml.load(
    fs.readFileSync(trackingConfigurationFile, 'utf8')
  );
  const documentationContent = fs.readFileSync(
    trackingDocumentationFile,
    'utf8'
  );
  const updatedContent = documentationContent.replace(
    regReplacement,
    newContent(
      trackingConfiguration.COMMON_PARAMETERS.parameters,
      Object.keys(trackingConfiguration)
        .filter(key => key !== 'COMMON_PARAMETERS')
        .map(key => trackingConfiguration[key])
    )
  );

  if (updatedContent === documentationContent) {
    notifier.setPrefix(level1).add(' All is ok ').notifySuccess();
    notifier
      .newLine()
      .add('An apple a day keeps the doctor away')
      .notifyInfo2();
    notifier.newLine();
    process.exit(0);
  }
  if (!argv.fix) {
    notifier
      .setPrefix(level1)
      .add('', ' KO - tracking documentation is not up to date')
      .notifyError();

    notifier
      .newLine()
      .add('Add the --fix option to update tracking documentation file')
      .notifyInfo2();
    notifier.add('', '').notifyInfo();
    process.exit(1);
  }
  notifier.setPrefix(level1).add('Starting fix...').notifyInfo();
  notifier
    .setPrefix(level2)
    .add('Update file', trackingDocumentationFile)
    .notifyInfo();
  fs.writeFileSync(trackingDocumentationFile, updatedContent);
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
