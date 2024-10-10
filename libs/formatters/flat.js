import { valueStates } from '../const.js';
import { isObject } from '../utils.js';

const flatFormatter = (changelog) => {
  console.log(changelog);
  if (changelog.state === valueStates.unchanged) {
    return changelog.value;
  }
  const result = formatChangelogFlat(changelog);

  return result.flat(Infinity).join('\n');
};

function formatChangelogFlat({ state, value }, prefix = '') {
  if (state === valueStates.unchanged) {
    return value;
  }
  const result = Object.entries(value).reduce((acc, element) => {
    const [key, elMeta] = element;
    const elState = elMeta.state;
    const elValue = elMeta.value;
    const keyPath = prefix !== '' ? `${prefix}.${key}` : `${key}`;
    switch (elState) {
      case valueStates.changed:
        if (elMeta.nested) {
          acc.push(formatChangelogFlat({ state: elState, value: elValue }, keyPath));
        } else {
          const valueStub = isObject(elMeta.newValue) ? '[complex value]' : elMeta.newValue;
          acc.push(`Property '${keyPath}' was updated. From '${elValue}' to '${valueStub}'`);
        }
        break;
      case valueStates.removed:
        acc.push(`Property '${keyPath}' was removed`);
        break;
      case valueStates.inserted: {
        const valueStub = isObject(elValue) ? '[complex value]' : elValue;
        acc.push(`Property '${keyPath}' was added with value: '${valueStub}'`);
      }
        break;
      default: // valueStates.unchanged
        break;
    }
    return acc;
  }, []);
  return result;
}

export default flatFormatter;
