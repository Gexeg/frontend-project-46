import { valueStates } from '../const.js';

const stylishFormatter = (changelog) => {
  console.log(changelog);
  if (changelog.state === valueStates.unchanged) {
    return changelog.value;
  }
  const result = formatChangelogStylish(changelog);

  return JSON.stringify(result, null, 4).replace(/"/g, '');
};

function formatChangelogStylish({ state, value }) {
  if (state === valueStates.unchanged) {
    return value;
  }
  const result = Object.entries(value).reduce((acc, element) => {
    const [key, elMeta] = element;
    const elState = elMeta.state;
    const elValue = elMeta.value;
    switch (elState) {
      case valueStates.unchanged:
        acc[`  ${key}`] = elValue;
        break;
      case valueStates.removed:
        acc[`- ${key}`] = elValue;
        break;
      case valueStates.inserted:
        acc[`+ ${key}`] = elValue;
        break;
      default: // valueStates.changed
        if (elMeta.nested) {
          acc[`  ${key}`] = formatChangelogStylish({ state: elState, value: elValue });
        } else {
          acc[`- ${key}`] = elValue;
          acc[`+ ${key}`] = elMeta.newValue;
        }
    }
    return acc;
  }, {});
  return result;
}

export default stylishFormatter;
