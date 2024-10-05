#!/usr/bin/env node

import { program } from 'commander';
import { readFile, isFileAllowed} from '../libs/parser.js';
import compareObjectsShallow from '../libs/comparator.js';
import formatOutput from '../libs/formatter.js';

const command = (fp1, fp2) => {
  if (!isFileAllowed(fp1) || !isFileAllowed(fp2)) {
    console.log('Programm can compare only json files!');
    return;
  }
  const data1 = readFile(fp1);
  const data2 = readFile(fp2);
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
