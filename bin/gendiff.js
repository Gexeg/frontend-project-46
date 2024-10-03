#!/usr/bin/env node

import { program } from 'commander';

const command = () => {
  console.log('Hello, World!');
};

program
  .name('gendiff')
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .requiredOption('-f, --format <type>', 'Output format');

program
    .command('gendiff')
    .argument('<format>', 'user to login')
    .action(command);

program.parse();