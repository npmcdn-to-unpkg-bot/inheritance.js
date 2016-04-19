/* globals inheritance, seal */
/* exported ObjectDefinition */


/** @namespace */
var ObjectDefinition = {

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
  create: function() {
    var objDefName = arguments[0];
    var objDef     = arguments[1];

    if (typeof objDefName === 'string') {
      objDef.__defName = objDefName;
    } else {
      objDef = objDefName;
    }

    return inheritance(Object, objDef);
  },


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
  createSealed: function() {
    return seal(ObjectDefinition.create.apply(this, arguments), true);
  }
};


seal(ObjectDefinition, true);
