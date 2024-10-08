import { readFileSync } from 'node:fs';
import { parse as parseYML } from 'yaml';
import path from 'path';

const getFileParser = (filepath) => {
  const basename = path.posix.basename(filepath);
  const extension = path.extname(basename);
  return parsers[extension];
};

const readJsonFile = (filepath) => {
  const buff = readFileSync(filepath);
  const obj = JSON.parse(buff);
  return obj;
};

const readYmlFile = (filepath) => {
  const content = readFileSync(filepath, 'utf-8');
  const obj = parseYML(content);
  return obj;
};

const parsers = {
  '.json': readJsonFile,
  '.yml': readYmlFile,
  '.yaml': readYmlFile,
};

export default getFileParser;
