#!/usr/bin/env node
import { Command } from 'commander';
import { formatterNames } from '../libs/const.js';
import genDiff from '../src/index.js';

const program = new Command();

program
  .version('0.3.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format', 'stylish')
  .arguments('<fp1> <fp2>')
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
