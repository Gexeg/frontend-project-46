import { valueStates, formatterNames } from '../libs/const.js';
import formatOutput from '../libs/formatters/index.js';

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
      f: { state: valueStates.inserted, value: { abc: 123 } },
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

test('stylish format', () => {
  const expected = `{
      a: 123,
    - b: some_data_to_remove,
    - c: false,
    + c: true,
    + f: {
        abc: 123
    },
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

test('plain format', () => {
  const expected = `Property 'b' was removed
Property 'c' was updated. From 'false' to 'true'
Property 'f' was added with value: '[complex value]'
Property 'd' was added with value: 'some_new_data'
Property 'e.key_to_add' was added with value: '3'
Property 'e.nested.key_to_remove' was removed`;
  expect(formatOutput(formatterNames.plain, compareResult)).toEqual(expected);
});

test('json format', () => {
  const expected = {
    state: 'changed',
    value: {
      a: {
        state: 'unchanged',
        value: 123,
      },
      b: {
        state: 'removed',
        value: 'some_data_to_remove',
      },
      c: {
        nested: false,
        newValue: true,
        state: 'changed',
        value: false,
      },
      d: {
        state: 'inserted',
        value: 'some_new_data',
      },
      e: {
        nested: true,
        state: 'changed',
        value: {
          key_to_add: {
            state: 'inserted',
            value: 3,
          },
          nested: {
            nested: true,
            state: 'changed',
            value: {
              go_deeper: {
                state: 'unchanged',
                value: 1,
              },
              key_to_remove: {
                state: 'removed',
                value: 2,
              },
            },
          },
        },
      },
      f: {
        state: 'inserted',
        value: {
          abc: 123,
        },
      },
    },
  };
  expect(formatOutput(formatterNames.json, compareResult)).toEqual(expected);
});
