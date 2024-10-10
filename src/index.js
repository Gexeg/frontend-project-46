import getFileParser from '../libs/parser.js';
import compareObjectsShallow from '../libs/comparator.js';
import formatOutput from '../libs/formatters/index.js';
import { formatterNames } from '../libs/const.js';

const genDiff = (fp1, fp2, formatName = formatterNames.stylish) => {
  const parser1 = getFileParser(fp1);
  const parser2 = getFileParser(fp2);
  if (!parser1 || !parser2) {
    console.log('This is an unsupported file types');
    return undefined;
  }
  const data1 = parser1(fp1);
  const data2 = parser2(fp2);
  const changelog = compareObjectsShallow(data1, data2);
  const output = formatOutput(formatName, changelog);
  return output;
};

export default genDiff;
