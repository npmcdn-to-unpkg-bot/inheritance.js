import { extendObjectDef } from '../extend-object-def';



Int8Array.extend = function(childDefAttrs) {
  return extendObjectDef(Int8Array, childDefAttrs);
};
