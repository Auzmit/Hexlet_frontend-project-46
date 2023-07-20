import stylishFormatter from './stylish.js';
import plainFormatter from './plain.js';

export default function formatter(data, format) {
  switch (format) {
    case 'stylish':
      return stylishFormatter(data);
    case 'plain':
      return plainFormatter(data);
    case 'json':
      return JSON.stringify(data, null, 2);
    default:
      throw new Error(`'${format}' is unknown format`);
  }
}
