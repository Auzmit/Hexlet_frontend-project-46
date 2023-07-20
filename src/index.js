import _ from 'lodash';
import path from 'path';
import fs from 'fs'; /* for me */
// import stylishingDiff from './stylish.js';
import getData from './parsers.js';

function buildPath(relativePath) { return (path.resolve(process.cwd(), relativePath)); }

export default function gendiff(path1, path2) {
  const data1 = getData(buildPath(path1));
  const data2 = getData(buildPath(path2));
  const mergedData = _.merge(data1, data2);

  const findDifferences = (file1, file2) => {
    const allKeys = _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));
    const differences = allKeys.map((key) => {
      if (_.has(file1, key) && !_.has(file2, key)) {
        return { name: key, value: file1[key], status: 'removed' };
      }
      if (!_.has(file1, key) && _.has(file2, key)) {
        return { name: key, value: file2[key], status: 'added' };
      }
      if (file1[key] === file2[key]) {
        return { name: key, value: file1[key], status: 'unchanged' };
      }
      if (_.isObject(file1[key]) && _.isObject(file2[key])) {
        return { name: key, value: findDifferences(file1[key], file2[key]), status: 'nested' };
      }
      return {
        name: key, oldValue: file1[key], value: file2[key], status: 'updated',
      };
    });
    return differences;
  };

  const stylish = (currentKey, currentValue, depth) => {
    if (!_.isObject(currentValue)) {
      return `${currentKey}: ${currentValue}`;
    }
    const indentBefore = '  '.repeat(depth);
    const bracketIndent = '  '.repeat(depth - 1);
    const lines = Object.entries(currentValue).flatMap(([key, ent]) => `  ${stylish(key, ent, depth + 2)}`);

    return `${currentKey}: {\n${indentBefore}${lines.join(`\n${indentBefore}`)}\n${bracketIndent}}`;
  };

  // export default
  function stylishFormatter(tree) {
    const iter = (objects, depth) => {
      const indentBefore = '  '.repeat(depth);
      const bracketIndent = '  '.repeat(depth - 1);
      const stylishedObjects = objects.flatMap((object) => {
        const { name, value, status } = object;
        const line = stylish(name, value, depth + 2);
        if (status === 'removed') { return `- ${line}`; }
        if (status === 'added') { return `+ ${line}`; }
        if (status === 'unchanged') { return `  ${line}`; }
        if (status === 'updated') { return [`- ${stylish(name, object.oldValue, depth + 2)}`, `+ ${line}`]; }
        if (status === 'nested') { return `  ${name}: ${iter(value, depth + 2)}`; }
        return `  ${line}`;
      });
      return `{\n${indentBefore}${stylishedObjects.join(`\n${indentBefore}`)}\n${bracketIndent}}`;
    };
    return iter(tree, 1);
  }

  console.log(stylishFormatter(findDifferences(data1, data2)));
  fs.writeFileSync('findDifferences.json', JSON.stringify(stylishFormatter(findDifferences(data1, data2))), 'utf-8');

  /* function recursiveSortingObject(obj) {
    const sortedObj = {};
    Object.keys(obj).sort().forEach((key) => {
      if (obj[key] === null) {
        sortedObj[key] = null;
      } else if (obj[key] === undefined) {
        sortedObj[key] = undefined;
      } else if (typeof obj[key] === 'object') {
        sortedObj[key] = recursiveSortingObject(obj[key]);
      } else {
        sortedObj[key] = obj[key];
      }
    });
    return sortedObj;
  }
  const sortedMergedData = recursiveSortingObject(mergedData); */
  // fs.writeFileSync('sortedMergedData.json', JSON.stringify(sortedMergedData), 'utf-8');

  // console.log(sortedMergedData);
  // fs.writeFileSync('mergedData.json', JSON.stringify(mergedData), 'utf-8');

  /* eslint-disable */
  /* function objectToArray(obj) {
    const result = [];
  
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        result.push([key, objectToArray(obj[key])]);
      } else {
        result.push([key, obj[key]]);
      }
    }
  
    return result;
  } */
  /* eslint-enable */
  // const arrData1 = objectToArray(data1);
  // const arrData2 = objectToArray(data2);
}

/*   const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const diff = sortedKeys.map((key) => {
    if (!Object.hasOwn(data1, key) && Object.hasOwn(data2, key)) {
      return { key, type: 'added', value: data2[key] };
    }
    if (Object.hasOwn(data1, key) && !Object.hasOwn(data2, key)) {
      return { key, type: 'deleted', value: data1[key] };
    }
    if (Object.hasOwn(data1, key) && Object.hasOwn(data2, key) && data1[key] !== data2[key]) {
      return { key, type: 'edited', value: [data1[key], data2[key]] };
    }
    return { key, type: 'unchanged', value: data2[key] };
  });

  return stylishingDiff(diff);
} */

/* return [...Object.keys(data1), ...Object.keys(data2)].reduce((acc, key) => {
    if (!_.has(data2, key)) {
      acc[`- ${key}`] = data1[key];
    } else if (!_.has(data1, key)) {
      acc[`+ ${key}`] = data2[key];
    } else if (_.isEqual(data1[key], data2[key])) {
      acc[key] = data1[key];
    } else {
      acc[`- ${key}`] = data1[key];
      acc[`+ ${key}`] = data2[key];
    }
    return acc;
  }, {});
} */
