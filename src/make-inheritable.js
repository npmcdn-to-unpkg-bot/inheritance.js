import odef from 'odef';



/**
 * Makes an object inheritable by adding a function called `extend` as a "static"
 * property of the object. (I.E. Calling this function passing `MyObject` as a
 * parameter, creates `MyObject.extend`)
 *
 * @param {Object}  obj         - The object to make inheritable.
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
export default function makeInheritable(obj, overwrite, ignoreOverwriteError) {
  if (obj == null) {
    throw new TypeError("`obj` cannot be undefined or null!");
  }
  if (overwrite !== true && obj.extend != null) {
    if (ignoreOverwriteError === true) {
      return obj;
    }
    throw new TypeError("`obj.extend` already exists! You're seeing this error to prevent the current extend function from being overwritten. See docs for how to override this functionality.");
  }

  /**
   * Creates a new object definition based upon the given `props` properties and
   * causes that new object definition to inherit this object.
   *
   * @param {Object} props - An object containing all properties to be used in
   *                         creating the new object definition that will inherit
   *                         this object. If this parameter is `undefined` or
   *                         `null`, then a new child object definition is created.
   *
   *                         TODO: Add reference to the `props` spec
   *
   * @returns {Object} An object created from the given `props` that inherits this object.
   *
   * @throws {TypeError} If the object's definition has been sealed. @see {@link https://github.com/bsara/odef.js/blob/master/src/seal.js}
   *
   * @requires odef
   */
  Object.defineProperty(obj, 'extend', {
    value:        function(name, props) { return odef(name, props); }, // jscs:ignore requireBlocksOnNewline
    configurable: true,
    enumerable:   false,
    writable:     true
  });

  return obj;
}
