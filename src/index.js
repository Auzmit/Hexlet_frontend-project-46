import _ from 'lodash';
import path from 'path';
import stylishingDiff from './stylish.js';
import getData from './parsers.js';

function buildPath(relativePath) { return (path.resolve(process.cwd(), relativePath)); }

export default function gendiff(path1, path2) {
  const data1 = getData(buildPath(path1));
  const data2 = getData(buildPath(path2));

  const keys = _.union(Object.keys(data1), Object.keys(data2));
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
}
