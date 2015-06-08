require('extend-object-def');


String.extend = function(childDefAttrs) {
  return extendObjectDef(String, childDefAttrs);
};
