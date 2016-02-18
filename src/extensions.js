/* globals makeInheritable, mix, mixDeep */


/**
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
}
