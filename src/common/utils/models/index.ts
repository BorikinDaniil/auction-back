import { cloneDeep } from 'lodash';

export const objectify = (object: object, [key, value]): object => ({
  ...object,
  [key]: value,
});

export default (model: object) =>
  (data = {}) =>
    cloneDeep(
      Object.entries(model)
        .map(([key, value]) => [
          key,
          data[key] !== undefined ? data[key] : value,
        ])
        .reduce(objectify, {}),
    );
