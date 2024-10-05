#!/usr/bin/env node

import { program } from 'commander';
import readJsonFile from '../libs/parser.js';
import compareObjectsShallow from '../libs/comparator.js';
import formatOutput from '../libs/formatter.js';

const command = (fp1, fp2) => {
  const data1 = readJsonFile(fp1);
  const data2 = readJsonFile(fp2);
  const changelog = compareObjectsShallow(data1, data2);
  const output = formatOutput(changelog);
  console.log(output);
};

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'Output format');

program
  .command('gendiff')
  .argument('<fp1>', 'path to first file for comparsion')
  .argument('<fp2>', 'path to first file for comparsion')
  .action(command);

program.parse();
