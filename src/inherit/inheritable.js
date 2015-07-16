/* exported Inheritable */


/** @namespace */
var Inheritable = {

  /**
   * Creates a new object (I.E. "class") that can be inherited.
   * NOTE: The new object inherits the native JavaScript `Object`.
   *
   * @param [Object] objDef - TODO: Add description
   */
  create: function(objDef) {
    return Object.extend(objDef);
  }
};
