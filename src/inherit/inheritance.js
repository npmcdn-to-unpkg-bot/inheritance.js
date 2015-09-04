/* globals makeInheritable, mixDeep */
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


  _addOwnerIfFunction(objDef.prototype, objCtor);

  Object.defineProperty(objDef.prototype, '__ctor__', {
    value:        objCtor,
    configurable: false,
    enumerable:   false,
    writable:     false
  });


  makeInheritable(objDef);


  _setupMixins(objDefProps);
  _setupStaticProperties(objDef, objDefProps);
  _setupPrivateProperties(objDef, objDefProps);
  _setupSuperFunction(objDef);
  _setupPublicProperties(objDef, objDefProps);


  Object.defineProperty(objDef, '__super__', {
    value:        parent.prototype,
    configurable: false,
    enumerable:   false,
    writable:     false
  });


  return objDef;
}



function _addOwnerIfFunction(owner, obj) {
  if (typeof obj === 'function') {
    obj.owner = owner;
  }
  return obj;
}


function _updatePrototypeWithMixDeep(prototype, props, propName) {
  if (typeof props[propName] === 'object'
      && typeof props[propName] === typeof prototype[propName]
      && typeof props[propName].prototype === 'undefined'
      && typeof prototype[propName].prototype === 'undefined') {
    mixDeep(prototype[propName], props[propName]);
    return;
  }

  prototype[propName] = _addOwnerIfFunction(prototype, props[propName]);
}


function _setupMixins(props) {
  var mixins = props.mixins;

  if (mixins !== null && mixins instanceof Array) {
    mixDeep(props, mixins);
  }
}


function _setupStaticProperties(def, props) {
  var propName;
  var staticProps = props.static;

  if (typeof staticProps !== 'undefined' && staticProps !== null) {
    for (propName in staticProps) {
      if (propName === 'consts'
          || propName === '__super__') {
        continue;
      }

      def[propName] = _addOwnerIfFunction(def, staticProps[propName]);
    }


    var staticConstProps = staticProps.consts;

    if (typeof staticConstProps !== 'undefined' && staticConstProps !== null) {
      for (propName in staticConstProps) {
        Object.defineProperty(def, propName, {
          value:        staticConstProps[propName],
          configurable: false,
          enumerable:   true,
          writable:     false
        });
      }
    }
  }
}


function _setupPrivateProperties(def, props) {
  var propName;
  var privateProps = props.private;

  if (typeof privateProps !== 'undefined' && privateProps !== null) {
    for (propName in privateProps) {
      if (propName === 'constructor'
          || propName === 'ctor'
          || propName === 'static'
          || propName === '_super'
          || propName === '__ctor__') {
        continue;
      }

      Object.defineProperty(def.prototype, propName, {
        value:        _addOwnerIfFunction(def.prototype, privateProps[propName]),
        configurable: true,
        enumerable:   false,
        writable:     true
      });
    }


    var privateStaticProps = privateProps.static;
    if (typeof privateStaticProps !== 'undefined' && privateStaticProps !== null) {
      for (propName in privateStaticProps) {
        Object.defineProperty(def, propName, {
          value:        _addOwnerIfFunction(def, privateStaticProps[propName]),
          configurable: true,
          enumerable:   false,
          writable:     true
        });
      }
    }
  }
}


function _setupPublicProperties(def, props) {
  def.prototype.constructor = _addOwnerIfFunction(def.prototype, def);

  for (var propName in props) {
    if (propName === 'constructor'
        || propName === 'ctor'
        || propName === 'mixins'
        || propName === 'private'
        || propName === 'static'
        || propName === '_super'
        || propName === '__ctor__') {
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
          var propName = propNames[i];

          if (callerOwner[propName] === caller) {
            callerName = propName;
            break;
          }
        }
      }

      if (!callerName) {
        return;
      }


      var superFunc = superType[callerName];

      if (typeof superFunc !== 'function' || superFunc === null) {
        return;
      }

      return superFunc.apply(this, arguments);
    }
  });
}
