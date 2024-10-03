#!/usr/bin/env node

import { program } from 'commander';

const command = () => {
  console.log('Hello, World!');
};

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')

program
    .command('gendiff')
    .action(command);

program.parse();