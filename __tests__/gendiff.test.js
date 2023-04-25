#!/usr/bin/env node
/* eslint-disable */

import { expect, test } from '@jest/globals';
import _ from 'lodash';
import fs from 'fs';
import gendiff from '../src/index.js';
// import path from 'path';
// import stylishedDiff from './stylish.js';

// function buildPath(relativePath) { return (path.resolve(process.cwd(), relativePath)); }
// function getData(absolutePath) { return (JSON.parse(fs.readFileSync(absolutePath), 'utf-8')); }
// const readFile = (filename) => fs.readFileSync(path, 'utf-8');

test('gendiff', () => {
  const path1 = '__fixtures__/file1.json';
  const path2 = '__fixtures__/file2.json';
  // const result = getData(buildPath('../__fixtures__/expectTest.json'));
  const relativePathForExpect = '__fixtures__/expectTest.json';
  const result = fs.readFileSync(relativePathForExpect, 'utf-8');
  expect(gendiff(path1, path2)).toEqual(result);
});
