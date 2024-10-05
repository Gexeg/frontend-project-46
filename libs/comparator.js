import { valueStates } from './const.js';

export const keyStates = {
  remaining: 'remaining',
  inserted: 'inserted',
  removed: 'removed',
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
  const oldKeys = new Set(Object.keys(oldObject));
  const newKeys = new Set(Object.keys(newObject));

  const insertedKeys = getInsertedKeys(oldKeys, newKeys);
  const removedKeys = getRemovedKeys(oldKeys, newKeys);
  const getRemainingKeys = getProbaplyChangedKeys(oldKeys, newKeys);

  const sortedKeysWithStates = [...insertedKeys, ...removedKeys, ...getRemainingKeys].sort();

  const comparedValues = compareKeys(sortedKeysWithStates, oldObject, newObject);

  return comparedValues;
};

export default compareObjectsShallow;
