require('extend-object-def');


Intl.Collator.extend = function(childDefAttrs) {
  return extendObjectDef(Intl.Collator, childDefAttrs);
};
