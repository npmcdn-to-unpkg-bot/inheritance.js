require('extend-object-def');


Int32Array.extend = function(childDefAttrs) {
  return extendObjectDef(Int32Array, childDefAttrs);
};
