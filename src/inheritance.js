/* globals makeInheritable, mixDeep, InternalUtils */
/* exported inheritance */


/**
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
  var objCtor    = (objDefProps.ctor || (function() { return objDef.__super__.constructor.apply(this, arguments); })); // jscs:ignore requireBlocksOnNewline
  var objDefName = _getObjDefName(objCtor, objDefProps.__defName);


  /* jshint -W061 */
  eval('objDef = function' + (objDefName ? (' ' + objDefName) : '') + '() { return objCtor.apply(this, arguments); };');
  /* jshint +W061 */

  objDef.prototype = Object.create(parent.prototype);


  makeInheritable(objDef);


  _addMixins(objDefProps);
  _addConstants(objDef, objDefProps.consts);
  _addStaticProperties(objDef, objDefProps.statics);
  _addPrototypeProperties(objDef, objDefProps);
  _addSuperFunction(objDef);


  _addOwnerIfFunction(objDef.prototype, objCtor);


  // jscs:disable requireBlocksOnNewline

  Object.defineProperty(objDef, 'isObjDef', { get: function() { return true; } });
  Object.defineProperty(objDef, '__super__', { get: function() { return parent.prototype; } });
  Object.defineProperty(objDef.prototype, '__ctor__', { get: function() { return objCtor; } });

  // jscs:enable requireBlocksOnNewline


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
        get: function() { return value; } // jscs:ignore requireBlocksOnNewline
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
}
