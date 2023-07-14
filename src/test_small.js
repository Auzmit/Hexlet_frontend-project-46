// import _ from 'lodash';
import path from 'path';
// import fs from 'fs'; /* for me */
// import stylishingDiff from './stylish.js';
import getData from './parsers.js';

// const relativePath = '../mergedData.json';

function buildPath() { return (path.resolve(process.cwd(), './mergedData.json')); }
const obj = getData(buildPath());

const newKeyAddress = 'common.settings58';
obj[`${newKeyAddress}`] = 'ertfg';
obj.common.settings25 = 'owf';

console.log(obj);
