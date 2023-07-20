import findDifferences from './findDifferences.js';
import formatter from './formatters/index.js';
import parser from './parser.js';

const gendiff = (filePath1, filePath2, formatType = 'stylish') => {
  const firstFile = parser(filePath1);
  const secondFile = parser(filePath2);
  const differences = findDifferences(firstFile, secondFile);
  const formatedFile = formatter(differences, formatType);
  return formatedFile;
};

export default gendiff;
