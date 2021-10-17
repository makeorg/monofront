import winston from 'winston';
import fs from 'fs';
import path from 'path';
import sourceMap, {
  BasicSourceMapConsumer,
  IndexedSourceMapConsumer,
} from 'source-map';
import { env } from '@make.org/assets/env';
import { DataNormalizer, normalizeData } from './loggerNormalizer';

export const originalFilename = (filename: string): string =>
  filename.replace(/^([^/]+)\.[^/]+?\.js$/, '$1.js');

const createSourceMapConsumers = async (
  sourcesPath: string,
  mapPath: string
): Promise<Map<string, BasicSourceMapConsumer | IndexedSourceMapConsumer>> => {
  const sourceMapConsumers = new Map();
  const items = fs.readdirSync(sourcesPath);
  const mapFiles = fs.readdirSync(mapPath);
  const jsFiles = items.filter(item => item.endsWith('.js'));
  await Promise.all(
    jsFiles.map(async item => {
      const mapFile = `${originalFilename(item)}.map`;
      if (mapFiles.indexOf(mapFile) >= 0) {
        const contents: string = fs.readFileSync(
          path.join(mapPath, mapFile),
          'utf8'
        );
        const consumer = await new sourceMap.SourceMapConsumer(contents);
        sourceMapConsumers.set(item, consumer);
      }

      return item;
    })
  );

  return sourceMapConsumers;
};

export const formatStack = (
  stack: string,
  sourceMapConsumers: Map<
    string,
    BasicSourceMapConsumer | IndexedSourceMapConsumer
  >
): string => {
  const replacement = (
    coresp: string,
    sourcename: string,
    sourceline: string,
    sourcecolumn: string
  ) => {
    if (!sourceMapConsumers.has(sourcename)) {
      return coresp;
    }
    const sourceMapConsumer = sourceMapConsumers.get(sourcename);
    if (!sourceMapConsumer) {
      return coresp;
    }

    const { source, column, line, name } =
      sourceMapConsumer.originalPositionFor({
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

const getLogFormat = (sourceMapReplace: (stack: string) => string) => {
  const { printf } = winston.format;

  return printf(info => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data: any = info instanceof Object ? info : { message: info };

    const infoLabel = data.label;
    delete data.label;

    const infoTime = data.timestamp;
    delete data.timestamp;

    const infoLevel = data.level;
    delete data.level;

    const infoStack =
      (typeof data.stack === 'string'
        ? sourceMapReplace(data.stack)
        : data.stack) || '-';
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

    return `infoTime:${infoTime} infoLabel:${infoLabel} infoLevel:${infoLevel} message:${message} stackTrace:${infoStack}`;
  });
};

interface ServerLogger {
  logError: (x: unknown) => void;
  logInfo: (x: unknown) => void;
  logWarning: (x: unknown) => void;
}

let logger: ServerLogger = {
  // eslint-disable-next-line no-console
  logError: error => console.error('Logger not initialized', error),
  // eslint-disable-next-line no-console
  logInfo: info => console.log('Logger not initialized', info),
  // eslint-disable-next-line no-console
  logWarning: warning => console.warn('Logger not initialized', warning),
};

const isTestEnv = env.isTest();

export const initLogger = async (
  instanceLabel: string,
  clientSourcesPath: string,
  serverSourcesPath: string,
  mapPath: string,
  dataNormalizers: DataNormalizer[] = []
): Promise<void> => {
  const { combine, timestamp, label, simple } = winston.format;
  const sourceMapConsumersClient = await createSourceMapConsumers(
    clientSourcesPath,
    mapPath
  );
  const sourceMapConsumersServer = await createSourceMapConsumers(
    serverSourcesPath,
    mapPath
  );
  const sourceMapConsumers = new Map([
    ...sourceMapConsumersClient,
    ...sourceMapConsumersServer,
  ]);
  const sourceMapReplace = (stack: string) =>
    formatStack(stack, sourceMapConsumers);
  const logFormat = getLogFormat(sourceMapReplace);
  const winstonLoggerInstance = winston.createLogger({
    silent: isTestEnv,
    format: combine(
      label({ label: instanceLabel }),
      timestamp(),
      simple(),
      logFormat
    ),
    transports: [new winston.transports.Console()],
  });

  logger = {
    logError: error =>
      winstonLoggerInstance.log('error', normalizeData(error, dataNormalizers)),
    logInfo: info =>
      winstonLoggerInstance.log('info', normalizeData(info, dataNormalizers)),
    logWarning: warning =>
      winstonLoggerInstance.log(
        'warn',
        normalizeData(warning, dataNormalizers)
      ),
  };

  return Promise.resolve();
};

export const getLoggerInstance = (): ServerLogger => logger;
