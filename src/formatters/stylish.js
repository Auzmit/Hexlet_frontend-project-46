import _ from 'lodash';

function stylish(currentKey, currentValue, depth) {
  if (!_.isObject(currentValue)) {
    return `${currentKey}: ${currentValue}`;
  }
  const indentBefore = '  '.repeat(depth);
  const bracketIndent = '  '.repeat(depth - 1);
  const lines = Object.entries(currentValue).flatMap(([key, ent]) => `  ${stylish(key, ent, depth + 2)}`);

  return `${currentKey}: {\n${indentBefore}${lines.join(`\n${indentBefore}`)}\n${bracketIndent}}`;
}

export default function stylishFormatter(tree) {
  function iter(objects, depth) {
    const indentBefore = '  '.repeat(depth);
    const bracketIndent = '  '.repeat(depth - 1);
    const stylishedObjects = objects.flatMap((object) => {
      const { name, value, status } = object;
      const line = stylish(name, value, depth + 2);
      if (status === 'removed') { return `- ${line}`; }
      if (status === 'added') { return `+ ${line}`; }
      if (status === 'unchanged') { return `  ${line}`; }
      if (status === 'updated') { return [`- ${stylish(name, object.oldValue, depth + 2)}`, `+ ${line}`]; }
      if (status === 'node') { return `  ${name}: ${iter(value, depth + 2)}`; }
      return `  ${line}`;
    });
    return `{\n${indentBefore}${stylishedObjects.join(`\n${indentBefore}`)}\n${bracketIndent}}`;
  }

  return iter(tree, 1);
}
