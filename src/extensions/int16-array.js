if (typeof Int16Array !== 'undefined' && Int16Array !== null) {
  Int16Array.extend = function(childDefAttrs) {
    return extendObjectDef(Int16Array, childDefAttrs);
  };
}
