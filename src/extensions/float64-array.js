require('extend-object-def');


Float64Array.extend = function(childDefAttrs) {
  return extendObjectDef(Float64Array, childDefAttrs);
};
