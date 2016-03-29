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
  var objCtor    = (objDefProps.ctor || function() { return objDef.__super__.constructor.apply(this, arguments); });
  var objDefName = objDefProps.__defName;

  if (typeof objDefName === 'string' && objDefName.trim()) {
    objDefName = objDefName.trim();
  } else if (objCtor.name) {
    objDefName = objCtor.name;
  } else {
    objDefName = undefined;
  }

  delete objDefProps.__defName;


  /* jshint -W061 */
  eval('objDef = function' + (objDefName ? (' ' + objDefName) : '') + '() { return objCtor.apply(this, arguments); };');
  /* jshint +W061 */

  objDef.prototype = Object.create(parent.prototype);


  makeInheritable(objDef);


  _setupMixins(objDefProps);
  _setupStaticProperties(objDef, objDefProps);
  _setupPrivateProperties(objDef, objDefProps);
  _setupSuperFunction(objDef);
  _setupPublicProperties(objDef, objDefProps);


  _addOwnerIfFunction(objDef.prototype, objCtor);


  Object.defineProperty(objDef, 'isObjDef', { get: function() { return true; } });
  Object.defineProperty(objDef, '__super__', { get: function() { return parent.prototype; } });
  Object.defineProperty(objDef.prototype, '__ctor__', { get: function() { return objCtor; } });


  return objDef;
}



function _setupMixins(props) {
  var mixins = props.mixins;

  if (mixins != null && mixins instanceof Array) {
    mixDeep(props, mixins);
  }
}


function _setupStaticProperties(def, props) {
  var propName;


  var staticProps = props.static;

  if (staticProps == null) {
    return;
  }

  for (propName in staticProps) {
    if (_isReservedStaticProperty(propName)) {
      continue;
    }
    _addProperty(def, staticProps, propName);
  }


  var staticConstProps = staticProps.consts;

  if (staticConstProps == null) {
    return;
  }

  for (propName in staticConstProps) {
    if (_isReservedStaticProperty(propName)) {
      continue;
    }

    var action = function(propertyName, value) {
      Object.defineProperty(def, propertyName, { get: function() { return value; }});
    };

    action(propName, staticConstProps[propName]);
  }
}


function _setupPrivateProperties(def, props) {
  var propName;


  var privateProps = props.private;

  if (privateProps == null) {
    return;
  }

  for (propName in privateProps) {
    if (_isReservedInstanceProperty(propName)) {
      continue;
    }
    _addProperty(def.prototype, privateProps, propName, true);
  }


  var privateStaticProps = privateProps.static;

  if (privateStaticProps == null) {
    return;
  }

  for (propName in privateStaticProps) {
    if (_isReservedStaticProperty(propName)) {
      continue;
    }
    _addProperty(def, privateStaticProps, propName, true);
  }
}


function _setupPublicProperties(def, props) {
  def.prototype.constructor = _addOwnerIfFunction(def.prototype, def);

  for (var propName in props) {
    if (_isReservedInstanceProperty(propName)
        || propName === 'mixins'
        || propName === 'private') {
      continue;
    }

    _updatePrototypeWithMixDeep(def.prototype, props, propName);
  }
}


function _setupSuperFunction(def) {
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
  return (propName === 'consts' || propName === '__super__');
}


function _isReservedInstanceProperty(propName) {
  return (propName === 'constructor'
          || propName === 'ctor'
          || propName === 'static'
          || propName === '_super'
          || propName === '__ctor__');
}


function _isPropGetterOrSetter(propOwner, propName) {
  var propDescriptor = Object.getOwnPropertyDescriptor(propOwner, propName);
  return (typeof propDescriptor !== 'undefined'
          && (typeof propDescriptor.get !== 'undefined' || typeof propDescriptor.set !== 'undefined'));
}


function _updatePrototypeWithMixDeep(prototype, props, propName) {
  if (!_isPropGetterOrSetter(props, propName) && !_isPropGetterOrSetter(prototype, propName)) {
    var protoProp = prototype[propName];
    var mixinProp = props[propName];

    if (mixinProp != null
        && typeof mixinProp === 'object'
        && mixinProp.constructor.name === 'Object'
        && (protoProp != null && protoProp.constructor.name === 'Object')) {
      mixDeep(protoProp, mixinProp);
      return;
    }
  }

  _addProperty(prototype, props, propName);
}


function _addProperty(propNewOwner, propCurrentOwner, propName, isPrivate) {
  isPrivate = (isPrivate === true);


  var propOptions    = {};
  var propDescriptor = Object.getOwnPropertyDescriptor(propCurrentOwner, propName);

  if (typeof propDescriptor !== 'undefined') {
    for (var descriptorPropName in propDescriptor) {
      propOptions[descriptorPropName] = propDescriptor[descriptorPropName];
    }
  }


  if (typeof propOptions.value !== 'undefined') {
    _addOwnerIfFunction(propNewOwner, propOptions.value);
  }
  if (typeof propOptions.get !== 'undefined') {
    _addOwnerIfFunction(propNewOwner, propOptions.get);
  }
  if (typeof propOptions.set !== 'undefined') {
    _addOwnerIfFunction(propNewOwner, propOptions.set);
  }


  if (isPrivate) {
    propOptions.enumerable = false;
  }


  Object.defineProperty(propNewOwner, propName, propOptions);
}


function _addOwnerIfFunction(owner, obj) {
  if (typeof obj === 'function') {
    obj.owner = owner;
  }
  return obj;
}
