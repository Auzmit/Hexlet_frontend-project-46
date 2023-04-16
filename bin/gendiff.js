#!/usr/bin/env node

import { program } from 'commander';

program
  .version('0.0.1')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  //.option('-V, --version', 'output the version number')
  // .option('-h, --help', 'display help for command')
  .parse();
