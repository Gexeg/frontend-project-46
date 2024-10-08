import { valueStates } from './const.js';

const getInsertedKeys = (oldKeys, newKeys) => Array.from(newKeys.difference(oldKeys));
const getRemovedKeys = (oldKeys, newKeys) => Array.from(oldKeys.difference(newKeys));
const getProbaplyChangedKeys = (oldKeys, newKeys) => Array.from(oldKeys.intersection(newKeys));

const getValuesWithMeta = (keys, object, state) => {
  const result = [];
  for (const key of keys) {
    result.push([key, {
      state,
      value: object[key],
    }]);
  }
  return result;
};

const getRemainingValuesMeta = (keys, oldObject, newObject) => {
  const result = [];

  for (const key of keys) {
    const oldValue = oldObject[key];
    const newValue = newObject[key];
    if (oldValue === newValue) {
      result.push([key, {
        state: valueStates.unchanged,
        value: oldValue,
      }]);
    } else {
      result.push([key, {
        state: valueStates.changed,
        value: oldValue,
        newValue,
      }]);
    }
  }
  return result;
};

const compareObjectsShallow = (oldObject, newObject) => {
  const oldKeys = new Set(Object.keys(oldObject));
  const newKeys = new Set(Object.keys(newObject));

  const insertedKeys = getInsertedKeys(oldKeys, newKeys);
  const insertedValues = getValuesWithMeta(insertedKeys, newObject, valueStates.inserted);

  const removedKeys = getRemovedKeys(oldKeys, newKeys);
  const removedValues = getValuesWithMeta(removedKeys, oldObject, valueStates.removed);

  const remainingKeys = getProbaplyChangedKeys(oldKeys, newKeys);
  const remainingValues = getRemainingValuesMeta(remainingKeys, oldObject, newObject);

  const result = [...insertedValues, ...removedValues, ...remainingValues].sort();
  return result;
};

export default compareObjectsShallow;
