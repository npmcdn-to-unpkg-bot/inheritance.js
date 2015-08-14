/*!
 * Inheritance.js (0.4.0)
 *
 * Copyright (c) 2015 Brandon Sara (http://bsara.github.io)
 * Licensed under the CPOL-1.02 (https://github.com/bsara/inheritance.js/blob/master/LICENSE.md)
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.I = {};
    root.I = factory();
  }
}(this, function() {/**
 * TODO: Add description
 *
 * @param {Object}               obj    - The object to mix into.
 *                                        NOTE: `undefined` and `null` are both VALID values for
 *                                        this parameter. If `obj` is `undefined` or `null`, then
 *                                        a new object will be created from the `mixins` given.
 * @param {Array<Object>|Object} mixins - An array of objects whose properties should be mixed
 *                                        into the given `obj`.
 *                                        NOTE: The order of objects in this array does matter!
 *                                        If there are properties present in multiple mixin
 *                                        objects, then the mixin with the largest index value
 *                                        overwrite any values set by the lower index valued
 *                                        mixin objects.
 *
 * @returns {Object} The mixed version of `obj`.
 */
function mix(obj, mixins) {
  var newObj = (obj || {});

  if (!(mixins instanceof Array)) {
    mixins = [ mixins ];
  }

  for (var i = 0; i < mixins.length; i++) {
    var mixin = mixins[i];

    if (!mixin) {
      continue;
    }

    for (var propName in mixin) {
      if (mixin.hasOwnProperty(propName)) {
        newObj[propName] = mixin[propName];
      }
    }
  }

  return newObj;
}/**
 * TODO: Add description
 *
 * @param {Object}               obj    - The object to deep mix into.
 *                                        NOTE: `undefined` and `null` are both VALID values for
 *                                        this parameter. If `obj` is `undefined` or `null`, then
 *                                        a new object will be created from the `mixins` given.
 * @param {Array<Object>|Object} mixins - An array of objects whose properties should be deep
 *                                        mixed into the given `obj`.
 *                                        NOTE: The order of objects in this array does matter!
 *                                        If there are properties present in multiple mixin
 *                                        objects, then the mixin with the largest index value
 *                                        overwrite any values set by the lower index valued
 *                                        mixin objects.
 *
 * @returns {Object} The deep mixed version of `obj`.
 */
function mixDeep(obj, mixins) {
  var newObj = (obj || {});

  if (!(mixins instanceof Array)) {
    mixins = [ mixins ];
  }

  for (var i = 0; i < mixins.length; i++) {
    var mixin = mixins[i];

    if (!mixin) {
      continue;
    }

    for (var propName in mixin) {
      if (!mixin.hasOwnProperty(propName)) {
        continue;
      }

      if (typeof mixin[propName] === 'object') {
        mixDeep(newObj[propName], mixin[propName]);
        continue;
      }

      newObj[propName] = mixin[propName];
    }
  }

  return newObj;
}/**
 * Creates a new object definition based upon the given `childDef` properties that
 * inherits the given `parent`.
 *
 * @param {Object} parent     - The object to be inherited.
 * @param {Object} [childDef] - An object containing all properties to be used in creating
 *                              the new object definition that will inherit the given
 *                              `parent` object. If this parameter is `undefined` or
 *                              `null`, then a new child object definition is created.
 *                              TODO: Add reference to the `childDef` spec
 *
 * @returns {Object} An object created from the given `childDef` that inherits `parent`.
 *
 * @requires mixDeep
 */
