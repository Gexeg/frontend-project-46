import getFileParser from '../libs/parser.js';

let jsonFilePath;
let csvFilePath;
let ymlFilePath;

beforeAll(() => {
  jsonFilePath = '__tests__/__fixtures__/file1.json';
  ymlFilePath = '__tests__/__fixtures__/file1.yml';
  csvFilePath = '__tests__/__fixtures__/wrong_file.csv';
});

test('read json file positive', () => {
  const expected = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const parser = getFileParser(jsonFilePath);
  expect(parser(jsonFilePath)).toEqual(expected);
});


test('read yml file positive', () => {
  const expected = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const parser = getFileParser(ymlFilePath);
  expect(parser(ymlFilePath)).toEqual(expected);
});


test('read non json file', () => {
  const parser = getFileParser(csvFilePath);
  expect(parser).toBe(undefined);
});