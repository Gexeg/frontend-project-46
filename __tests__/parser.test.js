import {readFile, isFileAllowed} from '../libs/parser.js';

let jsonFilePath;
let csvFilePath;

beforeAll(() => {
    jsonFilePath = '__tests__/__fixtures__/file1.json';
    csvFilePath = '__tests__/__fixtures__/wrong_file.csv';
});

test('read json file positive', () => {
    const expected = {
        "host": "hexlet.io",
        "timeout": 50,
        "proxy": "123.234.53.22",
        "follow": false
    }
    expect(readFile(jsonFilePath)).toEqual(expected)
});


test('read non json file', () => {
    expect(() => {
        readFile(csvFilePath);
      }).toThrow(SyntaxError);
});

test('check is file allowed', () =>{
    expect(isFileAllowed(jsonFilePath)).toBe(true);
    expect(isFileAllowed(csvFilePath)).toBe(false);
});