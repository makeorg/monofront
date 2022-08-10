#!/usr/bin/env node

const path = require('path');



/**
const { argv } = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command('check')
  .example(
    '$0 check -d ./translationDir -l ',
    'Check translation files in dir translationDir'
  )
  .alias('d', 'directory')
  .nargs('d', 1)
  .describe('d', 'Translation files directory')
  .alias('l', 'reference language')
  .nargs('l', 1)
  .describe('l', 'Reference language')
  .option('fix', {
    describe: 'Fix invalid translation files',
    default: false,
    type: 'boolean',
  })
  .demandOption(['d', 'l'])
  .command('list-unused')
  .example(
    '$0 check -d ./translationDir -l ',
    'List unused translation keys'
  )
  .alias('d', 'directory')
  .nargs('d', 1)
  .describe('d', 'Translation files directory')
  .alias('l', 'reference language')
  .nargs('l', 1)
  .describe('l', 'Reference language')
  .demandOption(['d', 'l'])
  .help('h')
  .alias('h', 'help');

*/

const { getNotifierInstance } = require('./utils/notification.js');

const notifier = getNotifierInstance();



const checkTranslation = require('../dist/lib/CheckTranslation.js');

const level1 = '\n\r>>> ';
const level2 = '    ';
const level3 = '    > ';


const check = argv => {
  const translationDir = path.resolve(process.cwd(), argv.d);
  notifier.newLine();
  notifier.add('Translation check', '').notifyInfo2();
  notifier.add('Translation dir', translationDir).notifyInfo();
  notifier.add('Référence language', argv.l).notifyInfo();
  notifier.setPrefix(level1).add('Starting analyse...', '').notifyInfo();

  checkTranslation.analyse(translationDir, argv.l).then(response => {
    const { results, totalTransCount, transList } = response;
    notifier
      .setPrefix(level2)
      .add(
        'Translation file(s):',
        `total: ${totalTransCount} / language(s): ${transList.join(', ')}`
      )
      .notifyInfo();

    if (!results.length) {
      notifier.setPrefix(level1).add(' All is ok ').notifySuccess();
      notifier.newLine().add('Have a nice day').notifyInfo2();
      notifier.newLine();
      process.exit(0);
    }
    if (results.length) {
      notifier.setPrefix(level2).add('Failed results:').notifyInfo();

      results.forEach(result => {
        notifier
          .setPrefix(level3)
          .add('Language:', result.language)
          .add('Extra keys:', result.extraKeysCount)
          .add('Missing keys:', result.missingKeysCount)
          .notifyInfo();
      });
      if (!argv.fix) {
        notifier
          .setPrefix(level1)
          .add('', ' KO - translations check failed ')
          .notifyError();

        notifier
          .newLine()
          .add('Add the --fix option to update translation file(s)')
          .notifyInfo2();
        notifier.add('', '').notifyInfo();
        process.exit(1);
      }
      notifier.setPrefix(level1).add('Starting fix...').notifyInfo();
      results.forEach(result => {
        checkTranslation.fixTranslationFile(
          `${translationDir}/${result.filename}`,
          result.fixedTrans
        );
        notifier
          .setPrefix(level2)
          .add('Update file', result.filename)
          .notifyInfo();
      });
      notifier
        .setPrefix(level1)
        .add(' All is ok - translation(s) file(s) fixed ')
        .notifySuccess();

      notifier.newLine().add("Don't forget to commit changes").notifyInfo2();
      notifier.newLine();
      process.exit(0);
    }
  });
}


const listUnused = argv => {
  const translationDir = path.resolve(process.cwd(), argv.d);
  notifier.newLine();
  notifier.add('List unused translation keys', '').notifyInfo2();
  notifier.add('Translation dir', translationDir).notifyInfo();
  notifier.add('Référence language', argv.l).notifyInfo();
  notifier.setPrefix(level1).add('Starting analyse...', '').notifyInfo();

  checkTranslation.listUnusedKeys(translationDir, argv.l).then(results => {

    if (!results.size) {
      notifier.setPrefix(level1).add(' All is ok ').notifySuccess();
      notifier.newLine().add('Brevity is the soul of wit').notifyInfo2();
      notifier.newLine();
      process.exit(0);
    }
    notifier.setPrefix(level2).add('Found unused keys:').notifyInfo();

    results.forEach(result => {
      notifier
        .setPrefix(level3)
        .add('', result)
        .notifyInfo();
    });

    notifier
      .setPrefix(level1)
      .add('', ' KO - check and remove keys if not used')
      .notifyError();


      process.exit(0);
  });
}

const listOrphan = argv => {
  const translationDir = path.resolve(process.cwd(), argv.d);
  notifier.newLine();
  notifier.add('List orphan translation keys in code', '').notifyInfo2();
  notifier.add('Translation dir', translationDir).notifyInfo();
  notifier.add('Référence language', argv.l).notifyInfo();
  notifier.setPrefix(level1).add('Starting analyse...', '').notifyInfo();

  checkTranslation.listOrphanKeys(translationDir, argv.l).then(results => {

    if (!results.size) {
      notifier.setPrefix(level1).add(' All is ok ').notifySuccess();
      notifier.newLine().add('Two wrongs don\'t make a right').notifyInfo2();
      notifier.newLine();
      process.exit(0);
    }
    notifier.setPrefix(level2).add('Found orphan keys:').notifyInfo();

    results.forEach(result => {
      notifier
        .setPrefix(level3)
        .add('', result)
        .notifyInfo();
    });

    notifier
      .setPrefix(level1)
      .add('', ' KO - check orphan keys in code')
      .notifyError();


      process.exit(0);
  });
}

const { argv } = require('yargs')
  .usage('Usage: $0 <command> [options]')
  .command(
    'check',
    'Check translation files in dir translationDir',
    yargs => {
      return yargs
        .alias('d', 'directory')
        .nargs('d', 1)
        .describe('d', 'Translation files directory')
        .alias('l', 'reference language')
        .nargs('l', 1)
        .describe('l', 'Reference language (example: fr)')
        .option('fix', {
          describe: 'Fix invalid translation files',
          default: false,
          type: 'boolean',
        })
        .demandOption(['d', 'l'])
    } ,
    argv =>
      check(argv)
  )
  .command(
    'list-unused',
    'List unused keys checking code in current directory',
    yargs => {
      return yargs
        .alias('d', 'directory')
        .nargs('d', 1)
        .describe('d', 'Translation files directory')
        .alias('l', 'reference language')
        .nargs('l', 1)
        .describe('l', 'Reference language (example: fr)')
        .demandOption(['d', 'l'])
    } ,
    argv =>
      listUnused(argv)
  )
  .command(
    'list-orphan', 
    'List orphan keys checking code in current directory',
    yargs => {
      return yargs
        .alias('d', 'directory')
        .nargs('d', 1)
        .describe('d', 'Translation files directory')
        .alias('l', 'reference language')
        .nargs('l', 1)
        .describe('l', 'Reference language (example: fr)')
        .demandOption(['d', 'l'])
    } ,
    argv =>
      listOrphan(argv)
  )
  .help('h')
  .alias('h', 'help');
