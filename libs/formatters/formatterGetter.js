import stylishFormatter from './stylish.js';
import { formatterNames } from '../const.js';

const formatters = {
  [formatterNames.stylish]: stylishFormatter,
};

function formatOutput(formatterName, changelog) {
  const formatter = formatters[formatterName];
  if (!formatter) {
    console.log(`Unknown formatter name ${formatterName}`);
    return undefined;
  }
  return formatter(changelog);
}

export default formatOutput;
