#!/usr/bin/env node

import { expect, test } from '@jest/globals';
import fs from 'fs';
import gendiff from '../src/index.js';

test('gendiff', () => {
  const path1 = '__fixtures__/file1.json';
  const path2 = '__fixtures__/file2.json';
  // const result = getData(buildPath('../__fixtures__/expectTest.json'));
  const relativePathForExpect = '__fixtures__/expectTest.txt';
  const result = fs.readFileSync(relativePathForExpect, 'utf-8');
  expect(gendiff(path1, path2)).toEqual(result);
});
