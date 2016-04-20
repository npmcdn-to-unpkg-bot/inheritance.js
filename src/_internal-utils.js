export function _deepClone(val) {
  if (val == null) {
    return val;
  }

  var ret = val;

  if (Array.isArray(val)) {
    ret = new val.constructor();

    val.forEach(function(item) {
      ret.push(_deepClone(item));
    });
  } else if (typeof val === 'object') {
    var ctorArg = ((val instanceof Date) ? val.valueOf() : undefined);

    ret = new val.constructor(ctorArg);

    for (var propName in val) {
      ret[propName] = _deepClone(val[propName]);
    }
  }

  return ret;
}


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
