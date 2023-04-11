#!/usr/bin/env node

import { program } from 'commander';

program
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .option('-V, --version', 'output the version number')
  // .option('-h, --help', 'display help for command')
  .parse();
  