import { valueStates } from '../libs/const.js';
import compareObjectsShallow from '../libs/comparator.js';

test('compare json file positive', () => {
  const oldData = { b: 'some_data_to_remove', a: 123, c: false };
  const newData = { a: 123, d: 'some_new_data', c: true };

  const expected = {
    a: { state: valueStates.unchanged, oldValue: 123 },
    b: { state: valueStates.removed, oldValue: 'some_data_to_remove' },
    c: { state: valueStates.changed, oldValue: false, newValue: true },
    d: { state: valueStates.inserted, newValue: 'some_new_data' },
  };

  expect(compareObjectsShallow(oldData, newData)).toEqual(expected);
});
