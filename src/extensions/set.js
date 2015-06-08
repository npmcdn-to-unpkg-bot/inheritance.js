if (typeof Set !== 'undefined' && Set !== null) {
  Set.extend = function(childDefAttrs) {
    return extendObjectDef(Set, childDefAttrs);
  };
}
