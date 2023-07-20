import { cwd } from 'node:process';
import { load } from 'js-yaml';
import { readFileSync } from 'node:fs';
import { resolve, extname } from 'node:path';

export default function parser(filePath) {
  const absolutePath = resolve(cwd(), filePath);
  const extension = extname(absolutePath).slice(1);
  const readingFile = readFileSync(resolve(cwd(), filePath), 'utf-8');
  switch (extension) {
    case 'json':
      return JSON.parse(readingFile);
    case 'yml':
      return load(readingFile);
    case 'yaml':
      return load(readingFile);
    default:
      throw new Error('unexpected file format');
  }
}
