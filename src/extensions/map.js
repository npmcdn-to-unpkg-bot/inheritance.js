if (typeof Map !== 'undefined' && Map !== null) {
  Map.extend = function(childDefAttrs) {
    return extendObjectDef(Map, childDefAttrs);
  };
}
