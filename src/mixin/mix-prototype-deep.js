/* globals mixDeep */
/* exported mixPrototypeDeep */


/**
 * TODO: Add description
 *
 * @param {Object}               obj    - The object containing the prototype to deep mix into.
 *                                        NOTE: `undefined` and `null` are both VALID values for
 *                                        this parameter. If `obj` is `undefined` or `null`, then
 *                                        a new object will be created from the `mixins` given.
 * @param {Array<Object>|Object} mixins - An array of objects whose attributes should be deep
 *                                        mixed into the prototype of the given `obj`.
 *                                        NOTE: The order of objects in this array does matter!
 *                                        If there are attributes present in multiple mixin
 *                                        objects, then the mixin with the largest index value
 *                                        overwrite any values set by the lower index valued
 *                                        mixin objects.
 *
 * @returns {Object} The deep mixed version of `obj`.
 *
 * @throws {TypeError} If `obj.prototype` does not exist.
 *
 * @requires mixDeep
 */
function mixPrototypeDeep(obj, mixins) {
  obj = (obj || { prototype: {} });

  if (typeof obj.prototype === 'undefined' || obj.prototype === null) {
    throw new TypeError("`obj.prototype` cannot be `undefined` or `null`!");
  }

  obj.prototype = mixDeep(obj.prototype, mixins);

  return obj;
}
