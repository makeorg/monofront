/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * This script utility is needed to create version file.
 */

const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const WIDGET_CLIENT_DIR = path.resolve(process.cwd(), 'dist', 'client');

const projectName = 'make.org-widget';
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
    version: lastCommit.substr(0, 10),
    gitCommit: lastCommit,
    gitBranch: branch,
  };
} catch (e) {
  console.error(`Command git rev-parse for version build failed: ${e.message}`);
}

try {
  const versionPathFile = `${WIDGET_CLIENT_DIR}/version`;

  fs.writeFileSync(versionPathFile, JSON.stringify(version, null, 2), 'utf8');
} catch (error) {
  // eslint-disable-next-line no-console
  console.error(`error when writing version file => ${error}`);
  process.exit(1);
}

// eslint-disable-next-line no-console
console.info('Version file created successfully!');
console.info(version);
