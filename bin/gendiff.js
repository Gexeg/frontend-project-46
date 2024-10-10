#!/usr/bin/env node
import { program } from 'commander';
import { formatterNames } from '../libs/const.js';
import genDiff from '../src/index.js';

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
