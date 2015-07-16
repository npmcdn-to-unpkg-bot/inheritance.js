/* exported deepMix */


/**
 * TODO: Add description
 *
 * @param {Object}        obj    - The object to deep mix into.
 *                                 NOTE: `undefined` and `null` are both VALID values for
 *                                 this parameter. If `obj` is `undefined` or `null`, then
 *                                 a new object will be created from the `mixins` given.
 * @param {Array<Object>} mixins - An array of objects whose attributes should be deep
 *                                 mixed into the given `obj`.
 *                                 NOTE: The order of objects in this array does matter!
 *                                 If there are attributes present in multiple mixin
 *                                 objects, then the mixin with the largest index value
 *                                 overwrite any values set by the lower index valued
 *                                 mixin objects.
 *
 * @returns {Object} The deep mixed version of `obj`.
 */
function deepMix(obj, mixins) {
  var newObj = (obj || {});

  for (var i = 0; i < mixins.length; i++) {
    var mixin = mixins[i];

    if (!mixin) {
      continue;
    }

    for (var attrName in mixin) {
      if (!mixin.hasOwnProperty(attrName)) {
        continue;
      }

      if (typeof mixin[attrName] === 'object') {
        deepMix(newObj[attrName], mixin[attrName]);
        continue;
      }

      newObj[attrName] = mixin[attrName];
    }
  }

  return newObj;
}
