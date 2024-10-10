import { readFileSync } from 'node:fs';
import { parse as parseYML } from 'yaml';
import path from 'path';

const parsers = {
  '.json': readJsonFile,
  '.yml': readYmlFile,
  '.yaml': readYmlFile,
};

function getFileParser(filepath) {
  const basename = path.posix.basename(filepath);
  const extension = path.extname(basename);
  return parsers[extension];
}

function readJsonFile(filepath) {
  const buff = readFileSync(filepath);
  const obj = JSON.parse(buff);
  return obj;
}

function readYmlFile(filepath) {
  const content = readFileSync(filepath, 'utf-8');
  const obj = parseYML(content);
  return obj;
}

export default getFileParser;
