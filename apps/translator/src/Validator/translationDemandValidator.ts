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

export const multiTranslationDemandSchemaValidator: Schema = {
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
  targetLanguages: {
    notEmpty: {
      errorMessage: 'Not empty value',
      bail: true,
    },
    isArray: {
      errorMessage: 'Expected an array value',
    },
  },
  'targetLanguages.*': {
    isString: {
      errorMessage: 'Expected an array value',
    },
  },
};
