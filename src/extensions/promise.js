if (typeof Promise !== 'undefined' && Promise !== null) {
  Promise.extend = function(childDefAttrs) {
    return extendObjectDef(Promise, childDefAttrs);
  };
}
