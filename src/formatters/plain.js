import _ from 'lodash';

export default function plainFormatter(tree) {
  function iter(objects, address) {
    const stylishedObjects = objects.flatMap((object) => {
      const { name, value, status } = object;
      /* console.log(object);
      console.log('\n'); */
      const outputValue = (currentValue) => {
        if (_.isObject(currentValue)) { return '[complex value]'; }
        if (_.isString(currentValue)) { return `'${currentValue}'`; }
        return currentValue;
      };
      const valueAddress = [...address, name].join('');
      if (status === 'removed') { return `Property '${valueAddress}' was removed`; }
      if (status === 'added') { return `Property '${valueAddress}' was added with value: ${outputValue(value)}`; }
      if (status === 'updated') {
        return `Property '${valueAddress}' was updated. From ${outputValue(object.oldValue)} to ${outputValue(value)}`;
      }
      if (status === 'node') { return iter(value, `${valueAddress}.`); }
      return [];
    });
    return `${stylishedObjects.join('\n')}`;
  }

  return iter(tree, '');
}
