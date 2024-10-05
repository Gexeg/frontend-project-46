import { readFileSync } from 'node:fs';
import path from 'path';

const allowedExtensions = ['.json'];

export const isFileAllowed = (filepath) => {
  const basename = path.posix.basename(filepath);
  const extension = path.extname(basename);
  return allowedExtensions.includes(extension);
};

export const readFile = (filepath) => {
  const buff = readFileSync(filepath);
  const obj = JSON.parse(buff);
  return obj;
};
