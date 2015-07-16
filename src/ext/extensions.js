/* globals makeInheritable */


makeInheritable(ArrayBuffer);
makeInheritable(Array);
makeInheritable(DataView);
makeInheritable(Date);
makeInheritable(Error);
makeInheritable(EvalError);
makeInheritable(Float32Array);
makeInheritable(Float64Array);
makeInheritable(Function);
makeInheritable(Int8Array);

if (typeof Int16Array !== 'undefined' && Int16Array !== null) {
  makeInheritable(Int16Array);
}

makeInheritable(Int32Array);
makeInheritable(Intl.Collator);
makeInheritable(Intl.DateTimeFormat);
makeInheritable(Intl.NumberFormat);

if (typeof Map !== 'undefined' && Map !== null) {
  makeInheritable(Map);
}

makeInheritable(Number);

if (typeof Promise !== 'undefined' && Promise !== null) {
  makeInheritable(Promise);
}

if (typeof Proxy !== 'undefined' && Proxy !== null) {
  makeInheritable(Proxy);
}

makeInheritable(RangeError);
makeInheritable(ReferenceError);

if (typeof Reflect !== 'undefined' && Reflect !== null) {
  makeInheritable(Reflect);
}

makeInheritable(RegExp);

if (typeof Set !== 'undefined' && Set !== null) {
  makeInheritable(Set);
}

makeInheritable(String);

if (typeof Symbol !== 'undefined' && Symbol !== null) {
  makeInheritable(Symbol);
}

makeInheritable(SyntaxError);
makeInheritable(TypeError);
makeInheritable(Uint8Array);
makeInheritable(Uint8ClampedArray);
makeInheritable(Uint16Array);
makeInheritable(Uint32Array);
makeInheritable(URIError);

if (typeof WeakMap !== 'undefined' && WeakMap !== null) {
  makeInheritable(WeakMap);
}

if (typeof WeakSet !== 'undefined' && WeakSet !== null) {
  makeInheritable(WeakSet);
}
