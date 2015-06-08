if (typeof Reflect !== 'undefined' && Reflect !== null) {
  Reflect.extend = function(childDefAttrs) {
    return extendObjectDef(Reflect, childDefAttrs);
  };
}
