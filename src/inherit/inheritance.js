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

  var addOwnerIfFunction = function(obj, owner) {
    if (typeof obj === 'function') {
      obj.owner = owner;
    }
    return obj;
  };



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

  delete objDefProps.__defName;



  /* jshint -W061 */
  eval('objDef = function' + (objDefName ? (' ' + objDefName) : '') + '() { return objCtor.apply(this, arguments); };');
  /* jshint +W061 */

  objDef.prototype = Object.create(parent.prototype);



  addOwnerIfFunction(objCtor, objDef.prototype);

  Object.defineProperty(objDef.prototype, '__ctor__', {
    value:        objCtor,
    configurable: false,
    enumerable:   false,
    writable:     false
  });



  makeInheritable(objDef);



  var mixins = objDefProps.mixins;

  if (mixins !== null && mixins instanceof Array) {
    mixDeep(objDefProps, mixins);
  }



  var staticProps = objDefProps.static;

  if (typeof staticProps !== 'undefined' && staticProps !== null) {
    for (propName in staticProps) {
      if (propName === 'consts'
          || propName === '__super__') {
        continue;
      }

      objDef[propName] = addOwnerIfFunction(staticProps[propName], objDef);
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
      if (propName === 'constructor'
          || propName === 'ctor'
          || propName === 'static'
          || propName === '_super'
          || propName === '__ctor__') {
        continue;
      }

      Object.defineProperty(objDef.prototype, propName, {
        value:        addOwnerIfFunction(privateProps[propName], objDef.prototype),
        configurable: true,
        enumerable:   false,
        writable:     true
      });
    }


    var privateStaticProps = privateProps.static;
    if (typeof privateStaticProps !== 'undefined' && privateStaticProps !== null) {
      for (propName in privateStaticProps) {
        Object.defineProperty(objDef, propName, {
          value:        addOwnerIfFunction(privateStaticProps[propName], objDef),
          configurable: true,
          enumerable:   false,
          writable:     true
        });
      }
    }
  }


  Object.defineProperty(objDef.prototype, '_super', {
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



  objDef.prototype.constructor = addOwnerIfFunction(objDef, objDef.prototype);

  for (propName in objDefProps) {
    if (propName === 'constructor'
        || propName === 'ctor'
        || propName === 'mixins'
        || propName === 'private'
        || propName === 'static'
        || propName === '_super'
        || propName === '__ctor__') {
      continue;
    }
    objDef.prototype[propName] = addOwnerIfFunction(objDefProps[propName], objDef.prototype);
  }



  return objDef;
}
