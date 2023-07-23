#!/usr/bin/env node

import { expect, test } from '@jest/globals';
import fs from 'fs';
import gendiff from '../src/gendiff.js';

const stylishExpect = fs.readFileSync('__tests__/stylishExpect.txt', 'utf-8');
test('test1 - Default_json', () => {
  expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json')).toEqual(stylishExpect);
});
test('test2 - Default_yml', () => {
  expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml')).toEqual(stylishExpect);
});
test('test3 - Default_yaml', () => {
  expect(gendiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml')).toEqual(stylishExpect);
});
test('test4 - Stylish_json', () => {
  expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'stylish')).toEqual(stylishExpect);
});
test('test5 - Stylish_yml', () => {
  expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'stylish')).toEqual(stylishExpect);
});
test('test6 - Stylish_yaml', () => {
  expect(gendiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'stylish')).toEqual(stylishExpect);
});

const plainExpect = fs.readFileSync('__tests__/plainExpect.txt', 'utf-8');
test('test7 - Plain_json', () => {
  expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'plain')).toEqual(plainExpect);
});
test('test8 - Plain_yml', () => {
  expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'plain')).toEqual(plainExpect);
});
test('test9 - Plain_yaml', () => {
  expect(gendiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'plain')).toEqual(plainExpect);
});

const jsonExpect = fs.readFileSync('__tests__/jsonExpect.txt', 'utf-8');
test('test10 - Json_json', () => {
  expect(gendiff('__fixtures__/file1.json', '__fixtures__/file2.json', 'json')).toEqual(jsonExpect);
});
test('test11 - Json_yml', () => {
  expect(gendiff('__fixtures__/file1.yml', '__fixtures__/file2.yml', 'json')).toEqual(jsonExpect);
});
test('test12 - Json_yaml', () => {
  expect(gendiff('__fixtures__/file1.yaml', '__fixtures__/file2.yaml', 'json')).toEqual(jsonExpect);
});
