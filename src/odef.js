import makeInheritable from 'make-inheritable';
import seal            from 'seal';

import { _getPropertyDescriptor } from '_internal-utils';



/**
 * TODO: Add description
 *
 * @param {String} name  - TODO: Add description
 * @param {Object} props - TODO: Add description
 *
 * @return {Function} TODO: Add description
 *
 * @requires makeInheritable, seal
 */
export default function odef(name, props) {
  if (typeof name === 'object') {
    props = name;
    name  = undefined;
  }

  let odef = _createODef(name, props);

  _addConstants(odef, props.consts);
  _addStaticProperties(odef, props.statics);
  _addPrototypeProperties(odef, props);
  _addSuperFunction(odef);

  return ((props.__sealed__ === true) ? seal(odef, true) : makeInheritable(odef, true));
}




/** @private */
function _createODef(name, props) {
  let parent = (props.__inherits__ || Object);

  let odefName = _getODefName((name || props.__name__), props.constructor);

  let mixedParent = parent;
  let mixins      = props.mixins;

  if (Array.isArray(mixins)) {
    mixins.forEach(mixin => {
      mixedParent = mixin(mixedParent);
    });
  }

  return class extends mixedParent {
    static get __super__()  { return parent.prototype; }
    static get isObjDef()   { return true; }
    static get objDefName() { return odefName; }
  };
}



/** @private */
function _getODefName(name, ctor) {
  if (typeof name === 'string' && name.trim()) {
    return name.trim();
  }
  if (ctor.name && ctor.name !== 'constructor') {
    return ctor.name;
  }
  return undefined;
}


/** @private */
function _addConstants(def, props) {
  if (props == null) {
    return;
  }

  for (let propName in props) {
    if (_isReservedStaticProperty(propName)) {
      throw new ReferenceError(""); // TODO: Add error message!!!
    }
    Object.defineProperty(def, propName, { get: () => props[propName] });
  }
}


/** @private */
function _addStaticProperties(def, props) {
  if (props == null) {
    return;
  }

  for (let propName in props) {
    if (_isReservedStaticProperty(propName)) {
      throw new ReferenceError(""); // TODO: Add error message!!!
    }
    _addProperty(def, props, propName);
  }
}


/** @private */
function _addPrototypeProperties(def, props) {
  def.prototype.constructor = def;


  let ctor = _addOwnerIfFunction(def.prototype, (props.constructor || Object.getPrototypeOf(def.prototype).constructor));
  Object.defineProperty(def.prototype, '__ctor__', {
    configurable: false,
    enumerable:   false,
    writable:     false,
    get:          function() { return ctor; }
  });


  for (let propName in props) {
    if (propName === '_super'
          || propName === '__ctor__') {
      throw new ReferenceError(""); // TODO: Add error message!!!
    }

    if (propName === 'constructor'
          || propName === 'consts'
          || propName === 'statics'
          || propName === '__name__'
          || propName === '__sealed__'
          || propName === '__inherits__') {
      continue;
    }

    _addProperty(def.prototype, props, propName);
  }
}


/**
 * @requires _getPropertyDescriptor
 * @private
 */
function _addSuperFunction(def) {
  Object.defineProperty(def.prototype, '_super', {
    configurable: false,
    enumerable:   false,
    writable:     false,

    /** @private */
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
      var superFuncDescriptor = _getPropertyDescriptor(superType, callerName);
      var callerDescriptor    = _getPropertyDescriptor(callerOwner, callerName);

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


/** @private */
function _isReservedStaticProperty(propName) {
  return (propName === 'isObjDef' || propName === 'objDefName');
}


/** @private */
function _addProperty(propNewOwner, propCurrentOwner, propName) {
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

  Object.defineProperty(propNewOwner, propName, propOptions);
}


/** @private */
function _addOwnerIfFunction(owner, obj) {
  if (typeof obj === 'function') {
    obj.owner = owner;
  }
  return obj;
}
