import { valueStates, formatterNames } from '../libs/const.js';
import formatOutput from '../libs/formatters/formatterGetter.js';

let compareResult;

beforeAll(() => {
  compareResult = {
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
});

test('format', () => {
  const expected = `{
      a: 123,
    - b: some_data_to_remove,
    - c: false,
    + c: true,
    + d: some_new_data,
      e: {
        + key_to_add: 3,
          nested: {
              go_deeper: 1,
            - key_to_remove: 2
        }
    }
}`;
  expect(formatOutput(formatterNames.stylish, compareResult)).toEqual(expected);
});
