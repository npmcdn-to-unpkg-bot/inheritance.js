if (typeof Proxy !== 'undefined' && Proxy !== null) {
  Proxy.extend = function(childDefAttrs) {
    return extendObjectDef(Proxy, childDefAttrs);
  };
}
