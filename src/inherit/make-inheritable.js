/* globals inheritance */
/* exported makeInheritable */


/**
 * Makes an object inheritable by adding a function called `extend` as a "static"
 * attribute of the object. (I.E. Calling this function adding passing `Object` as a
 * parameter, creates `Object.extend`)
 *
 * @param {Object}  obj         - The object to make inheritable.
 * @param {Boolean} [overwrite] - If `true`, then an existing `extend` property will be
 *                                overwritten regardless of it's value.
 * @param {Boolean} [ignoreOverwriteError] - If `true`, then no error will be thrown if
 *                                           `obj.extend` already exists and `overwrite`
 *                                           is not `true`.
 *
 * @returns {Object} The `obj` given.
 *
 * @throws {TypeError} If `obj` is `undefined` or `null`.
 * @throws {TypeError} If `obj.extend` already exists and `overwrite` is NOT equal `true`.
 */
function makeInheritable(obj, overwrite, ignoreOverwriteError) {
  if (typeof obj === 'undefined' || obj === null) {
    throw new TypeError("`obj` cannot be undefined or null!");
  }
  if (overwrite !== true && typeof obj.extend !== 'undefined' && obj.extend !== null) {
    if (ignoreOverwriteError === true) {
      return obj;
    }
    throw new TypeError("`obj.extend` already exists! You're seeing this error to prevent the current extend function from being overwritten. See docs for how to override this functionality.");
  }

  /**
   * Creates a new object definition based upon the given `childDef` attributes and causes
   * that new object definition to inherit this object.
   *
   * @param {Object} childDef - An object containing all attributes to be used in creating
   *                            the new object definition that will inherit the given
   *                            `parent` object. If this parameter is `undefined` or
   *                            `null`, then a new child object definition is created.
   *                            TODO: Add reference to the `childDef` spec
   *
   * @returns {Object} An object created from the given `childDef` that inherits this
   *                   object.
   */
  obj.extend = function(childDef) {
    return inheritance(obj, childDef);
  };

  return obj;
}
