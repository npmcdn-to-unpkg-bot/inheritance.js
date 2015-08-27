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


makeInheritable(Object);


makeInheritable(ArrayBuffer, true);
makeInheritable(Array, true);
makeInheritable(DataView, true);
makeInheritable(Date, true);
makeInheritable(Error, true);
makeInheritable(EvalError, true);
makeInheritable(Float32Array, true);
makeInheritable(Float64Array, true);
makeInheritable(Function, true);
makeInheritable(Int8Array, true);

if (typeof Int16Array !== 'undefined' && Int16Array !== null) {
  makeInheritable(Int16Array, true);
}

makeInheritable(Int32Array, true);
makeInheritable(Intl.Collator, true);
makeInheritable(Intl.DateTimeFormat, true);
makeInheritable(Intl.NumberFormat, true);

if (typeof Map !== 'undefined' && Map !== null) {
  makeInheritable(Map, true);
}

makeInheritable(Number, true);

if (typeof Promise !== 'undefined' && Promise !== null) {
  makeInheritable(Promise, true);
}

if (typeof Proxy !== 'undefined' && Proxy !== null) {
  makeInheritable(Proxy, true);
}

makeInheritable(RangeError, true);
makeInheritable(ReferenceError, true);

if (typeof Reflect !== 'undefined' && Reflect !== null) {
  makeInheritable(Reflect, true);
}

makeInheritable(RegExp, true);

if (typeof Set !== 'undefined' && Set !== null) {
  makeInheritable(Set, true);
}

makeInheritable(String, true);

if (typeof Symbol !== 'undefined' && Symbol !== null) {
  makeInheritable(Symbol, true);
}

makeInheritable(SyntaxError, true);
makeInheritable(TypeError, true);
makeInheritable(Uint8Array, true);
makeInheritable(Uint8ClampedArray, true);
makeInheritable(Uint16Array, true);
makeInheritable(Uint32Array, true);
makeInheritable(URIError, true);

if (typeof WeakMap !== 'undefined' && WeakMap !== null) {
  makeInheritable(WeakMap, true);
}

if (typeof WeakSet !== 'undefined' && WeakSet !== null) {
  makeInheritable(WeakSet, true);
}
