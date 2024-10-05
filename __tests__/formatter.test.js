import { valueStates } from '../libs/const.js';
import formatOutput from '../libs/formatter.js';

let compareResult;


beforeAll(() => {
    compareResult = {
        a: { state: valueStates.unchanged, oldValue: 123},
        b: { state: valueStates.removed, oldValue: 'some_data_to_remove'},
        c: { state: valueStates.changed, oldValue: false, newValue: true },
        d: { state: valueStates.inserted, newValue: 'some_new_data' },
    };
});

test('format', () => {
    const expected = '{\n\t a: 123\n\t-b: some_data_to_remove\n\t-c: false\n\t+c: true\n\t+d: some_new_data\n}'
    expect(formatOutput(compareResult)).toEqual(expected)
});