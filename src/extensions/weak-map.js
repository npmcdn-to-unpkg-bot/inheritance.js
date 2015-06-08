if (typeof WeakMap !== 'undefined' && WeakMap !== null) {
  WeakMap.extend = function(childDefAttrs) {
    return extendObjectDef(WeakMap, childDefAttrs);
  };
}
