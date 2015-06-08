require('extend-object-def');


Error.extend = function(childDefAttrs) {
  return extendObjectDef(Error, childDefAttrs);
};
