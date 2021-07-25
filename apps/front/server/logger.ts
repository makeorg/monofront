import winston from 'winston';
import fs from 'fs';
import path from 'path';
import sourceMap from 'source-map';
import { env } from '@make.org/assets/env';
import { MAP_DIR, JS_DIR, BUILD_DIR } from './paths';

export const originalFilename = (filename: string): string =>
  filename.replace(/^([^/]+)\.[^/]+?\.js$/, '$1.js');

const createSourceMapConsumers = async (sourcesPath: fs.PathLike) => {
  const sourceMapConsumers = new Map();
  const items = fs.readdirSync(sourcesPath);
  const mapFiles = fs.readdirSync(MAP_DIR);
  const jsFiles = items.filter(item => item.endsWith('.js'));
  await Promise.all(
    jsFiles.map(async item => {
      const mapFile = `${originalFilename(item)}.map`;
      if (mapFiles.indexOf(mapFile) >= 0) {
        const contents = fs.readFileSync(path.join(MAP_DIR, mapFile), 'utf8');
        const consumer = await new sourceMap.SourceMapConsumer(contents);
        sourceMapConsumers.set(item, consumer);
      }

      return item;
    })
  );

  return sourceMapConsumers;
};

export const formatStack = (stack: string, sourceMapConsumers: any): string => {
  const replacement = (
    coresp: string,
    sourcename: string,
    sourceline: string,
    sourcecolumn: string
  ) => {
    if (!sourceMapConsumers.has(sourcename)) {
      return coresp;
    }
    const { source, column, line, name } = sourceMapConsumers
      .get(sourcename)
      .originalPositionFor({
        line: parseInt(sourceline, 10),
        column: parseInt(sourcecolumn, 10),
      });

    if (!source) {
      return coresp;
    }

    return `@${name}|${source}:${line}:${column}`;
  };

  const transformedStack = stack
    .replace(/\/([^/+]+\.js):([0-9]+):([0-9]+)/g, replacement)
    .replace(/\n/g, ' >>> ');

  return transformedStack;
};

const getLogFormat = (sourceMapReplace: any) => {
  const { printf } = winston.format;

  return printf(info => {
    const data: any = info instanceof Object ? info : { message: info };

    const infoLabel = data.label;
    delete data.label;

    const infoTime = data.timestamp;
    delete data.timestamp;

    const infoLevel = data.level;
    delete data.level;

    const infoStack =
      typeof data.stack === 'string'
        ? sourceMapReplace(data.stack)
        : data.stack;
    delete data.stack;

    const longFilename =
      data.fileName &&
      `${data.fileName}:${data.lineNumber}:${data.columnNumber}`;
    const originalName = longFilename && sourceMapReplace(longFilename);
    const message = JSON.stringify(
      originalName && originalName !== longFilename
        ? {
            ...data,
            original: originalName,
          }
        : data
    );

    // eslint-disable-next-line max-len
    return `infoTime:${infoTime}  infoLevel:${infoLevel} infoLabel:${infoLabel} message:${message} stackTrace:${infoStack}`;
  });
};

const isTestEnv = env.isTest();

let loggerInstance: any;
export const getLoggerInstance = async (): Promise<any> => {
  if (!loggerInstance) {
    const { combine, timestamp, label, simple } = winston.format;
    const sourceMapConsumersClient = await createSourceMapConsumers(JS_DIR);
    const sourceMapConsumersServer = await createSourceMapConsumers(BUILD_DIR);
    const sourceMapConsumers = new Map([
      ...sourceMapConsumersClient,
      ...sourceMapConsumersServer,
    ]);
    const sourceMapReplace = (stack: any) =>
      formatStack(stack, sourceMapConsumers);
    const logFormat = getLogFormat(sourceMapReplace);
    loggerInstance = winston.createLogger({
      silent: isTestEnv,
      format: combine(
        label({ label: 'front-accessible' }),
        timestamp(),
        simple(),
        logFormat
      ),
      transports: [new winston.transports.Console()],
    });
  }

  return loggerInstance;
};
