/* eslint-disable import/no-extraneous-dependencies */
import yargs from 'yargs';
import path from 'path';
import {
  StatusType,
  TrackingDocumentationGenerator,
} from '../documentation/generator.js';

enum Command {
  CHECK = 'check',
}

const run = async (command: Command, args: { [appArgs: string]: unknown }) => {
  const currentDir = process.cwd();
  switch (command) {
    case Command.CHECK: {
      const { fix: shouldFix, target, config } = args;
      const targetPath = path.resolve(currentDir, target as string);
      const configPath = path.resolve(currentDir, config as string);

      const generator = new TrackingDocumentationGenerator(
        targetPath,
        configPath
      );
      try {
        const resultGenerate = generator.generateDocumentation();
        if (resultGenerate.status === StatusType.IS_UP_TO_DATE) {
          process.stderr.write('Documentation is up to date.');
          process.exit(0);
        }

        const diff = generator.getDiff();
        diff.forEach(part => {
          if (part.added) {
            process.stdout.write(`\x1b[32m +    ${part.value} \x1b[0m\n`);
            return;
          }
          if (part.removed) {
            process.stdout.write(`\x1b[31m -    ${part.value} \x1b[0m\n`);
            // return;
          }
          // process.stdout.write(`      ${part.value}\n`);
        });

        if (!shouldFix) {
          process.stderr.write('Update required. Try using --fix option');
          process.exit(1);
        }

        const resultSave = generator.saveGeneratedDocumentation();
        if (resultSave.status !== StatusType.UPDATED) {
          process.stderr.write(`Update fail. ${resultSave.status}`);
          process.exit(1);
        }

        process.stdout.write('Updated with success !!!');
        process.exit(0);
      } catch (e) {
        const error = e as Error;
        process.stderr.write(error.message);
        process.exit(1);
      }

      return;
    }
    default:
      throw new Error(`Command not implement yet`);
  }
};

yargs(process.argv.slice(2))
  .command({
    command: Command.CHECK,
    describe: 'Check tracking documentation',
    builder: builder =>
      builder.options({
        fix: { demandOption: false, requiresArg: false },
        target: {
          demandOption: true,
          describe: 'md target file',
          alias: 't',
          type: 'string',
        },
        config: {
          demandOption: true,
          describe: 'yaml tracking configuration file',
          alias: 'c',
          type: 'string',
        },
      }),
    handler: async args => {
      await run(Command.CHECK, args);
    },
  })
  .example(Command.CHECK, `${Command.CHECK} --fix`)
  .demandCommand(1, 1)
  .showHelpOnFail(true)
  .strict()
  .parse();
