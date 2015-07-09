if (typeof Symbol !== 'undefined' && Symbol !== null) {
  Symbol.extend = function(childDefAttrs) {
    return extendObjectDef(Symbol, childDefAttrs);
  };
}
