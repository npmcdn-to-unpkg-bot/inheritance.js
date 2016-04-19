/*!
 * inheritance.js (1.0.0-beta.0)
 *
 * Copyright (c) 2016 Brandon Sara (http://bsara.github.io)
 * Licensed under the CPOL-1.02 (https://github.com/bsara/inheritance.js/blob/master/LICENSE.md)
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.I = factory();
    root.ObjectDefinition = root.I.ObjectDefinition;
    delete root.I.ObjectDefinition;

  }
}(this, function() {/**
 * TODO: Add description
 *
 * @param {Object...} arguments - Mixin objects whose properties should be mixed into this
 *                                object.
 *                                NOTE: The order of objects in this array does matter!
 *                                If there are properties present in multiple mixin
 *                                objects, then the mixin with the largest index value
 *                                overwrite any values set by the lower index valued
 *                                mixin objects.
 *
 * @returns {Object} This object, mixed with the given mixin objects.
 *
 * @requires mix
 */
Object.defineProperty(Object.prototype, 'mix', {
  value:        function() { return mix(this, Array.prototype.slice.call(arguments)); },
  configurable: true,
  enumerable:   false,
  writable:     true
});


/**
 * TODO: Add description
 *
 * @param {Object...} arguments - Mixin objects whose properties should be deep mixed into
 *                                this object.
 *                                NOTE: The order of objects in this array does matter!
 *                                If there are properties present in multiple mixin
 *                                objects, then the mixin with the largest index value
 *                                overwrite any values set by the lower index valued
 *                                mixin objects.
 *
 * @returns {Object} This object, deep mixed with the given mixin objects.
 *
 * @requires mixDeep
 */
Object.defineProperty(Object.prototype, 'mixDeep', {
  value:        function() { return mixDeep(this, Array.prototype.slice.call(arguments)); },
  configurable: true,
  enumerable:   false,
  writable:     true
});


var objDefsToExtend = [
  this.Object,
  this.ArrayBuffer,
  this.Array,
  this.DataView,
  this.Date,
  this.Error,
  this.EvalError,
  this.Float32Array,
  this.Float64Array,
  this.Function,
  this.Int8Array,
  this.Int16Array,
  this.Int32Array,
  this.Map,
  this.Number,
  this.Promise,
  this.Proxy,
  this.RangeError,
  this.ReferenceError,
  this.Reflect,
  this.RegExp,
  this.Set,
  this.String,
  this.Symbol,
  this.SyntaxError,
  this.TypeError,
  this.Uint8Array,
  this.Uint8ClampedArray,
  this.Uint16Array,
  this.Uint32Array,
  this.URIError,
  this.WeakMap,
  this.WeakSet
];

if (this.Intl != null) {
  objDefsToExtend.push(this.Intl.Collator);
  objDefsToExtend.push(this.Intl.DataTimeFormat);
  objDefsToExtend.push(this.Intl.NumberFormat);
}


for (var i = 0; i < objDefsToExtend.length; i++) {
  var objDef = objDefsToExtend[i];
  if (objDef != null) {
    makeInheritable(objDef, true);
  }
}/** @namespace */
var InternalUtils = {
  getPropertyDescriptor: function(obj, propName) {
    var propDescriptor = Object.getOwnPropertyDescriptor(obj, propName);

    if (propDescriptor != null) {
      return propDescriptor;
    }

    if (obj.constructor == null || obj.constructor.__super__ == null) {
      return undefined;
    }

    return InternalUtils.getPropertyDescriptor(obj.constructor.__super__, propName);
  }
};/** @namespace */
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


