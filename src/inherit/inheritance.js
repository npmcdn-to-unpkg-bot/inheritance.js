/* globals makeInheritable, mixDeep */
/* exported inheritance */


/**
 * Creates a new object definition based upon the given `childDef` attributes that
 * inherits the given `parent`.
 *
 * @param {Object} parent     - The object to be inherited.
 * @param {Object} [childDef] - An object containing all attributes to be used in creating
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
  var attrName;

  parent   = (parent || Object);
  childDef = (childDef || {});

  var child = (childDef.ctor || function() { return this.super.apply(this, arguments); }); // jscs:disable requireBlocksOnNewline


  for (attrName in parent) {
    if (attrName === 'extend') {
      continue;
    }
    child[attrName] = parent[attrName];
  }

  child.__super__ = parent.prototype;

  makeInheritable(child);


  var mixins = childDef.mixins;
  if (mixins !== null && mixins instanceof Array) {
    mixDeep(childDef, mixins);
  }


  var staticAttrs = childDef.static;
  if (typeof staticAttrs !== 'undefined' && staticAttrs !== null) {
    for (attrName in staticAttrs) {
      child[attrName] = staticAttrs[attrName];
    }
  }


  child.prototype        = Object.create(parent.prototype);
  child.prototype.objDef = child;

  child.prototype.constructor = function() {
    if (!(this instanceof child)) {
      return new child(arguments); // jscs:disable requireCapitalizedConstructors
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

  for (attrName in parent.prototype) {
    child.prototype._super[attrName] = function() {
      return this.objDef.__super__[attrName].apply(this, arguments);
    };
  }

  for (attrName in childDef) {
    if (attrName === 'constructor'
        || attrName === 'ctor'
        || attrName === 'objDef'
        || attrName === 'mixins'
        || attrName === 'static'
        || attrName === 'super'
        || attrName === '_super') {
      continue;
    }
    child.prototype[attrName] = childDef[attrName];
  }

  return child;
}
