import fs from 'fs';
import path from 'path';
import sourceMap, {
  BasicSourceMapConsumer,
  IndexedSourceMapConsumer,
} from 'source-map';
import { DataLog } from './loggerNormalizer';

export type LogTransformer = { (data: DataLog): DataLog };

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

  const transformedStack = stack.replace(
    /\/([^/+]+\.js):([0-9]+):([0-9]+)/g,
    replacement
  );

  return transformedStack;
};

export const getStackTransformer = async (
  clientSourcesPath: string,
  serverSourcesPath: string,
  mapPath: string
): Promise<(data: DataLog) => DataLog> => {
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
  const stackTransformer = (stack: string) =>
    formatStack(stack, sourceMapConsumers);

  return <T>(
    data: T & {
      stack?: string;
      fileName?: string;
      lineNumber?: number;
      columnNumber?: number;
    }
  ): DataLog | T => {
    if (!data.stack || data.stack === '-') {
      return data;
    }

    const newStack =
      (typeof data.stack === 'string'
        ? stackTransformer(data.stack)
        : data.stack) || '-';

    const longFilename =
      data.fileName &&
      `${data.fileName}:${data.lineNumber}:${data.columnNumber}`;

    const originalName = longFilename && stackTransformer(longFilename);
    const newData =
      originalName && originalName !== longFilename
        ? {
            ...data,
            original: originalName,
          }
        : data;

    return {
      ...newData,
      stack: newStack,
    };
  };
};

export const oneLineTransformer = (data: DataLog): DataLog => {
  let newData = data;
  if (data.message) {
    newData = {
      ...newData,
      message: data.message.replace(/\r?\n|\r/g, ' >>> '),
    };
  }
  if (data.stack) {
    newData = {
      ...newData,
      stack: data.stack.replace(/\r?\n|\r/g, ' >>> '),
    };
  }

  return newData;
};

export const transformData = (
  data: DataLog,
  LogTransformers: LogTransformer[] = []
): DataLog => {
  let formatedData = data;
  LogTransformers.forEach(transform => {
    formatedData = transform(formatedData);
  });

  return formatedData;
};
