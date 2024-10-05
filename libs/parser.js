import { readFileSync } from 'node:fs';

export default (filepath) => {
  const buff = readFileSync(filepath);
  const obj = JSON.parse(buff);
  return obj;
};
