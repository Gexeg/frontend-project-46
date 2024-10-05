import { valueStates } from './const.js';

export default (data) => {
  const result = ['{'];
  for (const [key, meta] of Object.entries(data)) {
    const { state } = meta;
    switch (state) {
      case valueStates.removed:
        result.push(`\t-${key}:${meta.oldValue}`);
        break;
      case valueStates.inserted:
        result.push(`\t+${key}:${meta.newValue}`);
        break;
      case valueStates.unchanged:
        result.push(`\t ${key}:${meta.oldValue}`);
        break;
      case valueStates.changed:
        result.push(`\t-${key}:${meta.oldValue}`);
        result.push(`\t+${key}:${meta.newValue}`);
        break;
      default:
        break;
    }
  }
  result.push('}');
  return result.join('\n');
};
