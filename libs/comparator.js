import { valueStates } from './const.js';

export const keyStates = {
  remaining: 'remaining',
  inserted: 'inserted',
  removed: 'removed',
};

const getKeys = (object) => {
  if (Object.keys(object) === 0) {
    return new Set();
  }
  return new Set(Object.keys(object).sort());
};

const getInsertedKeys = (oldKeys, newKeys) => {
  const result = [];
  for (const key of newKeys.difference(oldKeys)) {
    result.push([key, keyStates.inserted]);
  }
  return result;
};

const getRemovedKeys = (oldKeys, newKeys) => {
  const result = [];
  for (const key of oldKeys.difference(newKeys)) {
    result.push([key, keyStates.removed]);
  }
  return result;
};

const getProbaplyChangedKeys = (oldKeys, newKeys) => {
  const result = [];
  for (const key of oldKeys.intersection(newKeys)) {
    result.push([key, keyStates.remaining]);
  }
  return result;
};

const compareKeys = (keys, oldObject, newObject) => {
  const result = {};

  // https://stackoverflow.com/questions/55844608/stuck-with-eslint-error-i-e-separately-loops-should-be-avoided-in-favor-of-arra
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, keyState] of keys) {
    switch (keyState) {
      case keyStates.inserted:
        result[key] = {
          state: valueStates.inserted,
          newValue: newObject[key],
        };
        break;
      case keyStates.removed:
        result[key] = {
          state: valueStates.removed,
          oldValue: oldObject[key],
        };
        break;
      case keyStates.remaining: {
        const oldValue = oldObject[key];
        const newValue = newObject[key];
        if (oldValue === newValue) {
          result[key] = {
            state: valueStates.unchanged,
            oldValue,
          };
        } else {
          result[key] = {
            state: valueStates.changed,
            oldValue,
            newValue,
          };
        }
      }
        break;
      default:
        break;
    }
  }
  return result;
};

const compareObjectsShallow = (oldObject, newObject) => {
  const oldKeys = getKeys(oldObject);
  const newKeys = getKeys(newObject);

  const insertedKeys = getInsertedKeys(oldKeys, newKeys);
  const removedKeys = getRemovedKeys(oldKeys, newKeys);
  const getRemainingKeys = getProbaplyChangedKeys(oldKeys, newKeys);

  const sortedKeysWithStates = [...insertedKeys, ...removedKeys, ...getRemainingKeys].sort();

  const comparedValues = compareKeys(sortedKeysWithStates, oldObject, newObject);

  return comparedValues;
};

export default compareObjectsShallow;
