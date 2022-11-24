#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const { getNotifierInstance } = require('./utils/notification.js');
const notifier = getNotifierInstance();

const level1 = '\n\r>>> ';
const level2 = '    ';

const generateVersion = argv => {

    const targetDir = path.resolve(process.cwd(), argv.d);
    const projectName = argv.p;


    notifier.newLine();
    notifier.add('Generate version', '').notifyInfo2();
    notifier.add('Target directory', targetDir).notifyInfo();
    notifier.add('Project name', argv.p).notifyInfo();
    notifier.setPrefix(level1).add('Starting...', '').notifyInfo();
  
    const dateTime = new Date();
    
    let version = {
    name: projectName,
    version: '',
    gitCommit: '',
    gitBranch: '',
    buildTime: dateTime.toISOString(),
    };
    
    try {
        const lastCommit = childProcess
            .execSync('git rev-parse HEAD')
            .toString()
            .trim();
        const branch = childProcess
            .execSync('git rev-parse --abbrev-ref HEAD')
            .toString()
            .trim();
        
        version = {
            ...version,
            version: lastCommit.substring(0, 10),
            gitCommit: lastCommit,
            gitBranch: branch,
        };
    } catch (e) {
        notifier
            .add('', `Command git rev-parse for version build failed: ${e.message}`)
            .notifyError();
        process.exit(0);
    }
    
    try {
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir);
        }
        const versionPathFile = `${targetDir}/version`;
        fs.writeFileSync(versionPathFile, JSON.stringify(version, null, 2), 'utf8');
    } catch (error) {
        notifier
            .add('', `error when writing version file => ${error}`)
            .notifyError();
        process.exit(1);
    }
    
    notifier.setPrefix(level1).add('Version file created successfully!').notifySuccess();
    notifier.setPrefix(level2).add(version).notifyInfo();
 }

const { argv } = require('yargs')
    .usage('Usage: $0 <command> [options]')
    .command(
    'generate',
    'Generate version file of current directory (using git)',
    yargs => {
        return yargs
        .alias('d', 'directory')
        .nargs('d', 1)
        .describe('d', 'Target directory for version file')
        .alias('p', 'project')
        .nargs('p', 1)
        .describe('p', 'Project name')
        .demandOption(['d', 'p'])
    } ,
    argv =>
        generateVersion(argv)
    )
    .help('h')
    .alias('h', 'help');
