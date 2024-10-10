#!/usr/bin/env node

import { program } from 'commander';
import getFileParser from '../libs/parser.js';
import compareObjectsShallow from '../libs/comparator.js';
import formatOutput from '../libs/formatters/index.js';
import { formatterNames } from '../libs/const.js';

const genDiff = (fp1, fp2, formatName = formatterNames.stylish) => {
  const parser1 = getFileParser(fp1);
  const parser2 = getFileParser(fp2);
  if (!parser1 || !parser2) {
    console.log('This is an unsupported file types');
    return undefined;
  }
  const data1 = parser1(fp1);
  const data2 = parser2(fp2);
  const changelog = compareObjectsShallow(data1, data2);
  const output = formatOutput(formatName, changelog);
  return output;
};

program
  .name('gendiff')
  .version('0.1.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'Output format', formatterNames.stylish);

program
  .command('gendiff')
  .argument('<fp1>', 'path to first file for comparsion')
  .argument('<fp2>', 'path to first file for comparsion')
  .action((fp1, fp2) => {
    const options = program.opts();
    const format = options.format || formatterNames.stylish;
    try {
      const result = genDiff(fp1, fp2, format);
      console.log(result);
    } catch (error) {
      console.error(error.message);
    }
  });

program.parse();

export default genDiff;
