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

      Object.defineProperty(childDef.prototype, propName, {
        value:        privateProps[propName],
        configurable: true,
        enumerable:   false,
        writable:     true
      });
    }


    var privateStaticProps = privateProps.static;
    if (typeof privateStaticProps !== 'undefined' && privateStaticProps !== null) {
      for (propName in privateStaticProps) {
        Object.defineProperty(childDef, propName, {
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
}

return {
  mixDeep: mixDeep,
  inheritance: inheritance
};

}));