seal(ObjectDefinition, true);/**
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
  parent      = (parent || Object);
  objDefProps = (objDefProps || {});

  var objDef;
  var objCtor    = (objDefProps.ctor || (function() { return objDef.__super__.constructor.apply(this, arguments); }));
  var objDefName = _getObjDefName(objCtor, objDefProps.__defName);  eval('objDef = function' + (objDefName ? (' ' + objDefName) : '') + '() { return objCtor.apply(this, arguments); };');  objDef.prototype = Object.create(parent.prototype);


  makeInheritable(objDef);


  _addMixins(objDefProps);
  _addConstants(objDef, objDefProps.consts);
  _addStaticProperties(objDef, objDefProps.statics);
  _addPrototypeProperties(objDef, objDefProps);
  _addSuperFunction(objDef);


  _addOwnerIfFunction(objDef.prototype, objCtor);

  Object.defineProperty(objDef, 'isObjDef', { get: function() { return true; } });
  Object.defineProperty(objDef, '__super__', { get: function() { return parent.prototype; } });
  Object.defineProperty(objDef.prototype, '__ctor__', { get: function() { return objCtor; } });


  return objDef;
}



function _getObjDefName(ctor, name) {
  if (typeof name === 'string' && name.trim()) {
    return name.trim();
  }
  if (ctor.name) {
    return ctor.name;
  }
  return undefined;
}


function _addMixins(props) {
  var mixins = props.mixins;

  if (mixins != null && Array.isArray(mixins)) {
    mixDeep(props, mixins);
  }
}


function _addConstants(def, props) {
  if (props == null) {
    return;
  }

  for (var propName in props) {
    if (_isReservedStaticProperty(propName)) {
      throw new ReferenceError(""); // TODO: Add error message!!!
    }

    ;(function(propertyName, value) {
      Object.defineProperty(def, propertyName, {
        get: function() { return value; }
      });
    })(propName, props[propName]);
  }
}


function _addStaticProperties(def, props) {
  if (props == null) {
    return;
  }

  for (var propName in props) {
    if (_isReservedStaticProperty(propName)) {
      throw new ReferenceError(""); // TODO: Add error message!!!
    }

    _addProperty(def, props, propName);
  }
}


function _addPrototypeProperties(def, props) {
  def.prototype.constructor = _addOwnerIfFunction(def.prototype, def);

  for (var propName in props) {
    if (propName === 'constructor'
          || propName === 'ctor'
          || propName === 'consts'
          || propName === 'statics'
          || propName === '_super'
          || propName === '__ctor__'
          || propName === '__defName') {
      throw new ReferenceError(""); // TODO: Add error message!!!
    }

    _addProperty(def.prototype, props, propName);
  }
}


function _addSuperFunction(def) {
  Object.defineProperty(def.prototype, '_super', {
    configurable: false,
    enumerable:   false,
    writable:     false,

    value: function() {
      var caller = arguments.callee.caller;

      if (!caller) {
        return;
      }

      var callerOwner = caller.owner;
      var superType   = callerOwner.constructor.__super__;

      if (!superType) {
        return;
      }


      if (caller === callerOwner.constructor || caller === callerOwner.__ctor__) {
        return superType.constructor.apply(this, arguments);
      }


      var callerName = caller.name;

      if (!callerName) {
        var propNames = Object.getOwnPropertyNames(callerOwner);

        for (var i = 0; i < propNames.length; i++) {
          var propName       = propNames[i];
          var propDescriptor = Object.getOwnPropertyDescriptor(callerOwner, propName);

          if (propDescriptor.value === caller
                || propDescriptor.get === caller
                || propDescriptor.set === caller) {
            callerName = propName;
            break;
          }
        }
      }

      if (!callerName) {
        return;
      }


      var superFunc;
      var superFuncDescriptor = InternalUtils.getPropertyDescriptor(superType, callerName);
      var callerDescriptor    = InternalUtils.getPropertyDescriptor(callerOwner, callerName);

      if (superFuncDescriptor != null) {
        if (callerDescriptor.get != null && callerDescriptor.get === caller) {
          superFunc = superFuncDescriptor.get;
        } else if (callerDescriptor.set != null && callerDescriptor.set === caller) {
          superFunc = superFuncDescriptor.set;
        } else {
          superFunc = superFuncDescriptor.value;
        }
      }

      if (typeof superFunc !== 'function' || superFunc == null) {
        return;
      }


      return superFunc.apply(this, arguments);
    }
  });
}


function _isReservedStaticProperty(propName) {
  return (propName === 'isObjDef'
            || propName === '__super__'
            || propName === '__defName');
}


function _addProperty(propNewOwner, propCurrentOwner, propName) {
  var propOptions    = {};
  var propDescriptor = Object.getOwnPropertyDescriptor(propCurrentOwner, propName);


  if (typeof propDescriptor !== 'undefined') {
    for (var descriptorPropName in propDescriptor) {
      propOptions[descriptorPropName] = propDescriptor[descriptorPropName];
    }
  }


  if (typeof propOptions.value !== 'undefined') {
    _addOwnerIfFunction(propNewOwner, _deepClone(propOptions.value));
  }
  if (typeof propOptions.get !== 'undefined') {
    _addOwnerIfFunction(propNewOwner, propOptions.get);
  }
  if (typeof propOptions.set !== 'undefined') {
    _addOwnerIfFunction(propNewOwner, propOptions.set);
  }


  Object.defineProperty(propNewOwner, propName, propOptions);
}


function _addOwnerIfFunction(owner, obj) {
  if (typeof obj === 'function') {
    obj.owner = owner;
  }
  return obj;
}


function _deepClone(val) {
  if (val == null) {
    return val;
  }


  var ret = val;


  if (Array.isArray(val)) {
    ret = new val.constructor();

    val.forEach(function(item) {
      ret.push(_deepClone(item));
    });
  } else if (typeof val === 'object') {
    var ctorArg = ((val instanceof Date) ? val.valueOf() : undefined);

    ret = new val.constructor(ctorArg);

    for (var propName in val) {
      ret[propName] = _deepClone(val[propName]);
    }
  }


  return ret;
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
   * Creates a new object definition based upon the given `objDefProps` properties and
   * causes that new object definition to inherit this object.
   *
   * @param {Object} objDefProps - An object containing all properties to be used in
   *                               creating the new object definition that will inherit
   *                               this object. If this parameter is `undefined` or
   *                               `null`, then a new child object definition is created.
   *                               TODO: Add reference to the `objDefProps` spec
   *
   * @returns {Object} An object created from the given `objDefProps` that inherits this
   *                   object.
   *
   * @throws {TypeError} If the object's definition has been sealed. @see {@link https://github.com/bsara/inheritance.js/blob/master/src/inherit/seal.js}
   *
   * @requires inheritance
   */
  Object.defineProperty(obj, 'extend', {
    value:        function(objDefProps) { return inheritance(obj, objDefProps); },
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
    sealed: { get: function() { return true; } },
    extend: {
      configurable: false,
      enumerable:   false,
      writable:     false,
      value:        function() { throw new TypeError("The object definition you are trying to extend is sealed and cannot be inherited."); }
    }
  });

  return obj;
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

      if (mixin[propName] !== null && typeof mixin[propName] === 'object') {
        mixDeep(newObj[propName], mixin[propName]);
        continue;
      }

      newObj[propName] = mixin[propName];
    }
  }

  return newObj;
}/**
 * TODO: Add description
 *
 * @param {Object}               obj    - The object containing the prototype to deep mix into.
 *                                        NOTE: `undefined` and `null` are both VALID values for
 *                                        this parameter. If `obj` is `undefined` or `null`, then
 *                                        a new object will be created from the `mixins` given.
 * @param {Array<Object>|Object} mixins - An array of objects whose properties should be deep
 *                                        mixed into the prototype of the given `obj`.
 *                                        NOTE: The order of objects in this array does matter!
 *                                        If there are properties present in multiple mixin
 *                                        objects, then the mixin with the largest index value
 *                                        overwrite any values set by the lower index valued
 *                                        mixin objects.
 *
 * @returns {Object} The deep mixed version of `obj`.
 *
 * @throws {TypeError} If `obj.prototype` does not exist.
 *
 * @requires mixDeep
 */
