import { extendObjectDef } from '../extend-object-def';



Int16Array.extend = function(childDefAttrs) {
  return extendObjectDef(Int16Array, childDefAttrs);
};
