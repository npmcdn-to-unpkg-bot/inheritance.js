import { extendObjectDef } from '../extend-object-def';



WeakSet.extend = function(childAttrs) {
  return extendObjectDef(WeakSet, childDefAttrs);
};
