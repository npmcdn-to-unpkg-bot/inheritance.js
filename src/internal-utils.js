/* exported InternalUtils */


/** @namespace */
var InternalUtils = {
  getPropertyDescriptor: function(obj, propName) {
    var propDescriptor = Object.getOwnPropertyDescriptor(obj, propName);

    if (propDescriptor != null) {
      return propDescriptor;
    }

    if (obj.constructor == null || obj.constructor.__super__ == null) {
      return undefined;
    }

    return InternalUtils.getPropertyDescriptor(obj.constructor.__super__, propName);
  }
};