function mixPrototypeDeep(obj, mixins) {
  obj = (obj || { prototype: {} });

  if (obj.prototype == null) {
    throw new TypeError("`obj.prototype` cannot be `undefined` or `null`!");
  }

  obj.prototype = mixDeep(obj.prototype, mixins);

  return obj;
}/**
 * TODO: Add description
 *
 * @param {Object}               obj    - The object containing the prototype to mix into.
 *                                        NOTE: `undefined` and `null` are both VALID values for
 *                                        this parameter. If `obj` is `undefined` or `null`, then
 *                                        a new object will be created from the `mixins` given.
 * @param {Array<Object>|Object} mixins - An array of objects whose properties should be mixed
 *                                        into the prototype of the given `obj`.
 *                                        NOTE: The order of objects in this array does matter!
 *                                        If there are properties present in multiple mixin
 *                                        objects, then the mixin with the largest index value
 *                                        overwrite any values set by the lower index valued
 *                                        mixin objects.
 *
 * @returns {Object} The mixed version of `obj`.
 *
 * @throws {TypeError} If `obj.prototype` does not exist.
 *
 * @requires mix
 */
function mixPrototype(obj, mixins) {
  obj = (obj || { prototype: {} });

  if (obj.prototype == null) {
    throw new TypeError("`obj.prototype` cannot be `undefined` or `null`!");
  }

  obj.prototype = mix(obj.prototype, mixins);

  return obj;
}/**
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
}

return {
  mix:              mix,
  mixDeep:          mixDeep,
  mixPrototype:     mixPrototype,
  mixPrototypeDeep: mixPrototypeDeep,
  inheritance:      inheritance,
  makeInheritable:  makeInheritable,
  seal:             seal,
  ObjectDefinition: ObjectDefinition
};;

}));
