if (typeof WeakSet !== 'undefined' && WeakSet !== null) {
  WeakSet.extend = function(childAttrs) {
    return extendObjectDef(WeakSet, childAttrs);
  };
}
