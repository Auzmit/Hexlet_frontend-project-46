import fs from 'fs';
import yaml from 'js-yaml';

export default function getData(absolutePath) {
  const fileExtention = absolutePath.split('.').pop();
  const data = fs.readFileSync(absolutePath, 'utf-8');
  let parse;
  if (fileExtention === 'json') {
    parse = JSON.parse;
  }
  if ((fileExtention === 'yaml') || (fileExtention === 'yml')) {
    parse = yaml.load;
  }
  return parse(data);
}
