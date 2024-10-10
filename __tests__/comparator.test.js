import { valueStates } from '../libs/const.js';
import compareObjectsShallow from '../libs/comparator.js';

test('compare json file positive', () => {
  const oldData = {
    b: 'some_data_to_remove', a: 123, c: false, e: { nested: { go_deeper: 1, key_to_remove: 2 } },
  };
  const newData = {
    a: 123, d: 'some_new_data', c: true, e: { nested: { go_deeper: 1 }, key_to_add: 3 },
  };

  const expected = {
    state: 'changed',
    value: {
      a: { state: valueStates.unchanged, value: 123 },
      b: { state: valueStates.removed, value: 'some_data_to_remove' },
      c: {
        nested: false, newValue: true, state: valueStates.changed, value: false,
      },
      d: { state: valueStates.inserted, value: 'some_new_data' },
      e: {
        nested: true,
        state: valueStates.changed,
        value: {
          key_to_add: {
            state: valueStates.inserted,
            value: 3,
          },
          nested: {
            nested: true,
            state: valueStates.changed,
            value: {
              go_deeper: {
                state:
              valueStates.unchanged,
                value: 1,
              },
              key_to_remove: {
                state: valueStates.removed,
                value: 2,
              },
            },
          },
        },
      },
    },
  };
  expect(compareObjectsShallow(oldData, newData)).toEqual(expected);
});
