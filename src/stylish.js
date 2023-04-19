/* export function giveTypesToDiff(sortedKeys) {
  return (sortedKeys.map((key) => {
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
    }))
} */

export function stylishedDiff(diff) {
  const stylishedDiff = diff.reduce((acc, elem) => {
    const { key } = elem;
    const { value } = elem;

    switch (elem.type) {
      case 'deleted':
        return (acc + `  - ${key}: ${value}\n`);
      case 'added':
        return (acc + `  + ${key}: ${value}\n`);
      case 'edited':
        return (acc + `  - ${key}: ${value[0]}\n  + ${key}: ${value[1]}\n`);
      default:
        return (acc + `    ${key}: ${value}\n`);
    }
  }, '');
  return `{\n${stylishedDiff}}`;
}
