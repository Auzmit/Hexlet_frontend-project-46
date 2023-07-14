import _ from 'lodash';
import path from 'path';
// import fs from 'fs'; /* for me */
// import stylishingDiff from './stylish.js';
import getData from './parsers.js';

function buildPath(relativePath) { return (path.resolve(process.cwd(), relativePath)); }

// const path1 = '__fixtures__/file1.json';
// const path2 = '__fixtures__/file2.json';
const path1 = '__fixtures__/My_file1.json';
const path2 = '__fixtures__/My_file2.json';

const data1 = getData(buildPath(path1));
const data2 = getData(buildPath(path2));
const mergedData = _.merge(data1, data2);

let sortedMergedData = {};
let pathToValue = 'mergedData';
let pathToKey = 'mergedData';
function recursiveIteration(mergedData) {
  let keys = Object.keys(mergedData).sort();
  keys.forEach((key) => {
    sortedMergedData.[`${}`]
  });
}

/* const sortedMergedData = Object.keys(mergedData).sort();
sortedMergedData.forEach((key) => {
  console.log(`${key} : ${mergedData[key]}`);
}); */
