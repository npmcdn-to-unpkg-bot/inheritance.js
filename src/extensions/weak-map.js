import { extendObjectDef } from '../extend-object-def';



WeakMap.extend = function(childDefAttrs) {
  return extendObjectDef(WeakMap, childDefAttrs);
};
