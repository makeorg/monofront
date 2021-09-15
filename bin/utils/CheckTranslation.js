import fs from 'fs';

const allKeys = (obj, current = '') => {
  const keys = Object.keys(obj);
  const all = keys.map(value => {
    if (value.includes('.')) {
      throw new Error(
        `Invalid key format. Remove dot character from "${value}"`
      );
    }
    if (typeof obj[value] === 'string') {
      return current.length ? `${current}.${value}` : value;
    }
    const newCurrent = current === '' ? value : `${current}.${value}`;
    return allKeys(obj[value], newCurrent);
  });

  return all.flat();
};

const decomposeKey = key => {
  const decomposedKeys = [];
  key.split('.').reduce(accumulator => {
    decomposedKeys.push(accumulator);

    return accumulator.replace(/\.[^.]+$/, '');
  }, key);

  return decomposedKeys;
};

const getExtraKeys = (keysToCheck, referenceKeys) => {
  const keysToRemove = new Set();
  const allReferenceKeys = new Set(referenceKeys.map(decomposeKey).flat());
  const allKeysToCheck = new Set(keysToCheck.map(decomposeKey).flat());

  allKeysToCheck.forEach(key => {
    if (!allReferenceKeys.has(key)) {
      keysToRemove.add(key);
    }
  });

  return keysToRemove;
};

const getMissingKeys = (keysToCheck, referenceKeys) => {
  const keysToAdd = new Set();
  referenceKeys.forEach(key => {
    if (!keysToCheck.includes(key)) {
      keysToAdd.add(key);
    }
  });

  return keysToAdd;
};

const getTranslationFilenames = directory =>
  fs
    .readdirSync(directory, { withFileTypes: true })
    .map(file => file.name)
    .filter(file => file.match(/^.*\.json/));

const loadTranslationObjFromFilenames = (filenames, translationFilesDir) =>
  Promise.all(
    filenames.map(async name => {
      // eslint-disable-next-line import/no-dynamic-require
      const trans = require(`${translationFilesDir}/${name}`);
      const language = name.slice(0, -5);
      return {
        language,
        trans,
        filename: name,
      };
    })
  );

const removeKey = (obj, concatKey) => {
  concatKey.split('.').reduce((accumulator, currentValue, index, array) => {
    if (index === array.length - 1 && accumulator) {
      delete accumulator[currentValue];
      return null;
    }
    if (
      !accumulator ||
      typeof accumulator[currentValue] === 'string' ||
      accumulator[currentValue] === undefined
    ) {
      return null;
    }

    return accumulator[currentValue];
  }, obj);
};

const addKey = (translationObj, referenceObj, concatKey, mainLanguageLabel) => {
  const replacementValue = initialValue =>
    `@@${concatKey}|${mainLanguageLabel}:${initialValue}`;

  const reducer = (accumulator, currentValue) => {
    const { transObj, refObj } = accumulator;

    const sameValueType =
      typeof refObj[currentValue] === typeof transObj[currentValue];
    const refObjValueIsString = typeof refObj[currentValue] === 'string';
    const keyExist = currentValue in transObj;

    if (!keyExist || !sameValueType) {
      transObj[currentValue] = {};
    }

    if (!keyExist && refObjValueIsString) {
      transObj[currentValue] = replacementValue(refObj[currentValue]);
    }

    return {
      transObj: transObj[currentValue],
      refObj: refObj[currentValue],
    };
  };

  concatKey.split('.').reduce(reducer, {
    transObj: translationObj,
    refObj: { ...referenceObj },
  });
};

export const analyseTranslation = (transObj, mainTransObj) => {
  const referenceKeys = allKeys(mainTransObj.trans);
  const extraKeys = getExtraKeys(allKeys(transObj.trans), referenceKeys);
  const missingKeys = getMissingKeys(allKeys(transObj.trans), referenceKeys);
  const fixedTrans = { ...transObj.trans };
  extraKeys.forEach(key => {
    removeKey(fixedTrans, key);
  });
  missingKeys.forEach(key => {
    addKey(fixedTrans, mainTransObj.trans, key, mainTransObj.language);
  });
  return {
    language: transObj.language,
    extraKeysCount: extraKeys.size,
    missingKeysCount: missingKeys.size,
    extraKeys,
    missingKeys,
    original: transObj.trans,
    fixedTrans,
    filename: transObj.filename,
  };
};

export const analyse = async (translationFilesDir, mainLanguage = 'fr') => {
  const translations = await loadTranslationObjFromFilenames(
    await getTranslationFilenames(translationFilesDir),
    translationFilesDir
  );

  const mainTransObj = translations.find(
    transObj => transObj.language === mainLanguage
  );
  if (!mainTransObj) {
    throw new Error(`Main translation "${mainLanguage}" not found`);
  }
  const allTransObj = translations.filter(
    transObj => transObj.language !== mainLanguage
  );

  const failedResults = [];
  allTransObj.forEach(transObj => {
    const result = analyseTranslation(transObj, mainTransObj);
    if (result.extraKeysCount || result.missingKeysCount) {
      failedResults.push(result);
    }
  });

  return {
    results: failedResults,
    totalTransCount: allTransObj.length,
    transList: allTransObj.map(item => item.language),
  };
};

export const fixTranslationFile = (filePath, fixedTrans) => {
  fs.writeFileSync(filePath, JSON.stringify(fixedTrans, null, 2));
};
