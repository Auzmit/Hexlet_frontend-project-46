export default function stylish(diff) {
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
