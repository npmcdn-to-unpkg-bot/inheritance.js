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
    root.I = factory();
  }
}(this, function() {/**
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
 * Creates a new object definition based upon the given `objDefProps` that inherits the
 * given `parent`.
 *
 * @param {Object} parent        - The object to be inherited.
 * @param {Object} [objDefProps] - An object containing all properties to be used in
 *                                 creating the new object definition that will inherit
 *                                 the given `parent` object. If this parameter is
 *                                 `undefined` or `null`, then a new child object
 *                                 definition is created.
 *                                 TODO: Add reference to the `objDefProps` spec
 *
 * @returns {Object} An object created from the given `objDefProps` that inherits
 *                   `parent`.
 *
 * @requires makeInheritable, mixDeep
 */
function inheritance(parent, objDefProps) {
  parent   = (parent || Object);
  objDefProps = (objDefProps || {});

  var propName;
  var objDef;
  var objCtor    = (objDefProps.ctor || function() { return objDef.__super__.constructor.apply(this, arguments); });
  var objDefName = objDefProps.__defName;

  if (typeof objDefName === 'string' && objDefName.trim()) {
    objDefName = objDefName.trim();
  } else if (objCtor.name) {
    objDefName = objCtor.name;
  } else {
    objDefName = undefined;
  }

  delete objDefProps.__defName;  var ctorWrapper = function() {
    if (typeof objDefName !== 'undefined') {
      var tempSuperFuncs = {};

      tempSuperFuncs.constructor = objDef.__super__.constructor.bind(this);
      tempSuperFuncs.ctor        = tempSuperFuncs.constructor;

      for (var propName in objDef.__super__) {
        var superProp = objDef.__super__[propName];

        if (propName !== 'constructor'
              && propName !== 'ctor'
              && typeof superProp === 'function') {
          tempSuperFuncs[propName] = superProp.bind(this);
        }
      }

      Object.defineProperty(this, (objDefName + 'Super'), {
        value:        tempSuperFuncs,
        configurable: false,
        enumerable:   false,
        writable:     false
      });
    }

    return objCtor.apply(this, arguments);
  };  eval('objDef = function' + (objDefName ? (' ' + objDefName) : '') + '() { ctorWrapper.apply(this, arguments); };');  objDef.prototype = Object.create(parent.prototype);



  makeInheritable(objDef);



  var mixins = objDefProps.mixins;
  if (mixins !== null && mixins instanceof Array) {
    mixDeep(objDefProps, mixins);
  }



  var staticProps = objDefProps.static;
  if (typeof staticProps !== 'undefined' && staticProps !== null) {
    for (propName in staticProps) {
      if (propName === 'consts'
          || propName === 'super'
          || propName === '__super__') {
        continue;
      }

      objDef[propName] = staticProps[propName];
    }

    var staticConstProps = staticProps.consts;
    if (typeof staticConstProps !== 'undefined' && staticConstProps !== null) {
      for (propName in staticConstProps) {
        Object.defineProperty(objDef, propName, {
          value:        staticConstProps[propName],
          configurable: false,
          enumerable:   true,
          writable:     false
        });
      }
    }
  }

  Object.defineProperty(objDef, '__super__', {
    value:        parent.prototype,
    configurable: false,
    enumerable:   false,
    writable:     false
  });



  var privateProps = objDefProps.private;
  if (typeof privateProps !== 'undefined' && privateProps !== null) {
    for (propName in privateProps) {
      if (propName === 'static') {
        continue;
      }

      Object.defineProperty(objDef.prototype, propName, {
        value:        privateProps[propName],
        configurable: true,
        enumerable:   false,
        writable:     true
      });
    }


    var privateStaticProps = privateProps.static;
    if (typeof privateStaticProps !== 'undefined' && privateStaticProps !== null) {
      for (propName in privateStaticProps) {
        Object.defineProperty(objDef, propName, {
          value:        privateStaticProps[propName],
          configurable: true,
          enumerable:   false,
          writable:     true
        });
      }
    }
  }



  objDef.prototype.constructor = objDef;

  for (propName in objDefProps) {
    if (propName === 'constructor'
        || propName === 'ctor'
        || propName === 'mixins'
        || propName === 'private'
        || propName === 'static') {
      continue;
    }
    objDef.prototype[propName] = objDefProps[propName];
  }



  return objDef;
}

return {
  mixDeep: mixDeep,
  inheritance: inheritance
};

}));
