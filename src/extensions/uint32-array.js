require('extend-object-def');


Uint32Array.extend = function(childDefAttrs) {
  return extendObjectDef(Uint32Array, childDefAttrs);
};
