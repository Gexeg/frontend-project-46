import { valueStates } from './const.js';
import { isObject } from './utils.js';

const keyTypes = {
  inserted: 'inserted',
  removed: 'removed',
  remain: 'remain',
};

const compareObjectsNested = (oldObject, newObject) => {
  if (JSON.stringify(oldObject) === JSON.stringify(newObject)) {
    return { state: valueStates.unchanged, value: oldObject };
  }
  const oldKeys = new Set(Object.keys(oldObject));
  const newKeys = new Set(Object.keys(newObject));
  const keysWithStates = compareKeys(oldKeys, newKeys);
  const result = keysWithStates.reduce((acc, [key, type]) => {
    switch (type) {
      case keyTypes.inserted:
        acc[key] = { state: valueStates.inserted, value: newObject[key] };
        break;
      case keyTypes.removed:
        acc[key] = { state: valueStates.removed, value: oldObject[key] };
        break;
      default: // keyTypes.remain
        acc[key] = processRemainingKey(key, oldObject, newObject);
    }
    return acc;
  }, {});
  return { state: valueStates.changed, value: result };
};

function compareKeys(oldKeys, newKeys) {
  const inserted = Array.from(newKeys.difference(oldKeys)).map((key) => [key, keyTypes.inserted]);
  const removed = Array.from(oldKeys.difference(newKeys)).map((key) => [key, keyTypes.removed]);
  const remain = Array.from(oldKeys.intersection(newKeys)).map((key) => [key, keyTypes.remain]);
  return [...inserted, ...removed, ...remain].sort();
}

function processRemainingKey(key, oldObject, newObject) {
  const oldValue = oldObject[key];
  const newValue = newObject[key];
  if (oldValue === newValue) {
    return {
      state: valueStates.unchanged,
      value: oldValue,
    };
  } if (isObject(oldValue) && isObject(newValue)) {
    return { nested: true, ...compareObjectsNested(oldValue, newValue) };
  }
  return {
    nested: false,
    state: valueStates.changed,
    value: oldValue,
    newValue,
  };
}

export default compareObjectsNested;
