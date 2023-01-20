import promBundle from 'express-prom-bundle';

const METRIC_PATH = '/metrics';

// define front middelware
export const metricsMiddleware = promBundle({
  includeMethod: true,
  includePath: true,
  includeUp: false,
  metricsPath: METRIC_PATH,
});
