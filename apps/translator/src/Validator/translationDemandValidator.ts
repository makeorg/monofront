import { Schema } from 'express-validator';

export const translationDemandSchemaValidator: Schema = {
  sourceLanguage: {
    notEmpty: {
      errorMessage: 'Not empty value',
      bail: true,
    },
    isString: {
      errorMessage: 'Expected a string value',
    },
  },
  text: {
    notEmpty: {
      errorMessage: 'Not empty value',
      bail: true,
    },
    isString: {
      errorMessage: 'Expected a string value',
    },
  },
  targetLanguage: {
    notEmpty: {
      errorMessage: 'Not empty value',
      bail: true,
    },
    isString: {
      errorMessage: 'Expected a string value',
    },
  },
};
