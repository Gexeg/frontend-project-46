import { valueStates } from './const.js';

const formatOutput = (data) => {
  const result = ['{'];
  for (const [key, meta] of Object.entries(data)) {
    const { state } = meta;
    switch (state) {
      case valueStates.removed:
        result.push(`\t-${key}: ${meta.oldValue}`);
        break;
      case valueStates.inserted:
        result.push(`\t+${key}: ${meta.newValue}`);
        break;
      case valueStates.unchanged:
        result.push(`\t ${key}: ${meta.oldValue}`);
        break;
      case valueStates.changed:
        result.push(`\t-${key}: ${meta.oldValue}`);
        result.push(`\t+${key}: ${meta.newValue}`);
        break;
      default:
        throw Error(`Formatter got an unexpected valueState ${state}`);
    }
  }
  result.push('}');
  return result.join('\n');
};

export default formatOutput;