function inheritance(parent, childDef) {
  var propName;

  parent   = (parent || Object);
  childDef = (childDef || {});

  var child = (childDef.ctor || function() { return this.super.apply(this, arguments); });


  for (propName in parent) {
    if (propName === 'extend') {
      continue;
    }
    child[propName] = parent[propName];
  }

  child.__super__ = parent.prototype;

  makeInheritable(child);


  var mixins = childDef.mixins;
  if (mixins !== null && mixins instanceof Array) {
    mixDeep(childDef, mixins);
  }


  var staticProps = childDef.static;
  if (typeof staticProps !== 'undefined' && staticProps !== null) {
    for (propName in staticProps) {
      if (propName === 'consts') {
        continue;
      }

      child[propName] = staticProps[propName];
    }


    var staticConstProps = staticProps.consts;
    if (typeof staticConstProps !== 'undefined' && staticConstProps !== null) {
      for (propName in staticConstProps) {
        Object.defineProperty(child, propName, {
          value:        staticConstProps[propName],
          configurable: false,
          enumerable:   true,
          writable:     false
        });
      }
    }
  }


  child.prototype        = Object.create(parent.prototype);
  child.prototype.objDef = child;

  child.prototype.constructor = function() {
    if (!(this instanceof child)) {
      return new child(arguments);
    }

    for (var funcName in this._super) {
      if (funcName !== '_super') {
        this._super[funcName] = this._super[funcName].bind(this);
      }
    }

    child(arguments);
  };


  child.prototype.super = function() {
    this.objDef.__super__.constructor.apply(this, arguments);
  };

  child.prototype._super = {};

  for (propName in parent.prototype) {
    child.prototype._super[propName] = function() {
      return this.objDef.__super__[propName].apply(this, arguments);
    };
  }


  var privateProps = childDef.private;
  if (typeof privateProps !== 'undefined' && privateProps !== null) {
    for (propName in privateProps) {
      if (propName === 'static') {
        continue;
      }

      Object.defineProperty(child.prototype, propName, {
        value:        privateProps[propName],
        configurable: true,
        enumerable:   false,
        writable:     true
      });
    }


    var privateStaticProps = privateProps.static;
    if (typeof privateStaticProps !== 'undefined' && privateStaticProps !== null) {
      for (propName in privateStaticProps) {
        Object.defineProperty(child, propName, {
          value:        privateStaticProps[propName],
          configurable: true,
          enumerable:   false,
          writable:     true
        });
      }
    }
  }


  for (propName in childDef) {
    if (propName === 'constructor'
        || propName === 'ctor'
        || propName === 'objDef'
        || propName === 'mixins'
        || propName === 'private'
        || propName === 'static'
        || propName === 'super'
        || propName === '_super') {
      continue;
    }
    child.prototype[propName] = childDef[propName];
  }

  return child;
}/**
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
   * Creates a new object definition based upon the given `childDef` properties and causes
   * that new object definition to inherit this object.
   *
   * @param {Object} childDef - An object containing all properties to be used in creating
   *                            the new object definition that will inherit this object.
   *                            If this parameter is `undefined` or `null`, then a new
   *                            child object definition is created.
   *                            TODO: Add reference to the `childDef` spec
   *
   * @returns {Object} An object created from the given `childDef` that inherits this
   *                   object.
   *
   * @throws {TypeError} If the object's definition has been sealed. @see {@link https://github.com/bsara/inheritance.js/blob/master/src/inherit/seal.js}
   */
  Object.defineProperty(obj, 'extend', {
    value:        function(childDef) { return inheritance(obj, childDef); },
    configurable: true,
    enumerable:   false,
    writable:     true
  });

  return obj;
}/**
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
function seal(obj, overwrite, ignoreOverwriteError) {
  if (typeof obj === 'undefined' || obj === null) {
    throw new TypeError("`obj` cannot be undefined or null!");
  }
  if (overwrite !== true && typeof obj.extend !== 'undefined' && obj.extend !== null) {
    if (ignoreOverwriteError === true) {
      return obj;
    }
    throw new TypeError("`obj.extend` already exists! You're seeing this error to prevent the current extend function from being overwritten. See docs for how to override this functionality.");
  }


  if (typeof obj.extend !== 'undefined' && obj.extend !== null) {
    delete obj.extend;
  }

  Object.defineProperties(obj, {
    sealed: {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        true
    },
    extend: {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        function() { throw new TypeError("The object definition you are trying to extend is sealed and cannot be inherited."); }
    }
  });

  return obj;
}/** @namespace */
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
    return seal(inheritance(Object, objDef));
  }
};


seal(ObjectDefinition, true);

return {
  mix: mix,
  mixDeep: mixDeep,
  inheritance: inheritance,
  makeInheritable: makeInheritable,
  seal: seal,
  ObjectDefinition: ObjectDefinition
};

}));
