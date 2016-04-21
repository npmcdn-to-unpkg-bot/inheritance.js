/** @internal */
export function _getPropertyDescriptor(obj, propName) {
  var propDescriptor = Object.getOwnPropertyDescriptor(obj, propName);

  if (propDescriptor != null) {
    return propDescriptor;
  }

  if (obj.constructor == null || obj.constructor.__super__ == null) {
    return undefined;
  }

  return _getPropertyDescriptor(obj.constructor.__super__, propName);
}
