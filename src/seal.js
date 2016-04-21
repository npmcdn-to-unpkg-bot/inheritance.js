/**
 * Makes an object sealed by adding a function called `extend` as a "static" property
 * of the object that throws an error if it is ever called. (I.E. Calling this function
 * passing `MyObject` as a parameter, creates `MyObject.extend` and `MyObject.sealed`,
 * where `MyObject.sealed` will always be `true`)
 *
 * @param {Object}  obj         - The object to seal.
 * @param {Boolean} [overwrite] - If `true`, then an existing `extend` property will be
 *                                overwritten regardless of it's value.
 * @param {Boolean} [ignoreOverwriteError] - If `true`, then no error will be thrown if
 *                                           `obj.extend` already exists and `overwrite`
 *                                           is not `true`.
 *
 * @returns {Object} The modified `obj` given.
 *
 * @throws {TypeError} If `obj` is `undefined` or `null`.
 * @throws {TypeError} If `obj.extend` already exists and `overwrite` is NOT equal `true`.
 */
export default function seal(obj, overwrite, ignoreOverwriteError) {
  if (obj == null) {
    throw new TypeError("`obj` cannot be undefined or null!");
  }
  if (overwrite !== true && obj.extend != null) {
    if (ignoreOverwriteError === true) {
      return obj;
    }
    throw new TypeError("`obj.extend` already exists! You're seeing this error to prevent the current extend function from being overwritten. See docs for how to override this functionality.");
  }


  if (obj.extend != null) {
    delete obj.extend;
  }

  Object.defineProperties(obj, {
    sealed: { get: function() { return true; } }, // jscs:ignore requireBlocksOnNewline
    extend: {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        function() { throw new TypeError("The object definition you are trying to extend is sealed and cannot be inherited."); } // jscs:ignore requireBlocksOnNewline
    }
  });

  return obj;
}