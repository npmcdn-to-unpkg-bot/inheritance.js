/* globals deepMix, makeInheritable, mix */


makeInheritable(Object);


/**
 * TODO: Add description
 *
 * @param {Object...} arguments - An array of objects whose attributes should be mixed
 *                                into the given `obj`.
 *                                NOTE: The order of objects in this array does matter!
 *                                If there are attributes present in multiple mixin
 *                                objects, then the mixin with the largest index value
 *                                overwrite any values set by the lower index valued
 *                                mixin objects.
 *
 * @returns {Object} This object, mixed with the given mixin objects.
 */
Object.prototype.mix = function() {
  return mix(this, arguments);
};


/**
 * TODO: Add description
 *
 * @param {Object...} arguments - An array of objects whose attributes should be deep
 *                                mixed into the given `obj`.
 *                                NOTE: The order of objects in this array does matter!
 *                                If there are attributes present in multiple mixin
 *                                objects, then the mixin with the largest index value
 *                                overwrite any values set by the lower index valued
 *                                mixin objects.
 *
 * @returns {Object} This object, deep mixed with the given mixin objects.
 */
Object.prototype.deepMix = function() {
  return deepMix(this, arguments);
};
