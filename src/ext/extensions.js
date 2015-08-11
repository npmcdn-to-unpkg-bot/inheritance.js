/* globals makeInheritable */


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
