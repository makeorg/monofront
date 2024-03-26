export interface ILogger {
  logError: (x: unknown) => void;
  logInfo: (x: unknown) => void;
  logWarning: (x: unknown) => void;
}
