if (typeof Promise !== 'undefined' && Promise !== null) {
  Symbol.extend = function(childDefAttrs) {
    return extendObjectDef(Symbol, childDefAttrs);
  };
}
