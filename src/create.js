import inheritance from 'inherit/inheritance';
import seal        from 'inherit/seal';



/**
 * Creates a new object (I.E. "class") that can be inherited.
 * NOTE: The new object inherits the native JavaScript `Object`.
 *
 * @param {String} [objDefName] - TODO: Add description
 * @param {Object} objDef       - TODO: Add description
 *
 * @returns {Object} The newly created, inheritable, object that inherits `Object`.
 *
 * @requires inheritance
 */
export function create() {
  var objDefName = arguments[0];
  var objDef     = arguments[1];

  if (typeof objDefName === 'string') {
    objDef.__defName = objDefName;
  } else {
    objDef = objDefName;
  }

  return inheritance(Object, objDef);
}


/**
 * Creates a new object (I.E. "class") that CANNOT be inherited.
 * NOTE: The new object inherits the native JavaScript `Object`.
 *
 * @param {String} [objDefName] - TODO: Add description
 * @param {Object} objDef       - TODO: Add description
 *
 * @returns {Object} The newly created, non-inheritable, object that inherits `Object`.
 *
 * @requires seal
 */
export function createSealed() {
  return seal(create.apply(this, arguments), true);
}



export default create;
