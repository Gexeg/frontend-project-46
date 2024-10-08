import getFileParser from '../libs/parser.js';

let jsonFilePath;
let csvFilePath;
let ymlFile1Path;
let ymlFile2Path;

beforeAll(() => {
  jsonFilePath = '__tests__/__fixtures__/file1.json';
  ymlFile1Path = '__tests__/__fixtures__/file1.yml';
  ymlFile2Path = '__tests__/__fixtures__/file2.yaml';
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
  const expected1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };
  const parser1 = getFileParser(ymlFile1Path);
  expect(parser1(ymlFile1Path)).toEqual(expected1);

  const expected2 = {
    host: 'hexlet.io',
    timeout: 20,
    verbose: true,
  };

  const parser = getFileParser(ymlFile2Path);
  expect(parser(ymlFile2Path)).toEqual(expected2);
});

test('read non json file', () => {
  const parser = getFileParser(csvFilePath);
  expect(parser).toBe(undefined);
});
