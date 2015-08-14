/* globals inheritance, seal */
/* exported ObjectDefinition */


/** @namespace */
var ObjectDefinition = {

  /**
   * Creates a new object (I.E. "class") that can be inherited.
   * NOTE: The new object inherits the native JavaScript `Object`.
   *
   * @param {Object} objDef - TODO: Add description
   *
   * @returns {Object} The newly created, inheritable, object that inherits `Object`.
   */
  create: function(objDef) {
    return inheritance(Object, objDef);
  },


  /**
   * Creates a new object (I.E. "class") that CANNOT be inherited.
   * NOTE: The new object inherits the native JavaScript `Object`.
   *
   * @param {Object} objDef - TODO: Add description
   *
   * @returns {Object} The newly created, non-inheritable, object that inherits `Object`.
   */
  createSealed: function(objDef) {
    return seal(inheritance(Object, objDef), true);
  }
};


seal(ObjectDefinition, true);
