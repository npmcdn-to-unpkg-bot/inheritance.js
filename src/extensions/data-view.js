require('extend-object-def');


DataView.extend = function(childDefAttrs) {
  return extendObjectDef(DataView, childDefAttrs);
};
